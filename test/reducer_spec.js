import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer'

describe('reducer', () => {

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type:'SET_ENTRIES', entries: ['Slumdog Millionaire']};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries:['Slumdog Millionaire']
    }));
  })

  it('handles NEXT', () =>{
    const initialState = fromJS({
      entries:['Slumdog Millionaire', 'Mad Max']
    });
    const action = {type:'NEXT'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote:{
        pair: ['Slumdog Millionaire', 'Mad Max']
      },
      entries: []
    }));
  })

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote:{
        pair: ['Slumdog Millionaire', 'Mad Max']
      },
      entries: []
    })
    const action = {type:'VOTE', entry:'Mad Max'}
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote:{
        pair: ['Slumdog Millionaire', 'Mad Max'],
        tally: {'Mad Max': 1}
      },
      entries: []
    }));
  })

  it('has an initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: ['Mad Max']};
    const nextState =  reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Mad Max']
    }))
  })

  it('can be used with reduce', () => {
    const actions = [
      {type:'SET_ENTRIES', entries: ['Mad Max', 'Speed']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Mad Max'},
      {type: 'VOTE', entry: 'Speed'},
      {type: 'VOTE', entry: 'Mad Max'},
      {type: 'NEXT'}
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner:'Mad Max'
    }))
  })
})