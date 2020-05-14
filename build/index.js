var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useState, useEffect } from "react";
export var fetchMany = function (params) {
    var _this = this;
    var urls = params.map(function (_a) {
        var url = _a.url;
        return url;
    }).join("");
    var _a = useState(false), isLoading = _a[0], setIsLoading = _a[1];
    var _b = useState(), data = _b[0], setData = _b[1];
    var _c = useState(), error = _c[0], setError = _c[1];
    useEffect(function () {
        var fetchData = function () { return __awaiter(_this, void 0, void 0, function () {
            var promiseArray, responses, allData, index, _i, responses_1, res, key, _a, _b, err_1, error_1;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        setIsLoading(true);
                        promiseArray = params.map(function (_a) {
                            var url = _a.url, options = _a.options;
                            return fetch(url, options);
                        });
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 10, , 11]);
                        return [4 /*yield*/, Promise.all(promiseArray)];
                    case 2:
                        responses = _d.sent();
                        allData = {};
                        index = 0;
                        _i = 0, responses_1 = responses;
                        _d.label = 3;
                    case 3:
                        if (!(_i < responses_1.length)) return [3 /*break*/, 9];
                        res = responses_1[_i];
                        if (!res.ok) {
                            throw new Error();
                        }
                        key = (_c = params[index]) === null || _c === void 0 ? void 0 : _c.key;
                        _d.label = 4;
                    case 4:
                        _d.trys.push([4, 6, , 7]);
                        _a = allData;
                        _b = key;
                        return [4 /*yield*/, res.json()];
                    case 5:
                        _a[_b] = _d.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        err_1 = _d.sent();
                        return [3 /*break*/, 7];
                    case 7:
                        index++;
                        _d.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 3];
                    case 9:
                        setData(allData);
                        return [3 /*break*/, 11];
                    case 10:
                        error_1 = _d.sent();
                        setError(error_1);
                        return [3 /*break*/, 11];
                    case 11:
                        setIsLoading(false);
                        return [2 /*return*/];
                }
            });
        }); };
        fetchData();
        // eslint-disable-next-line
    }, [urls]);
    return { data: data, isLoading: isLoading, error: error };
};
export var fetchSingle = function (url, options) {
    var _this = this;
    var _a = useState(false), isLoading = _a[0], setIsLoading = _a[1];
    var _b = useState(), data = _b[0], setData = _b[1];
    var _c = useState(), error = _c[0], setError = _c[1];
    useEffect(function () {
        var fetchData = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, jsonData, err_2, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setIsLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, fetch(url, options)];
                    case 2:
                        res = _a.sent();
                        if (!res.ok) {
                            throw new Error();
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, res.json()];
                    case 4:
                        jsonData = _a.sent();
                        setData(jsonData);
                        return [3 /*break*/, 6];
                    case 5:
                        err_2 = _a.sent();
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_2 = _a.sent();
                        setError(error_2);
                        return [3 /*break*/, 8];
                    case 8:
                        setIsLoading(false);
                        return [2 /*return*/];
                }
            });
        }); };
        fetchData();
        // eslint-disable-next-line
    }, [url]);
    return { data: data, isLoading: isLoading, error: error };
};
//# sourceMappingURL=index.js.map