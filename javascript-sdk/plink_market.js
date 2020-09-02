'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    Paper = _MaterialUI.Paper,
    Skeleton = _MaterialUI.Skeleton,
    Carousel = _MaterialUI.Carousel,
    ButtonGroup = _MaterialUI.ButtonGroup,
    InputBase = _MaterialUI.InputBase,
    Box = _MaterialUI.Box,
    Chip = _MaterialUI.Chip,
    CloseIcon = _MaterialUI.CloseIcon,
    ShopingCartIcon = _MaterialUI.ShopingCartIcon,
    AddIcon = _MaterialUI.AddIcon,
    RemoveIcon = _MaterialUI.RemoveIcon,
    TextField = _MaterialUI.TextField,
    IconButton = _MaterialUI.IconButton,
    SkipNextIcon = _MaterialUI.SkipNextIcon,
    SkipPreviousIcon = _MaterialUI.SkipPreviousIcon,
    PlayArrowIcon = _MaterialUI.PlayArrowIcon,
    useTheme = _MaterialUI.useTheme,
    FormControlLabel = _MaterialUI.FormControlLabel,
    Checkbox = _MaterialUI.Checkbox,
    Avatar = _MaterialUI.Avatar,
    ListItem = _MaterialUI.ListItem,
    ListItemAvatar = _MaterialUI.ListItemAvatar,
    ListItemText = _MaterialUI.ListItemText,
    ListItemSecondaryAction = _MaterialUI.ListItemSecondaryAction,
    List = _MaterialUI.List,
    Divider = _MaterialUI.Divider,
    FormControl = _MaterialUI.FormControl,
    InputLabel = _MaterialUI.InputLabel,
    Select = _MaterialUI.Select,
    MenuItem = _MaterialUI.MenuItem,
    FormHelperText = _MaterialUI.FormHelperText,
    Modal = _MaterialUI.Modal,
    CardActionArea = _MaterialUI.CardActionArea;

console.log('window.location.search==?', window.location.search);

// production
// const backendBaseUrl = baseUrl
// const TOKOONLINE_TOKOID = tokoId

// development
var backendBaseUrl = 'http://localhost:3000';
var TOKOONLINE_TOKOID = '5f3373db203efa581d2354a2';

var useStyles = makeStyles(function (theme) {
  return {
    icon: {
      marginRight: theme.spacing(2)
    },
    // heroContent: {
    //   backgroundColor: theme.palette.background.paper,
    //   padding: theme.spacing(8, 0, 6)
    // },
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
    heroContent: {
      marginTop: 100,
      marginBottom: 30,
      padding: 20,
      background: '#fff'
    },
    sectionDesktop: _defineProperty({
      display: 'none'
    }, theme.breakpoints.up('md'), {
      display: 'flex'
    }),
    sectionMobile: _defineProperty({
      display: 'flex'
    }, theme.breakpoints.up('md'), {
      display: 'none'
    }),
    product_img_md: {
      width: 400,
      height: 400
    },
    product_empty_md: {
      width: 400,
      height: 400,
      background: '#A6ACAF'
    },
    product_img_xs: {
      width: 300,
      height: 300
    },
    product_empty_xs: {
      width: 300,
      height: 300,
      background: '#A6ACAF'
    },
    product_name: {
      marginTop: 10,
      marginBottom: 0,
      fontSize: 24,
      fontWeight: 700
    },
    product_detail: {
      margin: '2rem 1rem',
      textAlign: 'justify'
    },
    statusLabel_01: {
      background: '#109607',
      color: 'white',
      fontWeight: '700'
    },
    statusLabel_02: {
      background: '#F6D20B',
      color: 'white',
      fontWeight: '700'
    },
    addToCartContainer: {
      background: '#F7F9F9',
      // margin: '1rem 0',
      padding: '1rem'
    },
    priceContainer: {
      marginTop: 10,
      marginBottom: 0,
      color: '#AF1200',
      fontWeight: 'bold',
      fontSize: '1.5rem'
    },
    inputRoot: {
      height: '2rem',
      color: 'inherit',
      background: '#fff'
    },
    inputInput: _defineProperty({
      fontSize: '12px',
      padding: '1rem',
      // vertical padding + font size from searchIcon
      transition: theme.transitions.create('width'),
      width: '100%'
    }, theme.breakpoints.up('md'), {
      width: '1.5rem'
    }),
    btnActionRed: {
      margin: '1rem 1rem 2rem 0',
      fontSize: '0.7rem'
    },
    spesifikasiContainer: {
      margin: '0 0 1.5rem',
      padding: '3rem 2rem',
      background: '#fff'
    },
    spesifikasiTitleContainer: {
      background: '#D0D3D4',
      borderRadius: '1rem',
      padding: '1rem',
      margin: '1rem 0'
    },
    spesifikasiTitle: {
      fontWeight: 'bold',
      fontSize: '1.2rem'
    },
    spesifikasi_table: {
      margin: '2rem 1rem'
    },
    bc_link: {
      color: '#D35400'
    },
    success_color: {
      background: '#357a38',
      color: '#fff'
    },
    root: {
      margin: 8,
      backgroundColor: theme.palette.background.paper,
      overflow: 'hidden'
    },
    margin: {
      margin: theme.spacing(1)
    },
    // root: {
    //   display: 'flex'
    // },
    // icon: {
    //   marginRight: theme.spacing(2)
    // },
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

function ProductCatalog(_ref) {
  var goToScene = _ref.goToScene;

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

  var doFetchData = React.useCallback(function (_ref2) {
    var pageSize = _ref2.pageSize,
        pageIndex = _ref2.pageIndex;

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
  var doAddToCart = function doAddToCart(_ref3) {
    var productId = _ref3.productId;

    var graphqlData = 'mutation{addToCart( toko_id: "' + TOKOONLINE_TOKOID + '", device_id: "xxxx", product_id: "' + productId + '", session_id: "' + localStorage.getItem(TOKOONLINE_TOKOID) + '"){status,error,detail_data{_id,product_id{_id,name,\n                          code,\n                          price,\n                          description,\n                          image_id{\n                            _id,\n                            filename,\n                            file_type\n                          }\n                        }\n                        count,\n                        device_id,\n                        session_id,\n                        toko_id{\n                          slug\n                        }\n                      }\n                    }\n                    }';
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
      return response.data.addToCart;
    }).then(function (data) {
      if (!data) return;
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
        { container: true, spacing: 1 },
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
                  {
                    size: 'small',
                    color: 'primary',
                    onClick: function onClick() {
                      goToScene({ scene: 'product_detail', props: { productCode: v.code } });
                      // window.location.href = TOKOONLINE_PAGE_PRODUCT_DETAIL + '#' + v.code
                    }
                  },
                  'View'
                ),
                React.createElement(
                  Button,
                  {
                    onClick: function onClick() {
                      doAddToCart({ productId: '' + v._id });
                    },
                    size: 'small',
                    color: 'primary'
                  },
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
function ProductDetail(_ref4) {
  var goToScene = _ref4.goToScene,
      productCode = _ref4.productCode;

  var classes = useStyles();

  var _React$useState5 = React.useState({
    error: null,
    detailData: null,
    cartDetail: {},
    isRequest: false
  }),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      productDetailRequest = _React$useState6[0],
      setProductDetailRequest = _React$useState6[1];

  var _React$useState7 = React.useState({
    error: null,
    isRequest: false
  }),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      addToCartRequest = _React$useState8[0],
      setAddToCartRequest = _React$useState8[1];

  var doAddToCart = function doAddToCart(_ref5) {
    var productId = _ref5.productId,
        isStay = _ref5.isStay;

    if (qty < 1) return;
    var graphqlData = 'mutation{addToCart(count:' + qty + ', toko_id: "' + TOKOONLINE_TOKOID + '", device_id: "xxxx", product_id: "' + productId + '", session_id: "' + localStorage.getItem(TOKOONLINE_TOKOID) + '"){status,error,detail_data{_id,product_id{_id,name,\n                            code,\n                            price,\n                            description,\n                            image_id{\n                              _id,\n                              filename,\n                              file_type\n                            }\n                          }\n                          count,\n                          amount,\n                          device_id,\n                          session_id,\n                          toko_id{\n                            slug\n                          }\n                        }\n                      }\n                      }';
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
      return response.data.addToCart;
    }).then(function (data) {
      if (!data) return;
      setAddToCartRequest({ error: data.error, isRequest: false });
      // if (data.error) alert(data.error)
      // else setProductCatalogRequest({ reload: reload + 1 })
      if (data.error) return alert(data.error);
      if (!isStay) goToScene({ scene: 'shopping_cart' });
      // if (!isStay) window.location.href = TOKOONLINE_PAGE_SHOPPING_CART
    });
  };

  var _React$useState9 = React.useState(0),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      qty = _React$useState10[0],
      setQty = _React$useState10[1];

  var doFetchData = React.useCallback(function () {
    var graphqlData = 'query{\n        getDetailTokoProductJoinCartByCode(code: "' + productCode + '", session_id: "' + localStorage.getItem(TOKOONLINE_TOKOID) + '"){\n        error,\n        status,\n        data_detail_in_cart{\n            count\n        },\n        data_detail{\n          _id,\n          name,\n          price,\n          code,\n          description,\n          image_id{\n            _id,\n            filename,\n            file_type\n          }\n        }\n      }\n    }';
    var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: graphqlData })
    };
    fetch(backendBaseUrl + '/graphql', requestOptions).then(function (response) {
      return response.json();
    }).then(function (response) {
      // console.log('response===>', response)
      // response.json()
      return response.data.getDetailTokoProductJoinCartByCode;
    }).then(function (data) {
      setProductDetailRequest({ cartDetail: data.data_detail_in_cart, detailData: data.data_detail, isRequest: false, error: null });
      setQty((data.data_detail_in_cart || {}).count || 0);
    });
  }, []);
  var error = productDetailRequest.error,
      isRequest = productDetailRequest.isRequest;

  var detailData = productDetailRequest.detailData || {};

  React.useEffect(function () {
    doFetchData();
  }, [doFetchData]);

  var handleDecreaseItem = function handleDecreaseItem(event, index) {
    if (qty > 0) {
      setQty(qty - 1);
    }
  };

  var handleIncreaseItem = function handleIncreaseItem(event, index) {
    setQty(qty + 1);
  };

  return (
    // newest
    React.createElement(
      'div',
      null,
      React.createElement(
        Container,
        null,
        React.createElement(
          'div',
          { className: classes.heroContent },
          React.createElement(
            Grid,
            { container: true, spacing: 5, justify: 'center' },
            React.createElement(
              Grid,
              { item: true },
              React.createElement(
                'div',
                { className: classes.sectionDesktop },
                isRequest ? React.createElement(Skeleton, { variant: 'rect', animation: 'wave', width: 400, height: 400 }) : React.createElement(CardMedia, {
                  className: classes.product_img_md,
                  image: backendBaseUrl + '/renderfile/' + (detailData.image_id || {}).filename + '.' + (detailData.image_id || {}).file_type,
                  title: 'Image title'
                })
              ),
              React.createElement(
                'div',
                { className: classes.sectionMobile },
                isRequest ? React.createElement(Skeleton, { variant: 'rect', animation: 'wave', width: 300, height: 300 }) : React.createElement(CardMedia, {
                  className: classes.product_img_md,
                  image: backendBaseUrl + '/renderfile/' + (detailData.image_id || {}).filename + '.' + (detailData.image_id || {}).file_type,
                  title: 'Image title'
                })
              )
            ),
            React.createElement(
              Grid,
              { item: true, xs: 12, sm: 6, md: 4 },
              React.createElement(
                Grid,
                { container: true, spacing: 2, direction: 'row' },
                React.createElement(
                  Grid,
                  { item: true },
                  isRequest ? React.createElement(Skeleton, { animation: 'wave', height: 60, width: '5rem' }) :
                  // check if stock exist next
                  React.createElement(Chip, { label: 'Ada Stok' })
                ),
                React.createElement(
                  Grid,
                  { item: true },
                  isRequest ? React.createElement(Skeleton, { animation: 'wave', height: 60, width: '5rem' }) :
                  // need to return category from backend
                  React.createElement(Chip, { label: 'ButuhKategori', className: classes.success_color })
                )
              ),
              React.createElement(
                Grid,
                { container: true, spacing: 2, direction: 'column' },
                React.createElement(
                  Typography,
                  { className: classes.product_name, component: 'p' },
                  isRequest ? React.createElement(Skeleton, { animation: 'wave', height: 50 }) : detailData.name
                ),
                React.createElement(
                  Typography,
                  { className: classes.priceContainer },
                  isRequest ? React.createElement(Skeleton, { animation: 'wave', height: 50, width: '30%' }) : 'Rp. ' + detailData.price
                ),
                React.createElement(
                  Grid,
                  { item: true, style: { padding: 0, marginTop: 10 } },
                  React.createElement(
                    Typography,
                    { className: classes.spesifikasiTitle },
                    'Detail Produk'
                  ),
                  React.createElement(
                    Typography,
                    null,
                    detailData.description
                  )
                ),
                React.createElement(
                  Box,
                  null,
                  isRequest ? React.createElement(Skeleton, { animation: 'wave', height: 100 }) : React.createElement(
                    Grid,
                    { container: true, className: classes.addToCartContainer },
                    React.createElement(
                      Grid,
                      { item: true, xs: 6, sm: 6, md: 6 },
                      React.createElement(
                        Typography,
                        { color: 'textSecondary' },
                        'Qty'
                      )
                    ),
                    React.createElement(
                      Grid,
                      { item: true, xs: 6, sm: 6, md: 6 },
                      React.createElement(
                        ButtonGroup,
                        { disableElevation: true, variant: 'contained' },
                        React.createElement(
                          Button,
                          { size: 'small', onClick: handleDecreaseItem },
                          'Min'
                        ),
                        React.createElement(TextField, {
                          id: 'outlined-size-small',
                          defaultValue: '0',
                          value: qty,
                          variant: 'outlined',
                          onChange: function onChange(e) {
                            return setQty(e.target.value);
                          },
                          type: 'number',
                          size: 'small'
                        }),
                        React.createElement(
                          Button,
                          { size: 'small', onClick: handleIncreaseItem },
                          'Plus'
                        )
                      )
                    )
                  )
                ),
                React.createElement(
                  'div',
                  { className: classes.sectionDesktop },
                  isRequest ? React.createElement(Skeleton, {
                    animation: 'wave', height: 50, width: 200,
                    style: { marginRight: '1rem' }
                  }) : React.createElement(
                    Button,
                    {
                      variant: 'outlined', color: 'secondary',
                      className: classes.btnActionRed,
                      onClick: function onClick() {
                        return doAddToCart({ productId: detailData._id, isStay: true });
                      }
                    },
                    'Tambah ke keranjang'
                  ),
                  isRequest ? React.createElement(Skeleton, { animation: 'wave', height: 50, width: 150 }) : React.createElement(
                    Button,
                    {
                      variant: 'contained', color: 'secondary',
                      className: classes.btnActionRed,
                      onClick: function onClick() {
                        return doAddToCart({ productId: detailData._id });
                      }
                    },
                    'Beli Sekarang'
                  )
                ),
                React.createElement(
                  'div',
                  { className: classes.sectionMobile },
                  isRequest ? React.createElement(Skeleton, {
                    animation: 'wave', height: 50, width: 200,
                    style: { marginRight: '1rem' }
                  }) : React.createElement(
                    Button,
                    {
                      variant: 'outlined', color: 'secondary',
                      className: classes.btnActionRed,
                      onClick: function onClick() {
                        return doAddToCart({ productId: detailData._id, isStay: true });
                      }
                    },
                    'Tambah ke keranjang'
                  ),
                  isRequest ? React.createElement(Skeleton, { animation: 'wave', height: 50, width: 150 }) : React.createElement(
                    Button,
                    {
                      variant: 'contained', color: 'secondary',
                      className: classes.btnActionRed,
                      onClick: function onClick() {
                        return doAddToCart({ productId: detailData._id });
                      }
                    },
                    'Beli Sekarang'
                  )
                )
              )
            )
          )
        )
      )
    )
  );
}
var totalAmount = 0;
function ShoppingCart(_ref6) {
  var goToScene = _ref6.goToScene;

  var classes = useStyles();
  var theme = useTheme();

  var _React$useState11 = React.useState({
    error: null,
    listData: null,
    pageCount: 0,
    pageIndex: 0,
    pageSize: 0,
    count: 0,
    reload: 0,
    isRequest: false
  }),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      productCatalogRequest = _React$useState12[0],
      setProductCatalogRequest = _React$useState12[1];

  var _React$useState13 = React.useState({
    error: null,
    isRequest: false
  }),
      _React$useState14 = _slicedToArray(_React$useState13, 2),
      addToCartRequest = _React$useState14[0],
      setAddToCartRequest = _React$useState14[1];

  var _React$useState15 = React.useState({
    payload: {},
    error: null,
    isRequest: false,
    detailData: {}
  }),
      _React$useState16 = _slicedToArray(_React$useState15, 2),
      checkoutProcessRequest = _React$useState16[0],
      setCheckoutProcessRequest = _React$useState16[1];

  var _React$useState17 = React.useState({
    error: null,
    isRequest: false
  }),
      _React$useState18 = _slicedToArray(_React$useState17, 2),
      removeFromCartRequest = _React$useState18[0],
      setRemoveFromCartRequest = _React$useState18[1];

  var _React$useState19 = React.useState({
    error: null,
    detailData: null,
    isRequest: false
  }),
      _React$useState20 = _slicedToArray(_React$useState19, 2),
      purchaseOrderDetailRequest = _React$useState20[0],
      setPurchaseOrderDetailRequest = _React$useState20[1];

  var _React$useState21 = React.useState(0),
      _React$useState22 = _slicedToArray(_React$useState21, 2),
      ongkir = _React$useState22[0],
      setOngkir = _React$useState22[1];

  var _React$useState23 = React.useState([]),
      _React$useState24 = _slicedToArray(_React$useState23, 2),
      provinsiData = _React$useState24[0],
      setProvinsiData = _React$useState24[1];

  var _React$useState25 = React.useState(''),
      _React$useState26 = _slicedToArray(_React$useState25, 2),
      provinsi = _React$useState26[0],
      setProvinsi = _React$useState26[1];

  var _React$useState27 = React.useState([]),
      _React$useState28 = _slicedToArray(_React$useState27, 2),
      kotaData = _React$useState28[0],
      setKotaData = _React$useState28[1];

  var _React$useState29 = React.useState(''),
      _React$useState30 = _slicedToArray(_React$useState29, 2),
      kota = _React$useState30[0],
      setKota = _React$useState30[1];

  var _React$useState31 = React.useState([]),
      _React$useState32 = _slicedToArray(_React$useState31, 2),
      layananKurir = _React$useState32[0],
      setLayananKurir = _React$useState32[1];

  var count = productCatalogRequest.count,
      pageCount = productCatalogRequest.pageCount,
      listData = productCatalogRequest.listData,
      pageIndex = productCatalogRequest.pageIndex,
      pageSize = productCatalogRequest.pageSize,
      reload = productCatalogRequest.reload;

  var doFetchData = React.useCallback(function (_ref7) {
    var pageSize = _ref7.pageSize,
        pageIndex = _ref7.pageIndex;

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
      console.log('response ctr===>', response);
      // response.json()
      return response.data.getAllTokoCartsBySessionId;
    }).then(function (data) {
      return setProductCatalogRequest({
        listData: data.list_data,
        pageCount: data.page_count,
        count: data.count,
        isRequest: false
      });
    });
  }, []);
  var doAddToCart = function doAddToCart(_ref8) {
    var productId = _ref8.productId;

    var graphqlData = 'mutation{addToCart( toko_id: "' + TOKOONLINE_TOKOID + '", device_id: "xxxx", product_id: "' + productId + '", session_id: "' + localStorage.getItem(TOKOONLINE_TOKOID) + '"){status,error,detail_data{_id,product_id{_id,name,\n                          code,\n                          price,\n                          description,\n                          image_id{\n                            _id,\n                            filename,\n                            file_type\n                          }\n                        }\n                        count,\n                        amount,\n                        device_id,\n                        session_id,\n                        toko_id{\n                          slug\n                        }\n                      }\n                    }\n                    }';
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
      return response.data.addToCart;
    }).then(function (data) {
      if (!data) return;
      setAddToCartRequest({ error: data.error, isRequest: false });
      if (data.error) alert(data.error);else setProductCatalogRequest({ reload: reload + 1 });
      // if (!data.error) window.location.href = TOKOONLINE_PAGE_SHOPPING_CART
      // else alert(data.error)
    });
  };
  var buttonDecProductCount = function buttonDecProductCount(_ref9) {
    var productId = _ref9.productId;

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
      if (response.errors) return alert(JSON.stringify(response.errors));
      return response.data.removeFromCart;
    }).then(function (data) {
      if (!data) return;
      setRemoveFromCartRequest({ error: data.error, isRequest: false });

      if (data.error) alert(data.error);else setProductCatalogRequest({ reload: reload + 1 });
    });
  };
  var checkoutProcess = function checkoutProcess(_ref10) {
    var payload = _ref10.payload;

    var graphqlData = 'mutation\n            {\n              checkoutProcess(\n                    session_id: "' + localStorage.getItem(TOKOONLINE_TOKOID) + '",\n                    device_id: "xxxx",\n                    full_name: "' + payload.full_name + '",\n                    phone_number: "' + payload.phone_number + '",\n                    email: "' + payload.email + '",\n                    cart_id: ' + JSON.stringify(productCatalogRequest.listData.map(function (v) {
      return '' + v._id;
    })) + ',\n                    toko_id: "' + TOKOONLINE_TOKOID + '",\n                    shipping_address: "' + payload.shipping_address + '",\n                    shipping_amount: ' + (payload.shipping_amount || 0) + '\n                  )\n              {\n                status,\n                error,\n                detail_data\n                {\n                  _id\n                }\n              }\n            }';
    var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: graphqlData })
    };
    console.log('graphqlData : ' + graphqlData);
    if (provinsi == '') return alert('Silahkan pilih provinsi');
    if (kota == '') return alert('Silahkan pilih kota');
    if (ongkir == 0) return alert('Silahkan pilih kurir');
    fetch(backendBaseUrl + '/graphql', requestOptions).then(function (response) {
      return response.json();
    }).then(function (response) {
      if (response.errors) return alert(JSON.stringify(response.errors));
      return response.data.checkoutProcess;
    }).then(function (data) {
      if (!data) return;
      var error = data.error;
      setCheckoutProcessRequest({ error: error, isRequest: false, payload: checkoutProcessRequest.payload });
      if (error) alert(error);else goToScene({ scene: 'checkout_confirmation' });
      // else window.location.href = TOKOONLINE_PAGE_CHECKOUT_CONFIRMATION + '#' + data.detail_data._id
      // console.log('data=====>' + data)
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

  var doFetchProvinsi = React.useCallback(function () {
    fetch('http://dev.plink.co.id:8081/plink/v1/province', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(function (res) {
      return res.json();
    }).then(function (result) {
      if (result.rajaongkir.status.code === 200) {
        setProvinsiData(result.rajaongkir.results);
      }
    }, function (error) {
      console.log('error1 : ' + JSON.stringify(error));
    });
  }, []);

  React.useEffect(function () {
    doFetchProvinsi();
  }, [doFetchProvinsi]);

  var handleProvince = function handleProvince(event) {
    setProvinsi(event.target.value);
    fetch('http://dev.plink.co.id:8081/plink/v1/city?province=' + event.target.value, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(function (res) {
      return res.json();
    }).then(function (result) {
      setKotaData(result.rajaongkir.results);
    }, function (error) {
      console.log(JSON.stringify(error));
    });
  };

  var handleCity = function handleCity(event) {
    setKota(event.target.value);
    var countDistanceRequest = {
      origin: '152',
      destination: event.target.value,
      weight: 500,
      courier: 'jne'
    };
    fetch('http://dev.plink.co.id:8081/plink/v1/cost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(countDistanceRequest)
    }).then(function (res) {
      return res.json();
    }).then(function (result) {
      setLayananKurir(result.rajaongkir.results[0].costs);
    }, function (error) {
      console.log(JSON.stringify(error));
    });
  };

  var handleOngkir = function handleOngkir(event) {
    setOngkir(event.target.value);
    // setCheckoutProcessRequest({
    //     payload: {
    //         shipping_amount: (event.target.value)
    //     }
    // })
  };

  var ListView = function ListView(_ref11) {
    var productImage = _ref11.productImage,
        productName = _ref11.productName,
        productPrice = _ref11.productPrice,
        index = _ref11.index,
        amount = _ref11.amount,
        count = _ref11.count,
        productId = _ref11.productId;
    return React.createElement(
      'div',
      { key: index },
      React.createElement(
        ListItem,
        { button: true },
        React.createElement(
          ListItemAvatar,
          null,
          React.createElement(Avatar, {
            alt: 'Avatar n\xB0' + (index + 1),
            src: backendBaseUrl + '/renderfile/' + productImage.filename + '.' + productImage.file_type
          })
        ),
        React.createElement(ListItemText, {
          primary: productName,
          secondary: React.createElement(
            'div',
            null,
            React.createElement(
              Button,
              {
                size: 'small',
                onClick: function onClick() {
                  return buttonDecProductCount({ productId: productId });
                }
              },
              '-'
            ),
            '  ' + count + '  ',
            React.createElement(
              Button,
              { size: 'small', onClick: function onClick() {
                  return doAddToCart({ productId: productId });
                } },
              '+'
            )
          )
        }),
        React.createElement(
          ListItemSecondaryAction,
          null,
          React.createElement(
            Typography,
            {
              component: 'span',
              variant: 'caption',
              className: classes.inline,
              color: 'textPrimary'
            },
            'Rp. ',
            productPrice
          )
        )
      ),
      React.createElement(Divider, { component: 'li' })
    );
  };

  var fullName = (purchaseOrderDetailRequest.detailData || {}).full_name;
  console.log('purchaseOrderDetailRequest.detailData======>', fullName);
  var renderTextField = function renderTextField(_ref12) {
    var _React$createElement;

    var name = _ref12.name,
        label = _ref12.label,
        value = _ref12.value,
        defaultValue = _ref12.defaultValue,
        option = _ref12.option,
        row = _ref12.row;
    return React.createElement(
      Grid,
      (_React$createElement = { item: true }, _defineProperty(_React$createElement, 'item', true), _defineProperty(_React$createElement, 'xs', 12), _defineProperty(_React$createElement, 'md', option == 'area' ? 12 : 6), _React$createElement),
      React.createElement(TextField, {
        id: name,
        label: label,
        fullWidth: true,
        defaultValue: value,
        value: value,
        multiline: true,
        rows: row,
        InputLabelProps: { shrink: true },
        onChange: function onChange(e) {
          return setCheckoutProcessRequest({
            payload: Object.assign({}, checkoutProcessRequest.payload, _defineProperty({}, name, e.target.value))
          });
        }
      })
    );
  };
  return React.createElement(
    'div',
    null,
    React.createElement(CssBaseline, null),
    React.createElement(
      Grid,
      { container: true, spacing: 1 },
      React.createElement(
        Grid,
        { item: true, xs: 12, sm: 12, md: 12, lg: 6 },
        React.createElement(
          Card,
          { className: classes.root },
          React.createElement(
            CardContent,
            null,
            React.createElement(
              List,
              null,
              (listData || []).map(function (v, index) {
                var amount = v.amount;
                var count = v.count;
                var productId = v.product_id._id;
                var productName = v.product_id.name;
                var productPrice = v.product_id.price;
                var productImage = (v.product_id || {}).image_id || {};
                // const productImage = (v.product_id.image_id || {}).filename}.${(v.image_id || {}).file_type
                // return ThumbsView({ productName, productPrice, productImage, index })
                return ListView({
                  amount: amount,
                  count: count,
                  productName: productName,
                  productPrice: productPrice,
                  productImage: productImage,
                  index: index,
                  productId: productId
                });
              }),
              React.createElement(
                Grid,
                {
                  container: true,
                  direction: 'row',
                  justify: 'space-between',
                  alignItems: 'center'
                },
                React.createElement(
                  Typography,
                  { variant: 'caption', style: { marginLeft: 16, marginTop: 16 } },
                  'Ongkir'
                ),
                React.createElement(
                  Typography,
                  {
                    variant: 'caption', color: 'error',
                    style: { marginRight: 16, marginTop: 16 }
                  },
                  'Rp. ',
                  ongkir
                )
              ),
              React.createElement(
                Grid,
                {
                  container: true,
                  direction: 'row',
                  justify: 'space-between',
                  alignItems: 'center'
                },
                React.createElement(
                  Typography,
                  { variant: 'subtitle1', style: { marginLeft: 16, marginTop: 16 } },
                  'Total'
                ),
                React.createElement(
                  Typography,
                  {
                    variant: 'subtitle1', color: 'error',
                    style: { marginRight: 16, marginTop: 16 }
                  },
                  'Rp. ',
                  (listData || []).map(function (v, index) {
                    return v.amount;
                  }).reduce(function (x, y) {
                    return parseInt(x) + parseInt(y) + ongkir;
                  }, 0)
                )
              )
            )
          )
        )
      ),
      React.createElement(
        Grid,
        { item: true, xs: 12, sm: 12, md: 12, lg: 6 },
        React.createElement(
          Card,
          { className: classes.root },
          React.createElement(
            CardContent,
            null,
            React.createElement(
              Typography,
              { variant: 'h6', gutterBottom: true },
              'Customer Data'
            ),
            React.createElement(
              Grid,
              { container: true, spacing: 2 },
              renderTextField({
                name: 'full_name',
                label: 'Nama *',
                value: (checkoutProcessRequest.payload || {}).full_name,
                defaultValue: ''
              }),
              renderTextField({
                name: 'phone_number',
                label: 'Nomor Telepon *',
                value: (checkoutProcessRequest.payload || {}).phone_number,
                defaultValue: ''
              }),
              renderTextField({
                name: 'email',
                label: 'Email *',
                option: 'area',
                value: (checkoutProcessRequest.payload || {}).email,
                defaultValue: ''
              })
            ),
            React.createElement(
              Grid,
              { container: true, spacing: 2, style: { marginTop: 8 } },
              React.createElement(
                Grid,
                { item: true, xs: 12, md: 6 },
                React.createElement(
                  FormControl,
                  { className: classes.formControl, fullWidth: true },
                  React.createElement(
                    InputLabel,
                    { id: 'demo-simple-select-helper-label' },
                    'Provinsi *'
                  ),
                  React.createElement(
                    Select,
                    {
                      labelId: 'demo-simple-select-helper-label',
                      id: 'demo-simple-select-helper',
                      value: provinsi,
                      onChange: handleProvince
                    },
                    React.createElement(
                      MenuItem,
                      { value: '' },
                      React.createElement(
                        'em',
                        null,
                        'None'
                      )
                    ),
                    provinsiData.map(function (prov) {
                      return React.createElement(
                        MenuItem,
                        { key: prov.province_id, value: prov.province_id },
                        prov.province
                      );
                    })
                  ),
                  React.createElement(
                    FormHelperText,
                    null,
                    'Pilih provinsi'
                  )
                )
              ),
              React.createElement(
                Grid,
                { item: true, xs: 12, md: 6 },
                React.createElement(
                  FormControl,
                  { className: classes.formControl, fullWidth: true },
                  React.createElement(
                    InputLabel,
                    { id: 'demo-simple-select-helper-label' },
                    'Kota *'
                  ),
                  React.createElement(
                    Select,
                    {
                      labelId: 'demo-simple-select-helper-label',
                      id: 'demo-simple-select-helper',
                      value: kota,
                      onChange: handleCity
                    },
                    React.createElement(
                      MenuItem,
                      { value: '' },
                      React.createElement(
                        'em',
                        null,
                        'None'
                      )
                    ),
                    kotaData.map(function (city) {
                      return React.createElement(
                        MenuItem,
                        { key: city.city_id, value: city.city_id },
                        city.city_name
                      );
                    })
                  ),
                  React.createElement(
                    FormHelperText,
                    null,
                    'Pilih kota'
                  )
                )
              ),
              React.createElement(
                Grid,
                { item: true, xs: 12, md: 6 },
                React.createElement(
                  FormControl,
                  { className: classes.formControl, fullWidth: true },
                  React.createElement(
                    InputLabel,
                    { id: 'demo-simple-select-helper-label' },
                    'Layanan Kurir *'
                  ),
                  React.createElement(
                    Select,
                    {
                      labelId: 'demo-simple-select-helper-label',
                      id: 'demo-simple-select-helper',
                      value: ongkir,
                      onChange: handleOngkir
                    },
                    React.createElement(
                      MenuItem,
                      { value: 0 },
                      '-'
                    ),
                    (layananKurir || []).map(function (layanan) {
                      return React.createElement(
                        MenuItem,
                        {
                          key: layanan.service,
                          value: layanan.cost[0].value
                        },
                        'JNE - ' + layanan.service
                      );
                    })
                  ),
                  React.createElement(
                    FormHelperText,
                    null,
                    'Pilih Layanan Kurir'
                  )
                )
              ),
              renderTextField({
                name: 'kode_pos',
                label: 'Kode pos',
                defaultValue: ''
              })
            ),
            React.createElement(
              Grid,
              { container: true, spacing: 2 },
              renderTextField({
                name: 'shipping_address',
                label: 'Alamat lengkap *',
                option: 'area',
                row: 4,
                value: (checkoutProcessRequest.payload || {}).shipping_address,
                defaultValue: ''
              })
            )
          ),
          React.createElement(
            CardActions,
            null,
            React.createElement(
              Button,
              {
                style: { margin: 8 },
                size: 'small',
                variant: 'outlined',
                onClick: function onClick() {
                  goToScene({ scene: 'product_catalog' });
                }, className: classes.button
              },
              'Katalog'
            ),
            React.createElement(
              Button,
              {
                style: { margin: 8 },
                size: 'small',
                variant: 'contained', color: 'primary', disableElevation: true,
                onClick: function onClick() {
                  return checkoutProcess({ payload: checkoutProcessRequest.payload });
                },
                className: classes.button
              },
              'Lanjutkan'
            )
          )
        )
      )
    )
  );
}
function CheckoutConfirmation(_ref13) {
  var goToScene = _ref13.goToScene;

  var classes = useStyles();
  var theme = useTheme();

  var _React$useState33 = React.useState({
    error: null,
    listData: null,
    pageCount: 0,
    pageIndex: 0,
    pageSize: 0,
    count: 0,
    reload: 0,
    isRequest: false
  }),
      _React$useState34 = _slicedToArray(_React$useState33, 2),
      productCatalogRequest = _React$useState34[0],
      setProductCatalogRequest = _React$useState34[1];

  var _React$useState35 = React.useState({
    error: null,
    isRequest: false
  }),
      _React$useState36 = _slicedToArray(_React$useState35, 2),
      addToCartRequest = _React$useState36[0],
      setAddToCartRequest = _React$useState36[1];

  var _React$useState37 = React.useState({
    payload: {},
    error: null,
    isRequest: false
  }),
      _React$useState38 = _slicedToArray(_React$useState37, 2),
      checkoutProcessRequest = _React$useState38[0],
      setCheckoutProcessRequest = _React$useState38[1];

  var _React$useState39 = React.useState({
    modalOpen: false,
    error: null,
    isRequest: false
  }),
      _React$useState40 = _slicedToArray(_React$useState39, 2),
      paymentProcessRequest = _React$useState40[0],
      setPaymentProcessRequest = _React$useState40[1];

  var _React$useState41 = React.useState({
    error: null,
    isRequest: false
  }),
      _React$useState42 = _slicedToArray(_React$useState41, 2),
      removeFromCartRequest = _React$useState42[0],
      setRemoveFromCartRequest = _React$useState42[1];

  var _React$useState43 = React.useState({
    error: null,
    detailData: null,
    isRequest: false
  }),
      _React$useState44 = _slicedToArray(_React$useState43, 2),
      purchaseOrderDetailRequest = _React$useState44[0],
      setPurchaseOrderDetailRequest = _React$useState44[1];

  var count = productCatalogRequest.count,
      pageCount = productCatalogRequest.pageCount,
      listData = productCatalogRequest.listData,
      pageIndex = productCatalogRequest.pageIndex,
      pageSize = productCatalogRequest.pageSize,
      reload = productCatalogRequest.reload;

  var doFetchData = React.useCallback(function (_ref14) {
    var pageSize = _ref14.pageSize,
        pageIndex = _ref14.pageIndex;

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
  var doAddToCart = function doAddToCart(_ref15) {
    var productId = _ref15.productId;

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
  var buttonDecProductCount = function buttonDecProductCount(_ref16) {
    var productId = _ref16.productId;

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

  var ThumbsView = function ThumbsView(_ref17) {
    var productImage = _ref17.productImage,
        productName = _ref17.productName,
        productPrice = _ref17.productPrice,
        index = _ref17.index;
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
  var ListView = function ListView(_ref18) {
    var productImage = _ref18.productImage,
        productName = _ref18.productName,
        productPrice = _ref18.productPrice,
        index = _ref18.index,
        amount = _ref18.amount,
        count = _ref18.count,
        productId = _ref18.productId;
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
  var renderTextField = function renderTextField(_ref19) {
    var name = _ref19.name,
        label = _ref19.label,
        value = _ref19.value,
        defaultValue = _ref19.defaultValue;
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
function getSceneContent(_ref20) {
  var scene = _ref20.scene,
      props = _ref20.props;

  switch (scene) {
    case 'product_catalog':
      return React.createElement(ProductCatalog, props);
    case 'product_detail':
      return React.createElement(ProductDetail, props);
    case 'shopping_cart':
      return React.createElement(ShoppingCart, props);
    case 'checkout_confirmation':
      return React.createElement(CheckoutConfirmation, props);
    default:
      throw new Error('Unknown step');
  }
}

// class App extends React.Component {
function App() {
  var tokoonlinesessionid = localStorage.getItem(TOKOONLINE_TOKOID);
  if (!tokoonlinesessionid) localStorage.setItem(TOKOONLINE_TOKOID, '' + new Date().getTime());

  var _React$useState45 = React.useState('product_catalog'),
      _React$useState46 = _slicedToArray(_React$useState45, 2),
      activeScene = _React$useState46[0],
      setActiveScene = _React$useState46[1];

  var _React$useState47 = React.useState({}),
      _React$useState48 = _slicedToArray(_React$useState47, 2),
      activeSceneProps = _React$useState48[0],
      setActiveSceneProps = _React$useState48[1];

  var goToScene = function goToScene(_ref21) {
    var scene = _ref21.scene,
        props = _ref21.props;

    setActiveScene(scene);
    setActiveSceneProps(Object.assign({}, activeSceneProps, _defineProperty({}, scene, props)));
  };
  return React.createElement(
    'div',
    null,
    getSceneContent({ scene: activeScene, props: Object.assign({ goToScene: goToScene }, activeSceneProps[activeScene]) })
  );
}
ReactDOM.render(React.createElement(App, null), document.querySelector('#tokoonline_content'));