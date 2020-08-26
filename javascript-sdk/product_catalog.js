'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _MaterialUI = MaterialUI,
    Button = _MaterialUI.Button,
    Card = _MaterialUI.Card,
    CardActions = _MaterialUI.CardActions,
    CardContent = _MaterialUI.CardContent,
    CardMedia = _MaterialUI.CardMedia,
    CssBaseline = _MaterialUI.CssBaseline,
    Grid = _MaterialUI.Grid,
    Typography = _MaterialUI.Typography,
    makeStyles = _MaterialUI.makeStyles,
    Container = _MaterialUI.Container;


var backendBaseUrl = TOKOONLINE_BASEURL;

var useStyles = makeStyles(function (theme) {
  return {
    icon: {
      marginRight: theme.spacing(2)
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6)
    },
    heroButtons: {
      marginTop: theme.spacing(4)
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8)
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    cardMedia: {
      paddingTop: '56.25%' // 16:9
    },
    cardContent: {
      flexGrow: 1
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6)
    }
  };
});
// class App extends React.Component {
function App() {
  var tokoonlinesessionid = localStorage.getItem('tokoonlinesessionid');
  if (!tokoonlinesessionid) localStorage.setItem('tokoonlinesessionid', '' + new Date().getTime());
  var classes = useStyles();

  var _React$useState = React.useState({
    error: null,
    listData: null,
    pageCount: 0,
    pageIndex: 0,
    pageSize: 0,
    count: 0,
    isRequest: false
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      productCatalogRequest = _React$useState2[0],
      setProductCatalogRequest = _React$useState2[1];

  var _React$useState3 = React.useState({
    error: null,
    isRequest: false
  }),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      addToCartRequest = _React$useState4[0],
      setAddToCartRequest = _React$useState4[1];

  var doFetchData = React.useCallback(function (_ref) {
    var pageSize = _ref.pageSize,
        pageIndex = _ref.pageIndex;

    //     // fetch product
    // Simple POST request with a JSON body using fetch
    var graphqlData = 'query{\n      getAllTokoProductsByTokoId(toko_id: "' + TOKOONLINE_TOKOID + '" ,page_size: 10, page_index: 0, string_to_search: ""){\n        error,\n        count,\n        page_count,\n        status,\n        list_data{\n          _id,\n          name,\n          price,\n          code,\n          description,\n          image_id{\n            _id,\n            filename,\n            file_type\n          }\n        }\n      }\n    }';
    var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: graphqlData })
    };
    fetch(backendBaseUrl + '/graphql', requestOptions).then(function (response) {
      return response.json();
    }).then(function (response) {
      console.log('response===>', response);
      // response.json()
      return response.data.getAllTokoProductsByTokoId;
    }).then(function (data) {
      return setProductCatalogRequest({ listData: data.list_data, pageCount: data.page_count, count: data.count, isRequest: false });
    });
  }, []);
  var doAddToCart = function doAddToCart(_ref2) {
    var productId = _ref2.productId;

    var graphqlData = 'mutation{addToCart( toko_id: "' + TOKOONLINE_TOKOID + '", device_id: "xxxx", product_id: "' + productId + '", session_id: "' + localStorage.getItem('tokoonlinesessionid') + '"){status,error,detail_data{_id,product_id{_id,name,\n                          code,\n                          price,\n                          description,\n                          image_id{\n                            _id,\n                            filename,\n                            file_type\n                          }\n                        }\n                        count,\n                        device_id,\n                        session_id,\n                        toko_id{\n                          slug\n                        }\n                      }\n                    }\n                    }';
    var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: graphqlData })
    };
    fetch(backendBaseUrl + '/graphql', requestOptions).then(function (response) {
      return response.json();
    }).then(function (response) {
      console.log('response===>', response);
      // response.json()
      return response.data.addToCart;
    }).then(function (data) {
      setAddToCartRequest({ error: data.error, isRequest: false });
      if (!data.error) window.location.href = TOKOONLINE_PAGE_SHOPPING_CART;else alert(data.error);
    });
  };

  var error = productCatalogRequest.error,
      count = productCatalogRequest.count,
      pageCount = productCatalogRequest.pageCount,
      isRequest = productCatalogRequest.isRequest,
      listData = productCatalogRequest.listData,
      pageIndex = productCatalogRequest.pageIndex,
      pageSize = productCatalogRequest.pageSize;


  React.useEffect(function () {
    doFetchData({ pageSize: pageSize, pageIndex: pageIndex });
  }, [doFetchData, pageIndex, pageSize]);

  return React.createElement(
    'div',
    null,
    React.createElement(CssBaseline, null),
    React.createElement(
      Container,
      { className: classes.cardGrid, maxWidth: 'md' },
      React.createElement(
        Grid,
        { container: true, spacing: 4 },
        (listData || []).map(function (v, i) {
          return React.createElement(
            Grid,
            { item: true, key: i, xs: 12, sm: 6, md: 4 },
            React.createElement(
              Card,
              { className: classes.card },
              React.createElement(CardMedia, {
                className: classes.cardMedia,
                image: backendBaseUrl + '/renderfile/' + (v.image_id || {}).filename + '.' + (v.image_id || {}).file_type,
                title: 'Image title'
              }),
              React.createElement(
                CardContent,
                { className: classes.cardContent },
                React.createElement(
                  Typography,
                  { gutterBottom: true, variant: 'h5', component: 'h2' },
                  v.name
                ),
                React.createElement(
                  Typography,
                  null,
                  'Rp. ',
                  v.price
                )
              ),
              React.createElement(
                CardActions,
                null,
                React.createElement(
                  Button,
                  { size: 'small', color: 'primary', onClick: function onClick() {
                      window.location.href = TOKOONLINE_PAGE_PRODUCT_DETAIL + '#' + v.code;
                    } },
                  'View'
                ),
                React.createElement(
                  Button,
                  {
                    onClick: function onClick() {
                      doAddToCart({ productId: '' + v._id });
                    },
                    size: 'small',
                    color: 'primary' },
                  'Add To Cart'
                )
              )
            )
          );
        })
      )
    )
  );
}
ReactDOM.render(React.createElement(App, null), document.querySelector('#tokoonline_content'));