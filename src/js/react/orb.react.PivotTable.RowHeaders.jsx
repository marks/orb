/** @jsx React.DOM */

/* global module, require, React */

'use strict';

module.exports.PivotTableRowHeaders = react.createClass({
  setColGroup: function(widths) {
    var node = this.getDOMNode();
    var colGroupNode = this.refs.colgroup.getDOMNode();
    node.style.tableLayout = 'auto';

    colGroupNode.innerHTML = '';
    for(var i = 0; i < widths.length; i++) {
      var col = document.createElement('col');
      col.style.width = (widths[i] + 8) + 'px';
      colGroupNode.appendChild(col);
    }
    node.style.tableLayout = 'fixed';
  },
  render: function() {
    var self = this;
    var PivotRow = comps.PivotRow;

    var pgridwidget = this.props.pivotTableComp.pgridwidget;
    var layoutInfos = { 
      lastLeftMostCellVSpan: 0,
      topMostRowFound: false
    };

    var rowHeaders = pgridwidget.rows.headers.map(function(headerRow, index) {
      return <PivotRow key={index}
                       row={headerRow}
                       axetype={axe.Type.ROWS}
                       layoutInfos={layoutInfos}
                       pivotTableComp={self.props.pivotTableComp}>
      </PivotRow>;
    });

    return  <table className="inner-table">
        <colgroup ref="colgroup">
        </colgroup>
        <tbody>
          {rowHeaders}
        </tbody>
      </table>;
  }
});