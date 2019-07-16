import styled from 'styled-components/macro'
import { color } from '../utils/variables'
export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;

  label {
    font-size: 1.3em;
    margin-bottom: 0.3em;
  }

  input[type='text'],
  textarea {
    font-size: 1.1em;
    border: 1px solid ${color.steel};
  }
`
