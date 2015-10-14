import React from 'react/addons';
import {List} from 'immutable';
import {Voting} from '../../src/components/Voting';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = React.addons.TestUtils

describe('Voting', () => {

  it('render a pair of buttons', () => {
    const component = renderIntoDocument(
      <Voting pair={['Mad Max', 'Lion King']}/>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component,'button');
    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('Mad Max');
    expect(buttons[1].textContent).to.equal('Lion King');
  });

  it('invokes callback when button is clicked', () => {
    let votedWith;
    const vote = (entry) => votedWith = entry;

    const component = renderIntoDocument(
      <Voting pair={['Mad Max', 'Lion King']}
              vote={vote}/>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]);

    expect(votedWith).to.equal('Mad Max')
  })

  it('disables buttons when user has voted', () => {
    const component = renderIntoDocument(
      <Voting pair={["Simone", "Pumba"]}
              hasVoted="Pumba" />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].hasAttribute('disabled')).to.equal(true)
    expect(buttons[1].hasAttribute('disabled')).to.equal(true)
  });

  it('adds label to the voted entry', () => {
    const component = renderIntoDocument(
      <Voting pair={["Simone", "Pumba"]}
              hasVoted="Simone" />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons[0].textContent).to.contain('Voted');

  });

  it('renders just the winner when there is one', () => {
    const component = renderIntoDocument(
      <Voting winner="Simone" />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(0);

    const winner = React.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Simone')
  })

  it('render as a pure component', () => {
    const pair = ['Alameda', 'Marin'];
    const component = renderIntoDocument(
      <Voting pair={pair} />
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Alameda');

    pair[0] = 'San Francisco';
    component.setProps({pair: pair});
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Alameda')
  })

  it('does update DOM when prop changes', () => {
    const pair = List.of('Alameda', 'Marin');
    const component = renderIntoDocument(
      <Voting pair={pair} />
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Alameda');

    const newPair = pair.set(0, 'San Francisco');
    component.setProps({pair: newPair});
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('San Francisco')
  })

});