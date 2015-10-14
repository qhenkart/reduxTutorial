import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return (
      <div className="management">
        <button ref="next"
                className = "next"
                onClick={this.props.next}>
        NEXT!
        </button>
      </div>
    )
  }
});
