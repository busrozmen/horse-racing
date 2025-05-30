import type { Module } from 'vuex'
import type { RaceState } from '@/types/race'
import { state, mutations, actions, getters } from '.';

const race: Module<RaceState, any> = {
  state,
  mutations,
  actions,
  getters
}

export default race;