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

    _this.state = { liked: false, dataDetail: {}, error: null, width: 0, height: 0 };
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
      var graphqlData = 'query{\n      getDetailTokoProductByCode(code: "' + window.location.hash.substring(1) + '"){\n        error,\n        status,\n        data_detail{\n          _id,\n          name,\n          price,\n          code,\n          description,\n          image_id{\n            _id,\n            filename,\n            file_type\n          }\n        }\n      }\n    }';
      var requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: graphqlData })
      };
      fetch('http://dev.plink.co.id:3000/graphql', requestOptions).then(function (response) {
        return response.json();
      }).then(function (response) {
        console.log('response===>', response);
        // response.json()
        return response.data.getDetailTokoProductByCode;
      }).then(function (data) {
        return _this2.setState({ dataDetail: data.data_detail });
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
    key: 'render',
    value: function render() {
      // const { dataDetail: { image_id: { filename, file_type: fileType } } } = this.state
      var dataDetail = this.state.dataDetail;
      var productName = dataDetail.name,
          productPrice = dataDetail.price,
          image = dataDetail.image_id,
          description = dataDetail.description;

      var productImage = ((image || {}).filename || '') + '.' + (image || {}).file_type;

      var width = void 0;
      if (window.innerWidth >= 1024) width = '50%';else if (window.innerWidth >= 600) width = '100%';else if (window.innerWidth < 600) width = '100%';

      // return null
      return React.createElement(
        'div',
        { style: style.container },
        React.createElement(
          'div',
          { style: { width: width, backgroundColor: 'green' } },
          React.createElement('img', { src: 'http://dev.plink.co.id:3000/renderfile/' + productImage, style: { width: '100%' } })
        ),
        React.createElement(
          'div',
          { style: { width: width, display: 'flex', flexDirection: 'column' } },
          React.createElement(
            'div',
            { style: { padding: 10 } },
            React.createElement(
              'div',
              { style: { width: '100%', fontSize: 30, backgroundColor: 'yellow' } },
              productName
            ),
            React.createElement(
              'div',
              { style: { width: '100%', fontSize: 30, backgroundColor: 'white' } },
              description
            ),
            React.createElement(
              'div',
              { style: { width: '100%', fontSize: 30, backgroundColor: 'purple' } },
              'Rp. ',
              productPrice
            ),
            React.createElement(
              'div',
              { style: { width: '100%', fontSize: 30, backgroundColor: 'burlywood' } },
              React.createElement(
                'button',
                { type: 'button', onClick: function onClick() {
                    window.location.href = TOKOONLINE_PAGE_PRODUCT_CATALOG;
                  }, style: { height: 50, width: 150, margin: 5 } },
                '<< Product Catalog'
              ),
              React.createElement(
                'button',
                { type: 'button', style: { height: 50, width: 150, margin: 5 } },
                ' ',
                'Add To Cart >>'
              )
            )
          )
        )
      );
    }
  }]);

  return LikeButton;
}(React.Component);

var domContainer = document.querySelector('#tokoonline_content');
ReactDOM.render(e(LikeButton), domContainer);