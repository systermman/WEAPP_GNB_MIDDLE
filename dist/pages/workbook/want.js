'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WorkbookWant = function (_wepy$page) {
  _inherits(WorkbookWant, _wepy$page);

  function WorkbookWant() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, WorkbookWant);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WorkbookWant.__proto__ || Object.getPrototypeOf(WorkbookWant)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '上传练习册'
    }, _this.data = {
      longText: '请按示例上传练习册封面和版印次，我们将尽快上架该练习册，请注意查看消息通知~',
      first: [],
      last: [],
      imgs: ['http://img.guinaben.com/workbookPic/1108-cover-725711.jpg', 'http://img.guinaben.com/want1.jpg']
    }, _this.methods = {
      /** 查看大图 */
      _preview: function _preview(type) {
        if (type === 'first') {
          _wepy2.default.previewImage({ current: 'http://img.guinaben.com/workbookPic/1108-cover-725711.jpg', urls: this.imgs });
        } else {
          _wepy2.default.previewImage({ current: 'http://img.guinaben.com/want1.jpg', urls: this.imgs });
        }
      },

      // 点击选择按钮
      _chooseImage: function _chooseImage(type) {
        var self = this;
        _wepy2.default.chooseImage({
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          count: 1,
          success: function success(res) {
            if (type === 'first') {
              self._uploadFile(res.tempFilePaths[0]).then(function (res) {
                console.log(res);
                self.first[0] = res;
                self.$apply();
              });
            } else {
              self._uploadFile(res.tempFilePaths[0]).then(function (res) {
                console.log(res);
                self.last[0] = res;
                self.$apply();
              });
            }
          }
        });
      },

      // 上传按钮的事件
      _upload: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(this.first.length === 0 || this.last.length === 0)) {
                    _context.next = 4;
                    break;
                  }

                  _wepy2.default.showModal({
                    title: '提示',
                    content: '请上传正确的封面',
                    showCancel: false,
                    confirmText: '确定'
                  });
                  _context.next = 8;
                  break;

                case 4:
                  _context.next = 6;
                  return this._setWant(this.first[0], this.last[0]);

                case 6:
                  _wepy2.default.showToast({
                    title: '上传成功',
                    icon: 'success',
                    duration: 2000
                  });
                  setTimeout(function () {
                    _wepy2.default.navigateBack();
                  }, 2000);

                case 8:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function _upload() {
          return _ref2.apply(this, arguments);
        }

        return _upload;
      }()
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(WorkbookWant, [{
    key: '_uploadFile',


    /** 上传练习册封面 */
    value: function _uploadFile(file) {
      _wepy2.default.showLoading({ title: '请稍候' });
      return new Promise(function (resolve, reject) {
        _wepy2.default.uploadFile({
          url: 'https://api.guinaben.com/upload/img',
          filePath: file,
          name: 'file',
          header: {
            'Content-Type': 'multipart/form-data',
            'openId': _wepy2.default.getStorageSync('gnb_middle_openId')
          },
          formData: {
            'type': 'wantworkbook'
          },
          success: function success(res) {
            resolve(JSON.parse(res.data).data.url);
          },
          fail: function fail(err) {
            console.log(err);
            reject(err);
          },
          complete: function complete() {
            _wepy2.default.hideLoading();
          }
        });
      });
    }

    /** 获取章节数据 */

  }, {
    key: '_setWant',
    value: function _setWant(first, last) {
      _wepy2.default.showLoading({ title: '请稍候' });
      return new Promise(function (resolve, reject) {
        _wepy2.default.request({
          url: 'https://api.guinaben.com/workbook/want',
          method: 'POST',
          data: {
            first: first,
            last: last
          },
          success: function success(res) {
            resolve(res);
          },
          fail: function fail(err) {
            reject(err);
          },
          complete: function complete() {
            _wepy2.default.hideLoading();
          }
        });
      });
    }
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      if (res.from === 'button') {
        console.log(res.target);
      }
      return {
        title: '各位家长：这样记错题，速度快、好处多',
        imageUrl: 'http://img.guinaben.com/gnb_miniprogram_share.jpg?imageView2/0/q/75|imageslim',
        path: '/pages/workbook/index'
      };
    }
  }]);

  return WorkbookWant;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(WorkbookWant , 'pages/workbook/want'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhbnQuanMiXSwibmFtZXMiOlsiV29ya2Jvb2tXYW50IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJsb25nVGV4dCIsImZpcnN0IiwibGFzdCIsImltZ3MiLCJtZXRob2RzIiwiX3ByZXZpZXciLCJ0eXBlIiwid2VweSIsInByZXZpZXdJbWFnZSIsImN1cnJlbnQiLCJ1cmxzIiwiX2Nob29zZUltYWdlIiwic2VsZiIsImNob29zZUltYWdlIiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwiY291bnQiLCJzdWNjZXNzIiwicmVzIiwiX3VwbG9hZEZpbGUiLCJ0ZW1wRmlsZVBhdGhzIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCIkYXBwbHkiLCJfdXBsb2FkIiwibGVuZ3RoIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsImNvbmZpcm1UZXh0IiwiX3NldFdhbnQiLCJzaG93VG9hc3QiLCJpY29uIiwiZHVyYXRpb24iLCJzZXRUaW1lb3V0IiwibmF2aWdhdGVCYWNrIiwiZmlsZSIsInNob3dMb2FkaW5nIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ1cGxvYWRGaWxlIiwidXJsIiwiZmlsZVBhdGgiLCJuYW1lIiwiaGVhZGVyIiwiZ2V0U3RvcmFnZVN5bmMiLCJmb3JtRGF0YSIsIkpTT04iLCJwYXJzZSIsImZhaWwiLCJlcnIiLCJjb21wbGV0ZSIsImhpZGVMb2FkaW5nIiwicmVxdWVzdCIsIm1ldGhvZCIsImZyb20iLCJ0YXJnZXQiLCJpbWFnZVVybCIsInBhdGgiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLFk7Ozs7Ozs7Ozs7Ozs7O2tNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLEksR0FBTztBQUNMQyxnQkFBVSx3Q0FETDtBQUVMQyxhQUFPLEVBRkY7QUFHTEMsWUFBTSxFQUhEO0FBSUxDLFlBQU0s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QUdMQyxjQUFNO0FBSEQsT0FBUDtBQUtEOzs7O0VBaEl1Q3RELGVBQUt1RCxJOztrQkFBMUJsRSxZIiwiZmlsZSI6IndhbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBXb3JrYm9va1dhbnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuIrkvKDnu4PkuaDlhownXG4gICAgfVxuXG4gICAgZGF0YSA9IHtcbiAgICAgIGxvbmdUZXh0OiAn6K+35oyJ56S65L6L5LiK5Lyg57uD5Lmg5YaM5bCB6Z2i5ZKM54mI5Y2w5qyh77yM5oiR5Lus5bCG5bC95b+r5LiK5p626K+l57uD5Lmg5YaM77yM6K+35rOo5oSP5p+l55yL5raI5oGv6YCa55+lficsXG4gICAgICBmaXJzdDogW10sXG4gICAgICBsYXN0OiBbXSxcbiAgICAgIGltZ3M6IFsnaHR0cDovL2ltZy5ndWluYWJlbi5jb20vd29ya2Jvb2tQaWMvMTEwOC1jb3Zlci03MjU3MTEuanBnJywgJ2h0dHA6Ly9pbWcuZ3VpbmFiZW4uY29tL3dhbnQxLmpwZyddXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIC8qKiDmn6XnnIvlpKflm74gKi9cbiAgICAgIF9wcmV2aWV3ICh0eXBlKSB7XG4gICAgICAgIGlmICh0eXBlID09PSAnZmlyc3QnKSB7XG4gICAgICAgICAgd2VweS5wcmV2aWV3SW1hZ2UoeyBjdXJyZW50OiBgaHR0cDovL2ltZy5ndWluYWJlbi5jb20vd29ya2Jvb2tQaWMvMTEwOC1jb3Zlci03MjU3MTEuanBnYCwgdXJsczogdGhpcy5pbWdzIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5wcmV2aWV3SW1hZ2UoeyBjdXJyZW50OiBgaHR0cDovL2ltZy5ndWluYWJlbi5jb20vd2FudDEuanBnYCwgdXJsczogdGhpcy5pbWdzIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvLyDngrnlh7vpgInmi6nmjInpkq5cbiAgICAgIF9jaG9vc2VJbWFnZSAodHlwZSkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgd2VweS5jaG9vc2VJbWFnZSh7XG4gICAgICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnLCAnY29tcHJlc3NlZCddLFxuICAgICAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sXG4gICAgICAgICAgY291bnQ6IDEsXG4gICAgICAgICAgc3VjY2VzcyAocmVzKSB7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2ZpcnN0Jykge1xuICAgICAgICAgICAgICBzZWxmLl91cGxvYWRGaWxlKHJlcy50ZW1wRmlsZVBhdGhzWzBdKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICAgICAgc2VsZi5maXJzdFswXSA9IHJlc1xuICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNlbGYuX3VwbG9hZEZpbGUocmVzLnRlbXBGaWxlUGF0aHNbMF0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgICAgICBzZWxmLmxhc3RbMF0gPSByZXNcbiAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIC8vIOS4iuS8oOaMiemSrueahOS6i+S7tlxuICAgICAgYXN5bmMgX3VwbG9hZCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmZpcnN0Lmxlbmd0aCA9PT0gMCB8fCB0aGlzLmxhc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgY29udGVudDogJ+ivt+S4iuS8oOato+ehrueahOWwgemdoicsXG4gICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbmZpcm1UZXh0OiAn56Gu5a6aJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5fc2V0V2FudCh0aGlzLmZpcnN0WzBdLCB0aGlzLmxhc3RbMF0pXG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfkuIrkvKDmiJDlip8nLFxuICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICB9KVxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyB3ZXB5Lm5hdmlnYXRlQmFjaygpIH0sIDIwMDApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiog5LiK5Lyg57uD5Lmg5YaM5bCB6Z2iICovXG4gICAgX3VwbG9hZEZpbGUgKGZpbGUpIHtcbiAgICAgIHdlcHkuc2hvd0xvYWRpbmcoeyB0aXRsZTogJ+ivt+eojeWAmScgfSlcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHdlcHkudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkuZ3VpbmFiZW4uY29tL3VwbG9hZC9pbWcnLFxuICAgICAgICAgIGZpbGVQYXRoOiBmaWxlLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScsXG4gICAgICAgICAgICAnb3BlbklkJzogd2VweS5nZXRTdG9yYWdlU3luYygnZ25iX21pZGRsZV9vcGVuSWQnKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZm9ybURhdGE6IHtcbiAgICAgICAgICAgICd0eXBlJzogJ3dhbnR3b3JrYm9vaydcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3MgKHJlcykge1xuICAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHJlcy5kYXRhKS5kYXRhLnVybClcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWwgKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgcmVqZWN0KGVycilcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbXBsZXRlICgpIHtcbiAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqIOiOt+WPlueroOiKguaVsOaNriAqL1xuICAgIF9zZXRXYW50IChmaXJzdCwgbGFzdCkge1xuICAgICAgd2VweS5zaG93TG9hZGluZyh7IHRpdGxlOiAn6K+356iN5YCZJyB9KVxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICdodHRwczovL2FwaS5ndWluYWJlbi5jb20vd29ya2Jvb2svd2FudCcsXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgZmlyc3Q6IGZpcnN0LFxuICAgICAgICAgICAgbGFzdDogbGFzdFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc3VjY2VzcyAocmVzKSB7XG4gICAgICAgICAgICByZXNvbHZlKHJlcylcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWwgKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycilcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbXBsZXRlICgpIHtcbiAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UgKHJlcykge1xuICAgICAgaWYgKHJlcy5mcm9tID09PSAnYnV0dG9uJykge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMudGFyZ2V0KVxuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGU6ICflkITkvY3lrrbplb/vvJrov5nmoLforrDplJnpopjvvIzpgJ/luqblv6vjgIHlpb3lpITlpJonLFxuICAgICAgICBpbWFnZVVybDogJ2h0dHA6Ly9pbWcuZ3VpbmFiZW4uY29tL2duYl9taW5pcHJvZ3JhbV9zaGFyZS5qcGc/aW1hZ2VWaWV3Mi8wL3EvNzV8aW1hZ2VzbGltJyxcbiAgICAgICAgcGF0aDogJy9wYWdlcy93b3JrYm9vay9pbmRleCdcbiAgICAgIH1cbiAgICB9XG4gIH1cbiJdfQ==