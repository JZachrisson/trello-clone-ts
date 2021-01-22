"use strict";
exports.__esModule = true;
var react_1 = require("react");
var styles_1 = require("./styles");
var Column_1 = require("./Column");
var AddNewItem_1 = require("./AddNewItem");
var AppStateContext_1 = require("./AppStateContext");
function App() {
    var _a = AppStateContext_1.useAppState(), state = _a.state, dispatch = _a.dispatch;
    return (react_1["default"].createElement(styles_1.AppContainer, null,
        state.lists.map(function (list, i) {
            react_1["default"].createElement(Column_1.Column, { id: list.id, text: list.text, key: list.id, index: i });
        }),
        react_1["default"].createElement(AddNewItem_1.AddNewItem, { toggleButtonText: "+ Add another list", onAdd: function (text) { return dispatch({ type: 'ADD_LIST', payload: text }); } })));
}
exports["default"] = App;
