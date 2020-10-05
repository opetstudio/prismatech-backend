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
    Fab = _MaterialUI.Fab,
    Badge = _MaterialUI.Badge,
    Snackbar = _MaterialUI.Snackbar,
    Alert = _MaterialUI.Alert,
    CardActionArea = _MaterialUI.CardActionArea,
    CircularProgress = _MaterialUI.CircularProgress,
    IconButton = _MaterialUI.IconButton,
    SvgIcon = _MaterialUI.SvgIcon,
    Paper = _MaterialUI.Paper,
    MenuItem = _MaterialUI.MenuItem,
    MenuList = _MaterialUI.MenuList,
    Divider = _MaterialUI.Divider,
    sizing = _MaterialUI.sizing,
    Toolbar = _MaterialUI.Toolbar,
    Link = _MaterialUI.Link,
    Chip = _MaterialUI.Chip;


var backendBaseUrl = TOKOONLINE_BASEURL;

var useStyles = makeStyles(function (theme) {
    return {
        // catalogue style
        mkPlinkCatIcon: {
            marginRight: theme.spacing(2)
        },
        mkPlinkCatHeroContent: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(8, 0, 6)
        },
        mkPlinkCatHeroButtons: {
            marginTop: theme.spacing(4)
        },
        mkPlinkCatCardGrid: {
            padding: theme.spacing(4)
        },
        mkPlinkCatCard: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        },
        mkPlinkCatCardMedia: {
            paddingTop: '56.25%' // 16:9
        },
        mkPlinkCatCardContent: {
            flexGrow: 1
        },
        mkPlinkCatFabCart: {
            // display: 'flex',
            // alignItems: 'center',
            // justifyContent: 'center',
            marginTop: '2rem',
            marginBottom: '0.5rem'
        },
        mkPlinkCatCustomHover: {
            '&:hover': {
                background: "#F6F6F6",
                color: "#212121"
            }
        },
        mkPlinkCatCustomButton: {
            '&:hover': {
                color: "#3F51B5"
            }
        },
        // category style
        mkPlinkCatgToolbar: {
            borderBottom: '1px solid ' + theme.palette.divider
        },
        mkPlinkCatgToolbarTitle: {
            flex: 1
        },
        mkPlinkCatgToolbarSecondary: {
            position: 'fixed',
            width: '100%',
            justifyContent: 'space-between',
            overflowX: 'auto',
            zIndex: 3,
            backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]
        },
        mkPlinkCatgToolbarLink: {
            padding: theme.spacing(1),
            flexShrink: 0
        },
        mkPlinkCatgToolbarPrimary: {
            zIndex: 3
        },
        mkPlinkCatgToolbarPrimaryBox: {
            backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]
        },
        mkPlinkCatgToolbarPrimaryBoxGrid: {
            marginTop: theme.spacing(3)
        }
    };
});
var tokoonline_category = parseInt(document.getElementById('tokoonline_category').dataset.catgtype);
var chipStyle = ['default', 'primary', 'secondary'];
// class App extends React.Component {
function App() {
    var tokoonlinesessionid = localStorage.getItem(TOKOONLINE_TOKOID);
    if (!tokoonlinesessionid) localStorage.setItem(TOKOONLINE_TOKOID, '' + new Date().getTime());
    var classes = useStyles();

    var _React$useState = React.useState(null),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        anchorEl = _React$useState2[0],
        setAnchorEl = _React$useState2[1];

    var _React$useState3 = React.useState(0),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        selectedIndex = _React$useState4[0],
        setSelectedIndex = _React$useState4[1];

    var handleMenuItemClick = function handleMenuItemClick(event, index) {
        setSelectedIndex(index);
        setAnchorEl(null);
        window.location.href = TOKOONLINE_PAGE_PRODUCT_CATALOG + "#" + event._id;
    };

    var _React$useState5 = React.useState(0),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        selectedIndex2 = _React$useState6[0],
        setSelectedIndex2 = _React$useState6[1];

    var handleMenuItemClick2 = function handleMenuItemClick2(event, index) {
        setSelectedIndex2(index);
        setAnchorEl(null);
    };

    var paramCatId = window.location.hash.substring(1);

    var _React$useState7 = React.useState([]),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        categorys = _React$useState8[0],
        setCategorys = _React$useState8[1];

    React.useEffect(function () {
        doFetchCategory();
    }, []);
    var doFetchCategory = React.useCallback(function () {
        var graphqlData = 'query{\n              getAllCategorysByTokoId(toko_id: "' + TOKOONLINE_TOKOID + '" ,page_size: 10, page_index: 0, string_to_search: ""){\n                error,\n                count,\n                page_count,\n                status,\n                list_data{\n                  _id,\n                  title\n                }\n              }\n            }';
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
            return response.data.getAllCategorysByTokoId;
        }).then(function (data) {
            return setCategorys(data.list_data);
        });
    }, []);

    return React.createElement(
        'div',
        null,
        React.createElement(CssBaseline, null),
        tokoonline_category == 1 ? React.createElement(
            Toolbar,
            { component: 'nav', variant: 'dense', className: classes.mkPlinkCatgToolbarSecondary /*style={{position: 'fixed', zIndex:10, backgroundColor: '#fff'}}*/ },
            categorys.map(function (option, index) {
                return React.createElement(
                    MenuItem,
                    {
                        key: option._id,
                        selected: option._id === paramCatId,
                        onClick: function onClick() {
                            return handleMenuItemClick(option, index);
                        },
                        className: classes.mkPlinkCatgToolbarLink
                    },
                    option.title
                );
            })
        ) : React.createElement(
            Container,
            { className: classes.mkPlinkCatgToolbarPrimary, maxWidth: 'lg' },
            React.createElement(
                Grid,
                { container: true, spacing: 2, className: classes.mkPlinkCatgToolbarPrimaryBoxGrid },
                React.createElement(
                    Grid,
                    { item: true, xs: 12, md: 12 },
                    React.createElement(
                        Paper,
                        { className: classes.mkPlinkCatgToolbarPrimaryBox },
                        React.createElement(
                            MenuList,
                            null,
                            React.createElement(
                                Typography,
                                { variant: 'h6', gutterBottom: true, style: { marginLeft: 14 } },
                                'Kategori'
                            ),
                            categorys.map(function (option, index) {
                                return React.createElement(
                                    MenuItem,
                                    {
                                        key: option._id,
                                        selected: option._id === paramCatId,
                                        onClick: function onClick(event) {
                                            return handleMenuItemClick(option, index);
                                        }
                                    },
                                    option.title
                                );
                            })
                        )
                    )
                )
            )
        )
    );
}

ReactDOM.render(React.createElement(App, null), document.querySelector('#tokoonline_category'));