var resnake = (function (exports,Reprocessing,Reprocessing_Env,Reprocessing_Draw,Reprocessing_Utils,Reprocessing_Constants) {
  'use strict';

  var out_of_memory = /* tuple */[
    "Out_of_memory",
    0
  ];

  var sys_error = /* tuple */[
    "Sys_error",
    -1
  ];

  var failure = /* tuple */[
    "Failure",
    -2
  ];

  var invalid_argument = /* tuple */[
    "Invalid_argument",
    -3
  ];

  var end_of_file = /* tuple */[
    "End_of_file",
    -4
  ];

  var division_by_zero = /* tuple */[
    "Division_by_zero",
    -5
  ];

  var not_found = /* tuple */[
    "Not_found",
    -6
  ];

  var match_failure = /* tuple */[
    "Match_failure",
    -7
  ];

  var stack_overflow = /* tuple */[
    "Stack_overflow",
    -8
  ];

  var sys_blocked_io = /* tuple */[
    "Sys_blocked_io",
    -9
  ];

  var assert_failure = /* tuple */[
    "Assert_failure",
    -10
  ];

  var undefined_recursive_module = /* tuple */[
    "Undefined_recursive_module",
    -11
  ];

  out_of_memory.tag = 248;

  sys_error.tag = 248;

  failure.tag = 248;

  invalid_argument.tag = 248;

  end_of_file.tag = 248;

  division_by_zero.tag = 248;

  not_found.tag = 248;

  match_failure.tag = 248;

  stack_overflow.tag = 248;

  sys_blocked_io.tag = 248;

  assert_failure.tag = 248;

  undefined_recursive_module.tag = 248;
  /*  Not a pure module */

  function caml_array_sub(x, offset, len) {
    var result = new Array(len);
    var j = 0;
    var i = offset;
    while(j < len) {
      result[j] = x[i];
      j = j + 1 | 0;
      i = i + 1 | 0;
    }  return result;
  }

  function caml_array_get(xs, index) {
    if (index < 0 || index >= xs.length) {
      throw [
            invalid_argument,
            "index out of bounds"
          ];
    } else {
      return xs[index];
    }
  }

  function caml_make_vect(len, init) {
    var b = new Array(len);
    for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
      b[i] = init;
    }
    return b;
  }
  /* No side effect */

  function app(_f, _args) {
    while(true) {
      var args = _args;
      var f = _f;
      var arity = f.length;
      var arity$1 = arity === 0 ? 1 : arity;
      var len = args.length;
      var d = arity$1 - len | 0;
      if (d === 0) {
        return f.apply(null, args);
      } else if (d < 0) {
        _args = caml_array_sub(args, arity$1, -d | 0);
        _f = f.apply(null, caml_array_sub(args, 0, arity$1));
        continue ;
      } else {
        return (function(f,args){
        return function (x) {
          return app(f, args.concat(/* array */[x]));
        }
        }(f,args));
      }
    }}

  function curry_1(o, a0, arity) {
    if (arity > 7 || arity < 0) {
      return app(o, /* array */[a0]);
    } else {
      switch (arity) {
        case 0 : 
        case 1 : 
            return o(a0);
        case 2 : 
            return (function (param) {
                return o(a0, param);
              });
        case 3 : 
            return (function (param, param$1) {
                return o(a0, param, param$1);
              });
        case 4 : 
            return (function (param, param$1, param$2) {
                return o(a0, param, param$1, param$2);
              });
        case 5 : 
            return (function (param, param$1, param$2, param$3) {
                return o(a0, param, param$1, param$2, param$3);
              });
        case 6 : 
            return (function (param, param$1, param$2, param$3, param$4) {
                return o(a0, param, param$1, param$2, param$3, param$4);
              });
        case 7 : 
            return (function (param, param$1, param$2, param$3, param$4, param$5) {
                return o(a0, param, param$1, param$2, param$3, param$4, param$5);
              });
        
      }
    }
  }

  function _1(o, a0) {
    var arity = o.length;
    if (arity === 1) {
      return o(a0);
    } else {
      return curry_1(o, a0, arity);
    }
  }

  function curry_2(o, a0, a1, arity) {
    if (arity > 7 || arity < 0) {
      return app(o, /* array */[
                  a0,
                  a1
                ]);
    } else {
      switch (arity) {
        case 0 : 
        case 1 : 
            return app(o(a0), /* array */[a1]);
        case 2 : 
            return o(a0, a1);
        case 3 : 
            return (function (param) {
                return o(a0, a1, param);
              });
        case 4 : 
            return (function (param, param$1) {
                return o(a0, a1, param, param$1);
              });
        case 5 : 
            return (function (param, param$1, param$2) {
                return o(a0, a1, param, param$1, param$2);
              });
        case 6 : 
            return (function (param, param$1, param$2, param$3) {
                return o(a0, a1, param, param$1, param$2, param$3);
              });
        case 7 : 
            return (function (param, param$1, param$2, param$3, param$4) {
                return o(a0, a1, param, param$1, param$2, param$3, param$4);
              });
        
      }
    }
  }

  function _2(o, a0, a1) {
    var arity = o.length;
    if (arity === 2) {
      return o(a0, a1);
    } else {
      return curry_2(o, a0, a1, arity);
    }
  }
  /* No side effect */

  /* No side effect */

  function caml_int_compare(x, y) {
    if (x < y) {
      return -1;
    } else if (x === y) {
      return 0;
    } else {
      return 1;
    }
  }

  function caml_bool_compare(x, y) {
    if (x) {
      if (y) {
        return 0;
      } else {
        return 1;
      }
    } else if (y) {
      return -1;
    } else {
      return 0;
    }
  }

  function caml_string_compare(s1, s2) {
    if (s1 === s2) {
      return 0;
    } else if (s1 < s2) {
      return -1;
    } else {
      return 1;
    }
  }
  /* No side effect */

  var for_in = function (o,foo){
          for (var x in o) { foo(x); }
        };

  function caml_compare(_a, _b) {
    while(true) {
      var b = _b;
      var a = _a;
      if (a === b) {
        return 0;
      } else {
        var a_type = typeof a;
        var b_type = typeof b;
        var exit = 0;
        switch (a_type) {
          case "boolean" : 
              if (b_type === "boolean") {
                return caml_bool_compare(a, b);
              } else {
                exit = 1;
              }
              break;
          case "function" : 
              if (b_type === "function") {
                throw [
                      invalid_argument,
                      "compare: functional value"
                    ];
              } else {
                exit = 1;
              }
              break;
          case "number" : 
              if (b_type === "number") {
                return caml_int_compare(a, b);
              } else {
                exit = 1;
              }
              break;
          case "string" : 
              if (b_type === "string") {
                return caml_string_compare(a, b);
              } else {
                return 1;
              }
          case "undefined" : 
              return -1;
          default:
            exit = 1;
        }
        if (exit === 1) {
          switch (b_type) {
            case "string" : 
                return -1;
            case "undefined" : 
                return 1;
            default:
              if (a_type === "boolean") {
                return 1;
              } else if (b_type === "boolean") {
                return -1;
              } else if (a_type === "function") {
                return 1;
              } else if (b_type === "function") {
                return -1;
              } else if (a_type === "number") {
                if (b === null || b.tag === 256) {
                  return 1;
                } else {
                  return -1;
                }
              } else if (b_type === "number") {
                if (a === null || a.tag === 256) {
                  return -1;
                } else {
                  return 1;
                }
              } else if (a === null) {
                if (b.tag === 256) {
                  return 1;
                } else {
                  return -1;
                }
              } else if (b === null) {
                if (a.tag === 256) {
                  return -1;
                } else {
                  return 1;
                }
              } else {
                var tag_a = a.tag | 0;
                var tag_b = b.tag | 0;
                if (tag_a === 250) {
                  _a = a[0];
                  continue ;
                } else if (tag_b === 250) {
                  _b = b[0];
                  continue ;
                } else if (tag_a === 256) {
                  if (tag_b === 256) {
                    return caml_int_compare(a[1], b[1]);
                  } else {
                    return -1;
                  }
                } else if (tag_a === 248) {
                  return caml_int_compare(a[1], b[1]);
                } else if (tag_a === 251) {
                  throw [
                        invalid_argument,
                        "equal: abstract value"
                      ];
                } else if (tag_a !== tag_b) {
                  if (tag_a < tag_b) {
                    return -1;
                  } else {
                    return 1;
                  }
                } else {
                  var len_a = a.length | 0;
                  var len_b = b.length | 0;
                  if (len_a === len_b) {
                    if (Array.isArray(a)) {
                      var a$1 = a;
                      var b$1 = b;
                      var _i = 0;
                      var same_length = len_a;
                      while(true) {
                        var i = _i;
                        if (i === same_length) {
                          return 0;
                        } else {
                          var res = caml_compare(a$1[i], b$1[i]);
                          if (res !== 0) {
                            return res;
                          } else {
                            _i = i + 1 | 0;
                            continue ;
                          }
                        }
                      }                  } else {
                      var a$2 = a;
                      var b$2 = b;
                      var min_key_lhs = /* record */[/* contents */undefined];
                      var min_key_rhs = /* record */[/* contents */undefined];
                      var do_key = function (param, key) {
                        var min_key = param[2];
                        var b = param[1];
                        if (!b.hasOwnProperty(key) || caml_compare(param[0][key], b[key]) > 0) {
                          var match = min_key[0];
                          if (match !== undefined && key >= match) {
                            return 0;
                          } else {
                            min_key[0] = key;
                            return /* () */0;
                          }
                        } else {
                          return 0;
                        }
                      };
                      var partial_arg = /* tuple */[
                        a$2,
                        b$2,
                        min_key_rhs
                      ];
                      var do_key_a = (function(partial_arg){
                      return function do_key_a(param) {
                        return do_key(partial_arg, param);
                      }
                      }(partial_arg));
                      var partial_arg$1 = /* tuple */[
                        b$2,
                        a$2,
                        min_key_lhs
                      ];
                      var do_key_b = (function(partial_arg$1){
                      return function do_key_b(param) {
                        return do_key(partial_arg$1, param);
                      }
                      }(partial_arg$1));
                      for_in(a$2, do_key_a);
                      for_in(b$2, do_key_b);
                      var match = min_key_lhs[0];
                      var match$1 = min_key_rhs[0];
                      if (match !== undefined) {
                        if (match$1 !== undefined) {
                          return caml_string_compare(match, match$1);
                        } else {
                          return -1;
                        }
                      } else if (match$1 !== undefined) {
                        return 1;
                      } else {
                        return 0;
                      }
                    }
                  } else if (len_a < len_b) {
                    var a$3 = a;
                    var b$3 = b;
                    var _i$1 = 0;
                    var short_length = len_a;
                    while(true) {
                      var i$1 = _i$1;
                      if (i$1 === short_length) {
                        return -1;
                      } else {
                        var res$1 = caml_compare(a$3[i$1], b$3[i$1]);
                        if (res$1 !== 0) {
                          return res$1;
                        } else {
                          _i$1 = i$1 + 1 | 0;
                          continue ;
                        }
                      }
                    }                } else {
                    var a$4 = a;
                    var b$4 = b;
                    var _i$2 = 0;
                    var short_length$1 = len_b;
                    while(true) {
                      var i$2 = _i$2;
                      if (i$2 === short_length$1) {
                        return 1;
                      } else {
                        var res$2 = caml_compare(a$4[i$2], b$4[i$2]);
                        if (res$2 !== 0) {
                          return res$2;
                        } else {
                          _i$2 = i$2 + 1 | 0;
                          continue ;
                        }
                      }
                    }                }
                }
              }
          }
        }
        
      }
    }}

  function caml_equal(_a, _b) {
    while(true) {
      var b = _b;
      var a = _a;
      if (a === b) {
        return true;
      } else {
        var a_type = typeof a;
        if (a_type === "string" || a_type === "number" || a_type === "boolean" || a_type === "undefined" || a === null) {
          return false;
        } else {
          var b_type = typeof b;
          if (a_type === "function" || b_type === "function") {
            throw [
                  invalid_argument,
                  "equal: functional value"
                ];
          } else if (b_type === "number" || b_type === "undefined" || b === null) {
            return false;
          } else {
            var tag_a = a.tag | 0;
            var tag_b = b.tag | 0;
            if (tag_a === 250) {
              _a = a[0];
              continue ;
            } else if (tag_b === 250) {
              _b = b[0];
              continue ;
            } else if (tag_a === 248) {
              return a[1] === b[1];
            } else if (tag_a === 251) {
              throw [
                    invalid_argument,
                    "equal: abstract value"
                  ];
            } else if (tag_a !== tag_b) {
              return false;
            } else if (tag_a === 256) {
              return a[1] === b[1];
            } else {
              var len_a = a.length | 0;
              var len_b = b.length | 0;
              if (len_a === len_b) {
                if (Array.isArray(a)) {
                  var a$1 = a;
                  var b$1 = b;
                  var _i = 0;
                  var same_length = len_a;
                  while(true) {
                    var i = _i;
                    if (i === same_length) {
                      return true;
                    } else if (caml_equal(a$1[i], b$1[i])) {
                      _i = i + 1 | 0;
                      continue ;
                    } else {
                      return false;
                    }
                  }              } else {
                  var a$2 = a;
                  var b$2 = b;
                  var result = /* record */[/* contents */true];
                  var do_key_a = (function(b$2,result){
                  return function do_key_a(key) {
                    if (b$2.hasOwnProperty(key)) {
                      return 0;
                    } else {
                      result[0] = false;
                      return /* () */0;
                    }
                  }
                  }(b$2,result));
                  var do_key_b = (function(a$2,b$2,result){
                  return function do_key_b(key) {
                    if (!a$2.hasOwnProperty(key) || !caml_equal(b$2[key], a$2[key])) {
                      result[0] = false;
                      return /* () */0;
                    } else {
                      return 0;
                    }
                  }
                  }(a$2,b$2,result));
                  for_in(a$2, do_key_a);
                  if (result[0]) {
                    for_in(b$2, do_key_b);
                  }
                  return result[0];
                }
              } else {
                return false;
              }
            }
          }
        }
      }
    }}

  function caml_greaterequal(a, b) {
    return caml_compare(a, b) >= 0;
  }

  function caml_lessequal(a, b) {
    return caml_compare(a, b) <= 0;
  }
  /* No side effect */

  /* node_std_output Not a pure module */

  /* No side effect */

  function div(x, y) {
    if (y === 0) {
      throw division_by_zero;
    } else {
      return x / y | 0;
    }
  }

  var imul = ( Math.imul || function (x,y) {
    y |= 0; return ((((x >> 16) * y) << 16) + (x & 0xffff) * y)|0; 
  }
  );
  /* imul Not a pure module */

  /* repeat Not a pure module */

  /* two_ptr_32_dbl Not a pure module */

  /* float_of_string Not a pure module */

  /* No side effect */

  var id = /* record */[/* contents */0];

  function get_id() {
    id[0] += 1;
    return id[0];
  }

  function create(str) {
    var v_001 = get_id(/* () */0);
    var v = /* tuple */[
      str,
      v_001
    ];
    v.tag = 248;
    return v;
  }
  /* No side effect */

  /* No side effect */

  /* No side effect */

  var Exit = create("Pervasives.Exit");

  function abs(x) {
    if (x >= 0) {
      return x;
    } else {
      return -x | 0;
    }
  }

  function $at(l1, l2) {
    if (l1) {
      return /* :: */[
              l1[0],
              $at(l1[1], l2)
            ];
    } else {
      return l2;
    }
  }
  /* No side effect */

  function length(l) {
    var _len = 0;
    var _param = l;
    while(true) {
      var param = _param;
      var len = _len;
      if (param) {
        _param = param[1];
        _len = len + 1 | 0;
        continue ;
      } else {
        return len;
      }
    }}

  function mapi(i, f, param) {
    if (param) {
      var r = _2(f, i, param[0]);
      return /* :: */[
              r,
              mapi(i + 1 | 0, f, param[1])
            ];
    } else {
      return /* [] */0;
    }
  }

  function mapi$1(f, l) {
    return mapi(0, f, l);
  }

  function iter(f, _param) {
    while(true) {
      var param = _param;
      if (param) {
        _1(f, param[0]);
        _param = param[1];
        continue ;
      } else {
        return /* () */0;
      }
    }}

  function exists(p, _param) {
    while(true) {
      var param = _param;
      if (param) {
        if (_1(p, param[0])) {
          return true;
        } else {
          _param = param[1];
          continue ;
        }
      } else {
        return false;
      }
    }}

  var append = $at;
  /* No side effect */

  var $$Error = create("Js_exn.Error");
  /* No side effect */

  function sub$1(a, ofs, len) {
    if (len < 0 || ofs > (a.length - len | 0)) {
      throw [
            invalid_argument,
            "Array.sub"
          ];
    } else {
      return caml_array_sub(a, ofs, len);
    }
  }

  function iter$1(f, a) {
    for(var i = 0 ,i_finish = a.length - 1 | 0; i <= i_finish; ++i){
      _1(f, a[i]);
    }
    return /* () */0;
  }

  function map$1(f, a) {
    var l = a.length;
    if (l === 0) {
      return /* array */[];
    } else {
      var r = caml_make_vect(l, _1(f, a[0]));
      for(var i = 1 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
        r[i] = _1(f, a[i]);
      }
      return r;
    }
  }

  function mapi$2(f, a) {
    var l = a.length;
    if (l === 0) {
      return /* array */[];
    } else {
      var r = caml_make_vect(l, _2(f, 0, a[0]));
      for(var i = 1 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
        r[i] = _2(f, i, a[i]);
      }
      return r;
    }
  }

  function to_list(a) {
    var _i = a.length - 1 | 0;
    var _res = /* [] */0;
    while(true) {
      var res = _res;
      var i = _i;
      if (i < 0) {
        return res;
      } else {
        _res = /* :: */[
          a[i],
          res
        ];
        _i = i - 1 | 0;
        continue ;
      }
    }}

  function list_length(_accu, _param) {
    while(true) {
      var param = _param;
      var accu = _accu;
      if (param) {
        _param = param[1];
        _accu = accu + 1 | 0;
        continue ;
      } else {
        return accu;
      }
    }}

  function of_list(l) {
    if (l) {
      var a = caml_make_vect(list_length(0, l), l[0]);
      var _i = 1;
      var _param = l[1];
      while(true) {
        var param = _param;
        var i = _i;
        if (param) {
          a[i] = param[0];
          _param = param[1];
          _i = i + 1 | 0;
          continue ;
        } else {
          return a;
        }
      }  } else {
      return /* array */[];
    }
  }

  var Bottom = create("Array.Bottom");
  /* No side effect */

  // Generated by BUCKLESCRIPT VERSION 4.0.6, PLEASE EDIT WITH CARE

  var gridSize = /* tuple */[
    100,
    100
  ];

  var bodySize = 7;

  var obstacleAmount = Math.floor(10000 * 0.01) | 0;

  var headColor = Reprocessing_Utils.color(255, 255, 255, 255);

  var obstacleColor = Reprocessing_Utils.color(0, 255, 0, 255);

  var textColor = Reprocessing_Utils.color(255, 255, 255, 255);

  function clamp(min, max, num) {
    var match = caml_lessequal(num, min);
    if (match) {
      return min;
    } else {
      var match$1 = caml_greaterequal(num, max);
      if (match$1) {
        return max;
      } else {
        return num;
      }
    }
  }

  function getListElement(index, list) {
    return caml_array_get(of_list(list), index);
  }

  function hitBoundary(x, y, env) {
    var width = Reprocessing_Env.width(env);
    var height = Reprocessing_Env.height(env);
    if (x >= (width - bodySize | 0) || x <= bodySize) {
      return /* HitSides */1;
    } else if (y >= (height - bodySize | 0) || y <= bodySize) {
      return /* HitCeiling */0;
    } else {
      return /* HitNoBoundary */3;
    }
  }

  function printPosition(position) {
    console.log("(" + (String(position[0]) + ("," + (String(position[1]) + ")"))));
    return /* () */0;
  }

  function printGrid(grid) {
    return iter$1((function (el) {
                  return iter$1(printPosition, el);
                }), grid);
  }

  function getGridPosition(x, y, grid) {
    return caml_array_get(caml_array_get(grid, x), y);
  }

  function offsetPosition(offX, offY, position) {
    return /* tuple */[
            position[0] + offX | 0,
            position[1] + offY | 0
          ];
  }

  function getGridPositionOffset(grid, x, y, offX, offY) {
    return offsetPosition(offX, offY, getGridPosition(x, y, grid));
  }

  function randomGridPosition(minX, minY, maxX, maxY) {
    var x = Reprocessing_Utils.random(minX, maxX);
    var y = Reprocessing_Utils.random(minY, maxY);
    return /* tuple */[
            x,
            y
          ];
  }

  function randomGridPositionReal(minX, minY, maxX, maxY, grid) {
    var match = randomGridPosition(minX, minY, maxX, maxY);
    return getGridPosition(match[0], match[1], grid);
  }

  function randomFreeGridPosition(minX, minY, maxX, maxY, positionList) {
    while(true) {
      var randomPosition = randomGridPosition(minX, minY, maxX, maxY);
      var match_ = exists((function(randomPosition){
          return function (position) {
            return caml_equal(randomPosition, position);
          }
          }(randomPosition)), positionList);
      if (match_ === false) {
        return randomPosition;
      } else {
        continue ;
      }
    }}

  function createGrid(gridSize, width, height) {
    var gridLength = gridSize[1];
    var gridWidth = gridSize[0];
    var length$$1 = div(height, gridLength);
    var width$1 = div(width, gridWidth);
    return mapi$2((function (x, _) {
                  return mapi$2((function (y, _) {
                                return /* tuple */[
                                        imul(x, width$1),
                                        imul(y, length$$1)
                                      ];
                              }), caml_make_vect(gridLength, ""));
                }), caml_make_vect(gridWidth, ""));
  }

  var grid = createGrid(gridSize, 700, 700);

  function setup(env) {
    var position = randomGridPosition(1, 1, 99, 99);
    var obstaclePositions = to_list(map$1((function () {
                return randomGridPosition(1, 1, 99, 99);
              }), caml_make_vect(obstacleAmount, "")));
    var foodPosition = randomFreeGridPosition(1, 1, 99, 99, obstaclePositions);
    Reprocessing_Env.size(700, 700, env);
    return /* record */[
            /* score */0,
            /* highScore */0,
            /* direction : None */4,
            /* level */1,
            /* snake : :: */[
              position,
              /* [] */0
            ],
            /* snakePrevious : :: */[
              position,
              /* [] */0
            ],
            /* foodPosition */foodPosition,
            /* obstacles */obstaclePositions,
            /* running : Alive */0
          ];
  }

  function snakeDirection(direction, env) {
    if (Reprocessing_Env.key(/* Right */51, env)) {
      return /* Right */1;
    } else if (Reprocessing_Env.key(/* Left */52, env)) {
      return /* Left */0;
    } else if (Reprocessing_Env.key(/* Down */53, env)) {
      return /* Down */2;
    } else if (Reprocessing_Env.key(/* Up */54, env)) {
      return /* Up */3;
    } else {
      return direction;
    }
  }

  function moveSnakeGrid(gridPos, direction) {
    var y = gridPos[1];
    var x = gridPos[0];
    var match;
    switch (direction) {
      case 0 : 
          match = /* tuple */[
            x - 1 | 0,
            y
          ];
          break;
      case 1 : 
          match = /* tuple */[
            x + 1 | 0,
            y
          ];
          break;
      case 2 : 
          match = /* tuple */[
            x,
            y + 1 | 0
          ];
          break;
      case 3 : 
          match = /* tuple */[
            x,
            y - 1 | 0
          ];
          break;
      case 4 : 
          match = /* tuple */[
            x,
            y
          ];
          break;
      
    }
    var x$1 = clamp(0, 99, match[0]);
    var y$1 = clamp(0, 99, match[1]);
    return /* tuple */[
            x$1,
            y$1
          ];
  }

  function directionMoved(gridPos, gridPos2) {
    var match = gridPos2[0] - gridPos[0] | 0;
    var match$1 = gridPos2[1] - gridPos[1] | 0;
    var switcher = match + 1 | 0;
    if (switcher > 2 || switcher < 0) {
      return /* None */4;
    } else {
      switch (switcher) {
        case 0 : 
            if (match$1 !== 0) {
              return /* None */4;
            } else {
              return /* Left */0;
            }
        case 1 : 
            var switcher$1 = match$1 + 1 | 0;
            if (switcher$1 > 2 || switcher$1 < 0) {
              return /* None */4;
            } else {
              switch (switcher$1) {
                case 0 : 
                    return /* Up */3;
                case 1 : 
                    return /* None */4;
                case 2 : 
                    return /* Down */2;
                
              }
            }
        case 2 : 
            if (match$1 !== 0) {
              return /* None */4;
            } else {
              return /* Right */1;
            }
        
      }
    }
  }

  function printRunning(running) {
    switch (running) {
      case 0 : 
          return "Alive";
      case 1 : 
          return "Dead";
      case 2 : 
          return "Restart";
      
    }
  }

  function drawFood(pos, grid, color, env) {
    var halfFoodSize = bodySize / 2 | 0;
    var match = getGridPositionOffset(grid, pos[0], pos[1], halfFoodSize, halfFoodSize);
    Reprocessing_Draw.fill(color, env);
    return Reprocessing_Draw.ellipse(/* tuple */[
                match[0],
                match[1]
              ], halfFoodSize, halfFoodSize, env);
  }

  function drawObstacle(pos, grid, color, env) {
    Reprocessing_Draw.fill(color, env);
    return Reprocessing_Draw.rect(getGridPositionOffset(grid, pos[0], pos[1], 0, 0), bodySize, bodySize, env);
  }

  function drawBoundary(env) {
    var width = Reprocessing_Env.width(env);
    var height = Reprocessing_Env.height(env);
    Reprocessing_Draw.fill(Reprocessing_Constants.black, env);
    Reprocessing_Draw.rect(/* tuple */[
          0,
          0
        ], width, bodySize, env);
    Reprocessing_Draw.rect(/* tuple */[
          0,
          0
        ], bodySize, height, env);
    Reprocessing_Draw.rect(/* tuple */[
          0,
          height - bodySize | 0
        ], width, bodySize, env);
    return Reprocessing_Draw.rect(/* tuple */[
                width - bodySize | 0,
                0
              ], bodySize, height, env);
  }

  function drawSnake(pos, grid, color, env) {
    var match = getGridPositionOffset(grid, pos[0], pos[1], 0, 0);
    Reprocessing_Draw.fill(color, env);
    return Reprocessing_Draw.rect(/* tuple */[
                match[0],
                match[1]
              ], bodySize, bodySize, env);
  }

  function drawCenteredText(color, text, y, env) {
    Reprocessing_Draw.fill(color, env);
    var width = Reprocessing_Draw.textWidth(undefined, text, env);
    var center = (Reprocessing_Env.width(env) / 2 | 0) - width | 0;
    return Reprocessing_Draw.text(undefined, text, /* tuple */[
                center,
                y
              ], env);
  }

  function normalize(param) {
    var y = param[1];
    var x = param[0];
    var match = x !== 0;
    var normX = match ? div(abs(x), x) : x;
    var match$1 = y !== 0;
    var normY = match$1 ? div(abs(y), y) : y;
    return /* tuple */[
            normX,
            normY
          ];
  }

  function drawCenteredSysText(param, param$1, param$2) {
    return drawCenteredText(textColor, param, param$1, param$2);
  }

  function intersectRectCircleI(rectPos, rectW, rectH, circlePos, circleRad) {
    return Reprocessing_Utils.intersectRectCircle(/* tuple */[
                rectPos[0],
                rectPos[1]
              ], rectW, rectH, /* tuple */[
                circlePos[0],
                circlePos[1]
              ], circleRad);
  }

  function intersectRectRectI(rectPos, rectW, rectH, rect2Pos, rect2W, rect2H) {
    return Reprocessing_Utils.intersectRectRect(/* tuple */[
                rectPos[0],
                rectPos[1]
              ], rectW, rectH, /* tuple */[
                rect2Pos[0],
                rect2Pos[1]
              ], rect2W, rect2H);
  }

  function draw(state, env) {
    var obstacles = state[/* obstacles */7];
    var foodPosition = state[/* foodPosition */6];
    var snakePrevious = state[/* snakePrevious */5];
    var snake = state[/* snake */4];
    var direction = state[/* direction */2];
    var highScore = state[/* highScore */1];
    var score = state[/* score */0];
    var currentDirection = snakeDirection(direction, env);
    if (Reprocessing_Env.frameCount(env) % 2 === 1) {
      caml_array_get(of_list(snake), 0);
      Reprocessing_Draw.background(Reprocessing_Utils.color(125, 125, 125, 255), env);
      drawBoundary(env);
      iter((function (__x) {
              return drawObstacle(__x, grid, obstacleColor, env);
            }), obstacles);
      drawFood(foodPosition, grid, Reprocessing_Constants.red, env);
      iter((function (__x) {
              return drawSnake(__x, grid, headColor, env);
            }), snake);
      drawCenteredSysText("Score: " + String(score), 80, env);
      drawCenteredSysText("High Score: " + String(highScore), 40, env);
      var match = getListElement(0, snake);
      var headY = match[1];
      var headX = match[0];
      var match$1 = getGridPosition(headX, headY, grid);
      var isCollideWithFood = headX === foodPosition[0] && foodPosition[1] === headY;
      var match$2 = hitBoundary(match$1[0], match$1[1], env);
      var boundaryHit = match$2 < 3;
      var match$3 = length(snake);
      var selfHit;
      if (match$3 !== 1) {
        var __x = of_list(snake);
        selfHit = exists((function (el) {
                if (headX === el[0]) {
                  return headY === el[1];
                } else {
                  return false;
                }
              }), to_list(sub$1(__x, 1, length(snake) - 1 | 0)));
      } else {
        selfHit = false;
      }
      var obstacleHit = exists((function (el) {
              if (headX === el[0]) {
                return headY === el[1];
              } else {
                return false;
              }
            }), obstacles);
      var randomObstaclePositions = to_list(map$1((function () {
                  return randomGridPosition(1, 1, 99, 99);
                }), caml_make_vect(obstacleAmount, "")));
      switch (state[/* running */8]) {
        case 0 : 
            var match$4 = boundaryHit || selfHit || obstacleHit;
            return /* record */[
                    /* score */isCollideWithFood ? score + 100 | 0 : score,
                    /* highScore */state[/* highScore */1],
                    /* direction */currentDirection,
                    /* level */state[/* level */3],
                    /* snake */isCollideWithFood ? append(snake, /* :: */[
                            getListElement(length(snakePrevious) - 1 | 0, snakePrevious),
                            /* [] */0
                          ]) : mapi$1((function (index, position) {
                              var partial_arg = index - 1 | 0;
                              var getEl = function (param) {
                                return getListElement(partial_arg, param);
                              };
                              if (index !== 0) {
                                return moveSnakeGrid(_1(getEl, snakePrevious), directionMoved(_1(getEl, snakePrevious), _1(getEl, snake)));
                              } else {
                                return moveSnakeGrid(position, direction);
                              }
                            }), snake),
                    /* snakePrevious */snake,
                    /* foodPosition */isCollideWithFood ? randomFreeGridPosition(1, 1, 99, 99, obstacles) : foodPosition,
                    /* obstacles */state[/* obstacles */7],
                    /* running */match$4 ? /* Dead */1 : /* Alive */0
                  ];
        case 1 : 
            var match$5 = score > highScore;
            return /* record */[
                    /* score */state[/* score */0],
                    /* highScore */match$5 ? score : highScore,
                    /* direction */state[/* direction */2],
                    /* level */state[/* level */3],
                    /* snake */state[/* snake */4],
                    /* snakePrevious */state[/* snakePrevious */5],
                    /* foodPosition */state[/* foodPosition */6],
                    /* obstacles */state[/* obstacles */7],
                    /* running : Restart */2
                  ];
        case 2 : 
            return /* record */[
                    /* score */0,
                    /* highScore */state[/* highScore */1],
                    /* direction : None */4,
                    /* level */state[/* level */3],
                    /* snake : :: */[
                      randomGridPosition(1, 1, 99, 99),
                      /* [] */0
                    ],
                    /* snakePrevious */state[/* snakePrevious */5],
                    /* foodPosition */randomGridPosition(1, 1, 99, 99),
                    /* obstacles */randomObstaclePositions,
                    /* running : Alive */0
                  ];
        
      }
    } else {
      Reprocessing_Draw.background(Reprocessing_Utils.color(125, 125, 125, 255), env);
      drawBoundary(env);
      iter((function (__x) {
              return drawObstacle(__x, grid, obstacleColor, env);
            }), obstacles);
      drawFood(foodPosition, grid, Reprocessing_Constants.red, env);
      iter((function (__x) {
              return drawSnake(__x, grid, headColor, env);
            }), snake);
      drawCenteredSysText("Score: " + String(score), 80, env);
      drawCenteredSysText("High Score: " + String(highScore), 40, env);
      return /* record */[
              /* score */state[/* score */0],
              /* highScore */state[/* highScore */1],
              /* direction */currentDirection,
              /* level */state[/* level */3],
              /* snake */state[/* snake */4],
              /* snakePrevious */state[/* snakePrevious */5],
              /* foodPosition */state[/* foodPosition */6],
              /* obstacles */state[/* obstacles */7],
              /* running */state[/* running */8]
            ];
    }
  }

  Reprocessing.run(setup, undefined, draw, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);

  var width = 700;

  var height = 700;

  var frameLock = 2;

  var gridLength = 100;

  var gridWidth = 100;

  var foodColor = Reprocessing_Constants.red;

  var speed = 4;
  /* obstacleAmount Not a pure module */

  exports.width = width;
  exports.height = height;
  exports.gridSize = gridSize;
  exports.frameLock = frameLock;
  exports.gridLength = gridLength;
  exports.gridWidth = gridWidth;
  exports.bodySize = bodySize;
  exports.obstacleAmount = obstacleAmount;
  exports.headColor = headColor;
  exports.foodColor = foodColor;
  exports.obstacleColor = obstacleColor;
  exports.textColor = textColor;
  exports.speed = speed;
  exports.clamp = clamp;
  exports.getListElement = getListElement;
  exports.hitBoundary = hitBoundary;
  exports.printPosition = printPosition;
  exports.printGrid = printGrid;
  exports.getGridPosition = getGridPosition;
  exports.offsetPosition = offsetPosition;
  exports.getGridPositionOffset = getGridPositionOffset;
  exports.randomGridPosition = randomGridPosition;
  exports.randomGridPositionReal = randomGridPositionReal;
  exports.randomFreeGridPosition = randomFreeGridPosition;
  exports.createGrid = createGrid;
  exports.grid = grid;
  exports.setup = setup;
  exports.snakeDirection = snakeDirection;
  exports.moveSnakeGrid = moveSnakeGrid;
  exports.directionMoved = directionMoved;
  exports.printRunning = printRunning;
  exports.drawFood = drawFood;
  exports.drawObstacle = drawObstacle;
  exports.drawBoundary = drawBoundary;
  exports.drawSnake = drawSnake;
  exports.drawCenteredText = drawCenteredText;
  exports.normalize = normalize;
  exports.drawCenteredSysText = drawCenteredSysText;
  exports.intersectRectCircleI = intersectRectCircleI;
  exports.intersectRectRectI = intersectRectRectI;
  exports.draw = draw;

  return exports;

}({},Reprocessing,Reprocessing_Env,Reprocessing_Draw,Reprocessing_Utils,Reprocessing_Constants));
