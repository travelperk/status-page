import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const provider = new firebase.auth.GoogleAuthProvider()

const firebaseConfig = {
  apiKey: 'AIzaSyA7T7zChbE1yYvS-egcenmoIsY6SK7Nsmw',
  authDomain: 'status-page-30570.firebaseapp.com',
  databaseURL: 'https://status-page-30570.firebaseio.com',
  projectId: 'status-page-30570',
  storageBucket: 'status-page-30570.appspot.com',
  messagingSenderId: '896000146197',
  appId: '1:896000146197:web:be571200a71a8304',
}

firebase.initializeApp(firebaseConfig)
const incidentsDb = firebase.firestore().collection('incidents')
const updatesDb = firebase.firestore().collection('updates')

export const openLoginPopup = async () => {
  await firebase.auth().signInWithPopup(provider)
}

export const logOut = async () => {
  await firebase.auth().signOut()
}

export interface User {
  email: string | null
}

export const registerUserChanges = (setUser: (user: User | null) => void) => {
  firebase.auth().onAuthStateChanged((user: User | null) => {
    setUser(user)
  })
}

const getDocData = async (doc: any) => {
  const docResolved = await doc.get()
  return docResolved.data()
}

interface FirebaseTimestamp {
  toDate(): Date
  seconds: number
}

export interface IncidentUpdate {
  description: string
  type: 'investigating' | 'update' | 'resolved'
  timestamp: FirebaseTimestamp
  author: string
}

export interface Incident {
  id: string
  services: Array<string>
  title: string
  updates: Array<IncidentUpdate>
  type: 'down' | 'degraded'
}

export const getAllIncidents = (
  setIncidents: (incidents: Array<Incident>) => any
) =>
  incidentsDb.orderBy('timestamp').onSnapshot(async (snapshot: any) => {
    if (snapshot.empty) return setIncidents([])
    const incidents = await Promise.all(snapshot.docs.map(async (doc: any) => {
      const data = doc.data()
      const updates = await Promise.all(
        data.updates
          .map(async (update: any) => await getDocData(update))
          .reverse()
      )
      return { ...data, updates, id: doc.id } as Incident
    }) as Array<Incident>)
    setIncidents(incidents.reverse())
  })

interface PartialUpdate {
  description: string
  timestamp?: firebase.firestore.FieldValue
  type: IncidentUpdate['type']
}

const createIncidentUpdate = async (user: User, update: PartialUpdate) => {
  return await updatesDb.add({
    description: update.description,
    timestamp:
      update.timestamp || firebase.firestore.FieldValue.serverTimestamp(),
    type: update.type,
    author: user.email,
  })
}

interface PartialIncident {
  title: Incident['title']
  type: Incident['type']
  services: Array<ServicesType>
  description: PartialUpdate['description']
}
export const createIncident = async (user: User, incident: PartialIncident) => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp()
  const initialUpdate = await createIncidentUpdate(user, {
    description: incident.description,
    type: 'investigating',
    timestamp: timestamp,
  })

  await incidentsDb.add({
    title: incident.title,
    services: incident.services,
    type: incident.type,
    updates: [initialUpdate],
    timestamp: timestamp,
  })
}

export const updateIncident = async (id: Incident['id'], title: Incident['title'], services: Incident['services']) => {
  const updateObject = {
    title: title,
    services: services,
  }
  incidentsDb.doc(id).update(updateObject)
}

export const addUpdateToIncident = async (
  user: User,
  incidentId: string,
  description: string,
  type: IncidentUpdate['type']
) => {
  const newIncidentUpdate = await createIncidentUpdate(user, {
    description,
    type,
  })
  const incident = incidentsDb.doc(incidentId)
  const incidentData = await getDocData(incident)
  const existingUpdates = incidentData.updates
  incidentsDb.doc(incidentId).update({
    updates: [...existingUpdates, newIncidentUpdate],
  })
}

/* export const Services: Array<ServicesType> = [
  'flights',
  'hotels',
  'cars',
  'trains',
]

export type ServicesType = 'flights' | 'hotels' | 'cars' | 'trains' */

export const Services: Array<string> = ['flights', 'hotels', 'cars', 'trains']

export type ServicesType = typeof Services[number]

export const getIncident = (id: string, setter: (incident: Incident) => void) =>
  incidentsDb.doc(id).onSnapshot(async (doc: any) => {
    const data = doc.data()
    const updates = await Promise.all(
      data.updates
        .map(async (update: any) => await getDocData(update))
        .reverse()
    )
    setter({ ...data, updates, id: doc.id } as Incident)
  })
