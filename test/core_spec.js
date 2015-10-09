import {List, Map} from 'immutable';
import {expect} from 'chai';
import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Groundhog Day', 'Zoolander');
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Groundhog Day', 'Zoolander')
      }));

    });

    it('converts to immutable', () => {
      const state = Map();
      const entries = ['fuck off', 'questlove'];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries:List.of('fuck off', 'questlove')
      }))
    })
  });

  describe('next', () => {
    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Bable', 'Waking Life', 'Spotless Mind')
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Bable', 'Waking Life')
        }),
        entries: List.of('Spotless Mind')
      }))
    });

    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Bable', 'Waking Life'),
          tally: Map({
            'Bable': 3,
            'Waking Life': 2
          })
        }),
        entries: List.of('8mm', '21 Jump street', 'Shazam')
      });
      const nextState = next(state);
      // console.log(nextState.toJS())
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('8mm', '21 Jump street')
        }),
        entries: List.of('Shazam', 'Bable')
      }));
    });

    it('puts both from tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Bable', 'Waking Life'),
          tally: Map({
            'Bable': 3,
            'Waking Life':3
          })
        }),
        entries: List.of('8mm', '21 Jump street','Shazam')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote:Map({
          pair: List.of('8mm', '21 Jump street')
        }),
        entries: List.of('Shazam', 'Bable', 'Waking Life')
      }));
    });

    it('marks winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Luke', 'Han'),
          tally: Map({
            'Luke': 4,
            'Han': 2
          })
        }),
        entries:List()
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner:'Luke'
      }))
    })
  });

  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair:List.of('Dancer', 'Prancer')
        }),
        entries: List()
      });
      const nextState = vote(state, 'Dancer');
      expect(nextState).to.equal(Map({
        vote:Map({
          pair: List.of('Dancer', 'Prancer'),
          tally: Map({
            'Dancer': 1
          })
        }),
        entries: List()
      }));
    });


    it('adds to existing tally for the voted entry', () => {
      const state = Map ({
        vote: Map({
          pair:List.of('Dancer', 'Prancer'),
          tally: Map({
            'Dancer':4,
            'Prancer':7
          })
        }),
        entries: List()
      });
      const nextState = vote(state,'Prancer');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair:List.of('Dancer','Prancer'),
          tally: Map({
            'Dancer':4,
            'Prancer':8
          })
        }),
        entries: List()
      }));
    });
  });

});





