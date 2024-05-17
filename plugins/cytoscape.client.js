// plugins/cytoscape.client.js
import { defineNuxtPlugin } from '#app'
import cytoscape from 'cytoscape'
import cola from 'cytoscape-cola'
import {v4 as uuidv4} from 'uuid'

export default defineNuxtPlugin(nuxtApp => {
  cytoscape.use(cola)
  nuxtApp.provide('cytoscape', cytoscape)
  nuxtApp.provide('uuid', uuidv4)
})