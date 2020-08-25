'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var style = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'DodgerBlue'
  },
  cardWrapper: {
    backgroundColor: '#f1f1f1',
    width: '100%',
    height: '100%',
    padding: 10,
    textAlign: 'center',
    // lineHeight: 75,
    fontSize: 30
  },
  card: {
    backgroundColor: 'yellow',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    // lineHeight: 75,
    fontSize: 30,
    cursor: 'pointer'
  }
};

var LikeButton = function (_React$Component) {
  _inherits(LikeButton, _React$Component);

  function LikeButton(props) {
    _classCallCheck(this, LikeButton);

    var _this = _possibleConstructorReturn(this, (LikeButton.__proto__ || Object.getPrototypeOf(LikeButton)).call(this, props));

    _this.state = { liked: false, rows: [], count: 0, error: null, page_count: 0, width: 0, height: 0 };
    _this.updateWindowDimensions = _this.updateWindowDimensions.bind(_this);
    return _this;
  }

  _createClass(LikeButton, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // alert(window.location.hash)
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
      // fetch product
      // Simple POST request with a JSON body using fetch
      var graphqlData = 'query{\n      getAllTokoProductsByTokoId(toko_id: "' + _TOKOID_ + '" ,page_size: 10, page_index: 0, string_to_search: ""){\n        error,\n        count,\n        page_count,\n        status,\n        list_data{\n          _id,\n          name,\n          price,\n          code,\n          description,\n          image_id{\n            _id,\n            filename,\n            file_type\n          }\n        }\n      }\n    }';
      var requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: graphqlData })
      };
      fetch('http://localhost:3000/graphql', requestOptions).then(function (response) {
        return response.json();
      }).then(function (response) {
        console.log('response===>', response);
        // response.json()
        return response.data.getAllTokoProductsByTokoId;
      }).then(function (data) {
        return _this2.setState({ rows: data.list_data, page_count: data.page_count, count: data.count });
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }
  }, {
    key: 'updateWindowDimensions',
    value: function updateWindowDimensions() {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
  }, {
    key: 'renderItem',
    value: function renderItem(item, i) {
      console.log('window width: ', window.innerWidth);
      var width = void 0,
          fontSize = void 0;
      var margin = 5;
      if (window.innerWidth >= 1024) width = window.innerWidth / 4 - 8 - margin * 1 - 1;else if (window.innerWidth >= 600) width = window.innerWidth / 2 - 8 - margin * 2;else if (window.innerWidth < 600) width = window.innerWidth / 1 - 8 - margin * 2 - 8;

      return React.createElement(
        'div',
        {
          key: i,
          style: {
            backgroundColor: 'red',
            width: width,
            height: width + 80 + 40,
            textAlign: 'center',
            margin: 5
          }
        },
        React.createElement(
          'div',
          { style: style.card, onClick: function onClick() {
              window.location.href = _PAGE_PRODUCT_DETAIL_ + '#' + item.code;
            } },
          React.createElement(
            'div',
            { style: { width: '100%', height: 80, fontSize: '80%' } },
            item.name
          ),
          React.createElement('img', { src: 'http://dev.plink.co.id:3000/renderfile/' + item.image_id.filename + '.' + item.image_id.file_type, style: { width: width, height: width } }),
          React.createElement(
            'div',
            { style: { width: '100%', height: 40, fontSize: '80%' } },
            'Rp. ',
            item.price
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      console.log('this.state===>', this.state);
      var rows = this.state.rows;

      return React.createElement(
        'div',
        { style: style.container },
        rows.map(function (item, i) {
          return _this3.renderItem(item, i);
        })
      );
    }
  }]);

  return LikeButton;
}(React.Component);

var domContainer = document.querySelector('#tokoonline_content');
ReactDOM.render(e(LikeButton), domContainer);