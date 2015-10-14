import React from 'react/addons';
import {List,Map} from 'immutable';
import {Results} from '../../src/components/Results';
import Management from '../../src/components/Management';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate}
  = React.addons.TestUtils;

  describe ('Results', () => {

    it('renders entries with vote counts or zero', () => {
      const pair = List.of('Holes', 'Transformers');
      const tally = Map({'Holes': 5});
      const component = renderIntoDocument(
        <Results pair={pair} tally={tally} />
      );
      const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
      const [holes, trans] = entries.map(e => e.textContent);

      expect(entries.length).to.equal(2);
      expect(holes).to.contain('Holes');
      expect(holes).to.contain('5');
      expect(trans).to.contain('Transformers');
      expect(trans).to.contain('0');
    });

    it('invokes the next callback when next button is clicked', () => {
      let nextInvoked = false
      const next = () => nextInvoked = true;

      const pair = List.of('Holes', 'Transformers');
      const component = renderIntoDocument(
        <Management pair={pair}
                 tally={Map()}
                 next={next}/> 
      );
      Simulate.click(React.findDOMNode(component.refs.next));


      expect(nextInvoked).to.equal(true);
    })

    it('renders the winner when there is one', () => {
      const component = renderIntoDocument(
        <Results winner="Holes"
                 pair={["Holes", "Transformers"]}
                 tally={Map()} /> 
      );
      const winner = React.findDOMNode(component.refs.winner);
      expect(winner).to.be.ok;
      expect(winner.textContent).to.contain('Holes')
    });
  });