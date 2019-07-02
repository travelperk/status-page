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
}

export interface Incident {
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

export const createIncidentUpdate = async (update: PartialUpdate) => {
  return await updatesDb.add({
    description: update.description,
    timestamp:
      update.timestamp || firebase.firestore.FieldValue.serverTimestamp(),
    type: update.type,
  })
}

interface PartialIncident {
  title: Incident['title']
  type: Incident['type']
  services: Array<ServicesType>
  description: PartialUpdate['description']
}
export const createIncident = async (incident: PartialIncident) => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp()
  const initialUpdate = await createIncidentUpdate({
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

/*
export const addUpdateToIncident = async (
  incidentId = 'Qgiup9L0mzx4417v8EFd'
) => {
  const newIncidentUpdate = await createIncidentUpdate()
  const incident = incidentsDb.doc(incidentId)
  const incidentData = await getDocData(incident)
  const existingUpdates = incidentData.updates
  incidentsDb.doc(incidentId).update({
    updates: [...existingUpdates, newIncidentUpdate],
  })
}
*/

/* export const Services: Array<ServicesType> = [
  'flights',
  'hotels',
  'cars',
  'trains',
]

export type ServicesType = 'flights' | 'hotels' | 'cars' | 'trains' */

export const Services: Array<string> = ['flights', 'hotels', 'cars', 'trains']

export type ServicesType = typeof Services[number]
