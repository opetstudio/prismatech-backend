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
    Container = _MaterialUI.Container,
    IconButton = _MaterialUI.IconButton,
    SkipNextIcon = _MaterialUI.SkipNextIcon,
    SkipPreviousIcon = _MaterialUI.SkipPreviousIcon,
    PlayArrowIcon = _MaterialUI.PlayArrowIcon,
    useTheme = _MaterialUI.useTheme,
    TextField = _MaterialUI.TextField,
    FormControlLabel = _MaterialUI.FormControlLabel,
    Checkbox = _MaterialUI.Checkbox,
    Modal = _MaterialUI.Modal,
    CardActionArea = _MaterialUI.CardActionArea;


var backendBaseUrl = TOKOONLINE_BASEURL;

var useStyles = makeStyles(function (theme) {
  return {
    root: {
      display: 'flex'
    },
    icon: {
      marginRight: theme.spacing(2)
    },
    details: {
      display: 'flex',
      flexDirection: 'column'
    },
    content: {
      flex: '1 0 auto'
    },
    cover: {
      width: 151
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    },
    playIcon: {
      height: 38,
      width: 38
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
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1)
    },
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  };
});
// class App extends React.Component {

function getCookie(cname) {
  console.log('document.cookie', document.cookie);
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
function setCookie(cname, cvalue, exdays) {
  console.log('setCookie===>', cname);
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/*';
}
function App() {
  var tokoonlinesessionid = localStorage.getItem(TOKOONLINE_TOKOID);
  if (!tokoonlinesessionid) localStorage.setItem(TOKOONLINE_TOKOID, '' + new Date().getTime());
  var classes = useStyles();
  var theme = useTheme();

  var _React$useState = React.useState({
    error: null,
    listData: null,
    pageCount: 0,
    pageIndex: 0,
    pageSize: 0,
    count: 0,
    reload: 0,
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

  var _React$useState5 = React.useState({
    payload: {},
    error: null,
    isRequest: false
  }),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      checkoutProcessRequest = _React$useState6[0],
      setCheckoutProcessRequest = _React$useState6[1];

  var _React$useState7 = React.useState({
    modalOpen: false,
    error: null,
    isRequest: false
  }),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      paymentProcessRequest = _React$useState8[0],
      setPaymentProcessRequest = _React$useState8[1];

  var _React$useState9 = React.useState({
    error: null,
    isRequest: false
  }),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      removeFromCartRequest = _React$useState10[0],
      setRemoveFromCartRequest = _React$useState10[1];

  var _React$useState11 = React.useState({
    error: null,
    detailData: null,
    isRequest: false
  }),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      purchaseOrderDetailRequest = _React$useState12[0],
      setPurchaseOrderDetailRequest = _React$useState12[1];

  var count = productCatalogRequest.count,
      pageCount = productCatalogRequest.pageCount,
      listData = productCatalogRequest.listData,
      pageIndex = productCatalogRequest.pageIndex,
      pageSize = productCatalogRequest.pageSize,
      reload = productCatalogRequest.reload;

  var doFetchData = React.useCallback(function (_ref) {
    var pageSize = _ref.pageSize,
        pageIndex = _ref.pageIndex;

    //     // fetch product
    // Simple POST request with a JSON body using fetch
    var graphqlData = 'query{\n      getAllTokoCartsBySessionId(session_id: "' + localStorage.getItem(TOKOONLINE_TOKOID) + '", page_size: 10, page_index: 0){\n        error,\n        count,\n        page_count,\n        status,\n        list_data{\n          _id,\n          product_id{\n            _id,\n            code,\n            price,\n            name,\n            description,\n            image_id{\n              _id,\n              filename,\n              file_type\n            }\n          },\n          toko_id{\n            name\n          },\n          count,\n          amount\n        }\n      }\n    }';
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
      return response.data.getAllTokoCartsBySessionId;
    }).then(function (data) {
      return setProductCatalogRequest({ listData: data.list_data, pageCount: data.page_count, count: data.count, isRequest: false });
    });
  }, []);
  var doAddToCart = function doAddToCart(_ref2) {
    var productId = _ref2.productId;

    var graphqlData = 'mutation{addToCart( toko_id: "' + TOKOONLINE_TOKOID + '", device_id: "xxxx", product_id: "' + productId + '", session_id: "' + localStorage.getItem(TOKOONLINE_TOKOID) + '"){status,error,detail_data{_id,product_id{_id,name,\n                          code,\n                          price,\n                          description,\n                          image_id{\n                            _id,\n                            filename,\n                            file_type\n                          }\n                        }\n                        count,\n                        amount,\n                        device_id,\n                        session_id,\n                        toko_id{\n                          slug\n                        }\n                      }\n                    }\n                    }';
    var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: graphqlData })
    };
    fetch(backendBaseUrl + '/graphql', requestOptions).then(function (response) {
      return response.json();
    }).then(function (response) {
      if (response.errors) return alert(JSON.stringify(response.errors));
      return response.data.addToCart;
    }).then(function (data) {
      if (!data) return;
      setAddToCartRequest({ error: data.error, isRequest: false });
      if (data.error) alert(data.error);else setProductCatalogRequest({ reload: reload + 1 });
      // if (!data.error) window.location.href = TOKOONLINE_PAGE_SHOPPING_CART
      // else alert(data.error)
    });
  };
  var buttonDecProductCount = function buttonDecProductCount(_ref3) {
    var productId = _ref3.productId;

    // alert(productId)
    // return
    var graphqlData = 'mutation{removeFromCart(  toko_id: "' + TOKOONLINE_TOKOID + '", device_id: "xxxx", product_id: "' + productId + '", session_id: "' + localStorage.getItem(TOKOONLINE_TOKOID) + '"){status,error,detail_data{_id,product_id{_id,name,\n              code,\n              price,\n              description,\n              image_id{\n                _id,\n                filename,\n                file_type\n              }\n            }\n            count,\n            device_id,\n            session_id,\n            toko_id{\n              slug\n            }\n          }\n        }\n      }';
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
      if (response.errors) return alert(JSON.stringify(response.errors));
      return response.data.removeFromCart;
    }).then(function (data) {
      if (!data) return;
      setRemoveFromCartRequest({ error: data.error, isRequest: false });

      if (data.error) alert(data.error);else setProductCatalogRequest({ reload: reload + 1 });
    });
  };
  var paymentProcess = function paymentProcess() {
    console.log('paymentProcess');
    var graphqlData = 'mutation\n    {\n      paymentProcess(\n            session_id: "' + localStorage.getItem(TOKOONLINE_TOKOID) + '"\n          )\n      {\n        status,\n        error,\n        payment_page_url,\n        debitin_paymentpage_backend_baseurl\n      }\n    }';
    var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: graphqlData })
    };
    fetch(backendBaseUrl + '/graphql', requestOptions).then(function (response) {
      return response.json();
    }).then(function (response) {
      console.log('response===>', response);
      if (response.errors) return alert(JSON.stringify(response.errors));
      return response.data.paymentProcess;
    }).then(function (data) {
      if (!data) return;
      setPaymentProcessRequest({ error: data.error, isRequest: false, modalOpen: false });

      console.log('data=====>' + data.error);
      if (data.error) return alert(data.error);
      localStorage.setItem(TOKOONLINE_TOKOID, '' + new Date().getTime());
      window.location.href = data.debitin_paymentpage_backend_baseurl + data.payment_page_url;
    });
  };

  React.useEffect(function () {
    doFetchData({ pageSize: pageSize, pageIndex: pageIndex });
  }, [doFetchData, pageIndex, pageSize, reload]);

  var doFetchDetailDataPo = React.useCallback(function () {
    var graphqlData = 'query{\n      getDetailTokoPoBySessionId(session_id: "' + localStorage.getItem(TOKOONLINE_TOKOID) + '"){\n          error,\n          status,\n          data_detail{\n            _id,\n            email,\n            full_name,\n            invoice_code,\n            phone_number,\n            shipping_address,\n            total_amount,\n            total_product_amount,\n            shipping_amount\n          }\n        }\n      }';
    var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: graphqlData })
    };
    fetch(backendBaseUrl + '/graphql', requestOptions).then(function (response) {
      return response.json();
    }).then(function (response) {
      console.log('getDetailTokoPoBySessionId response===>', response);
      // response.json()
      return response.data.getDetailTokoPoBySessionId;
    }).then(function (data) {
      if (!data) return;
      setPurchaseOrderDetailRequest({ detailData: data.data_detail, isRequest: false, error: null });
      setCheckoutProcessRequest({
        payload: {
          full_name: (data.data_detail || {}).full_name,
          email: (data.data_detail || {}).email,
          phone_number: (data.data_detail || {}).phone_number,
          shipping_address: (data.data_detail || {}).shipping_address,
          shipping_amount: (data.data_detail || {}).shipping_amount
        }
      });
    });
  }, []);
  React.useEffect(function () {
    doFetchDetailDataPo();
  }, [doFetchDetailDataPo]);

  React.useEffect(function () {
    doFetchDetailDataPo();
  }, [doFetchDetailDataPo]);

  var ThumbsView = function ThumbsView(_ref4) {
    var productImage = _ref4.productImage,
        productName = _ref4.productName,
        productPrice = _ref4.productPrice,
        index = _ref4.index;
    return React.createElement(
      Grid,
      { item: true, key: index, xs: 12, sm: 6, md: 4 },
      React.createElement(
        Card,
        { className: classes.card },
        React.createElement(CardMedia, {
          className: classes.cardMedia,
          image: backendBaseUrl + '/renderfile/' + productImage.filename + '.' + productImage.file_type,
          title: 'Image title'
        }),
        React.createElement(
          CardContent,
          { className: classes.cardContent },
          React.createElement(
            Typography,
            { gutterBottom: true, variant: 'h5', component: 'h2' },
            productName
          ),
          React.createElement(
            Typography,
            null,
            'Rp. ',
            productPrice
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
          )
        )
      )
    );
  };
  var ListView = function ListView(_ref5) {
    var productImage = _ref5.productImage,
        productName = _ref5.productName,
        productPrice = _ref5.productPrice,
        index = _ref5.index,
        amount = _ref5.amount,
        count = _ref5.count,
        productId = _ref5.productId;
    return React.createElement(
      Grid,
      { item: true, key: index, xs: 12, sm: 12, md: 12 },
      React.createElement(
        Card,
        { className: classes.root },
        React.createElement(CardMedia, {
          className: classes.cover,
          image: backendBaseUrl + '/renderfile/' + productImage.filename + '.' + productImage.file_type,
          title: 'Live from space album cover'
        }),
        React.createElement(
          'div',
          { className: classes.details },
          React.createElement(
            CardContent,
            { className: classes.content },
            React.createElement(
              Typography,
              { component: 'h5', variant: 'h5' },
              productName
            ),
            React.createElement(
              Typography,
              { variant: 'subtitle1', color: 'textSecondary' },
              'Price: Rp. ',
              productPrice
            ),
            React.createElement(
              Typography,
              { variant: 'subtitle1', color: 'textSecondary' },
              'Qty: ',
              count
            ),
            React.createElement(
              Typography,
              { variant: 'subtitle1', color: 'textSecondary' },
              'Total Amount: ',
              amount
            )
          )
        )
      )
    );
  };

  var fullName = (purchaseOrderDetailRequest.detailData || {}).full_name;
  console.log('purchaseOrderDetailRequest.detailData======>', fullName);
  var renderTextField = function renderTextField(_ref6) {
    var name = _ref6.name,
        label = _ref6.label,
        value = _ref6.value,
        defaultValue = _ref6.defaultValue;
    return React.createElement(
      Grid,
      { item: true, xs: 12, sm: 6 },
      React.createElement(TextField, {
        id: name,
        label: label,
        fullWidth: true,
        defaultValue: value || defaultValue,
        value: value,
        disabled: true
      })
    );
  };
  return React.createElement(
    'div',
    null,
    React.createElement(CssBaseline, null),
    React.createElement(
      Grid,
      { container: true },
      React.createElement(
        Grid,
        { item: true, xs: 12, sm: 12, md: 12, lg: 6 },
        (listData || []).map(function (v, index) {
          var amount = v.amount;
          var count = v.count;
          var productId = v.product_id._id;
          var productName = v.product_id.name;
          var productPrice = v.product_id.price;
          var productImage = (v.product_id || {}).image_id || {};
          // const productImage = (v.product_id.image_id || {}).filename}.${(v.image_id || {}).file_type
          // return ThumbsView({ productName, productPrice, productImage, index })
          return ListView({ amount: amount, count: count, productName: productName, productPrice: productPrice, productImage: productImage, index: index, productId: productId });
        })
      ),
      React.createElement(
        Grid,
        { item: true, xs: 12, sm: 12, md: 12, lg: 6 },
        React.createElement(
          'div',
          { style: { padding: 10 } },
          React.createElement(
            Typography,
            { variant: 'h6', gutterBottom: true },
            'Customer Data'
          ),
          React.createElement(
            Grid,
            null,
            renderTextField({ name: 'full_name', label: 'Customer Name', value: (checkoutProcessRequest.payload || {}).full_name, defaultValue: '-' }),
            renderTextField({ name: 'phone_number', label: 'Phone Number', value: (checkoutProcessRequest.payload || {}).phone_number, defaultValue: '-' }),
            renderTextField({ name: 'email', label: 'Email', value: (checkoutProcessRequest.payload || {}).email, defaultValue: '-' }),
            renderTextField({ name: 'shipping_address', label: 'Alamat Pengiriman', value: (checkoutProcessRequest.payload || {}).shipping_address, defaultValue: '-' }),
            renderTextField({ name: 'shipping_amount', label: 'Biaya Pengiriman', value: (checkoutProcessRequest.payload || {}).shipping_amount, defaultValue: 0 })
          ),
          React.createElement(
            'div',
            { className: classes.buttons },
            React.createElement(
              Button,
              { onClick: function onClick() {
                  window.location.href = TOKOONLINE_PAGE_SHOPPING_CART;
                }, className: classes.button },
              'Shopping Cart'
            ),
            React.createElement(
              Button,
              {
                variant: 'contained',
                color: 'primary',
                onClick: function onClick() {
                  return setPaymentProcessRequest(Object.assign({}, paymentProcessRequest, { modalOpen: true }));
                },
                className: classes.button
              },
              'Payment'
            )
          )
        )
      )
    ),
    React.createElement(
      Modal,
      {
        open: paymentProcessRequest.modalOpen,
        onClose: function onClose() {
          return setPaymentProcessRequest(Object.assign({}, paymentProcessRequest, { modalOpen: false }));
        },
        'aria-labelledby': 'simple-modal-title',
        'aria-describedby': 'simple-modal-description'
      },
      React.createElement(
        'div',
        {
          style: {
            top: 50 + '%',
            left: 50 + '%',
            transform: 'translate(-' + 50 + '%, -' + 50 + '%)'
          }, className: classes.paper
        },
        React.createElement(
          'h2',
          { id: 'simple-modal-title' },
          'Konfirmasi'
        ),
        React.createElement(
          'p',
          { id: 'simple-modal-description' },
          'Anda akan melakukan pembayaran. Isi keranjang belanja tidak bisa lagi dirubah.'
        ),
        React.createElement(
          'p',
          null,
          'Tolong dicatat nomor transaksi anda untuk melakukan pengecekan status transaksi:',
          React.createElement('br', null),
          React.createElement(
            'b',
            null,
            localStorage.getItem(TOKOONLINE_TOKOID)
          )
        ),
        React.createElement(
          Button,
          { type: 'button', size: 'small', color: 'primary', onClick: function onClick() {
              return setPaymentProcessRequest(Object.assign({}, paymentProcessRequest, { modalOpen: false }));
            } },
          'Cancel'
        ),
        React.createElement(
          Button,
          { type: 'button', size: 'small', color: 'primary', onClick: function onClick() {
              return paymentProcess();
            } },
          'Ok'
        )
      )
    )
  );
}
ReactDOM.render(React.createElement(App, null), document.querySelector('#tokoonline_content'));