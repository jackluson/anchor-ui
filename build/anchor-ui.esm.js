function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var runtime = {exports: {}};

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function (module) {
var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
}(runtime));

var regenerator = runtime.exports;

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$c =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var shared$3 = {exports: {}};

var fails$5 = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$4 = fails$5;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$4(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var objectDefineProperty = {};

var isObject$5 = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var global$b = global$c;
var isObject$4 = isObject$5;

var document$1 = global$b.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject$4(document$1) && isObject$4(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
};

var DESCRIPTORS$3 = descriptors;
var fails$3 = fails$5;
var createElement = documentCreateElement;

// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !DESCRIPTORS$3 && !fails$3(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var isObject$3 = isObject$5;

var anObject$1 = function (it) {
  if (!isObject$3(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

var isObject$2 = isObject$5;

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var toPrimitive$1 = function (input, PREFERRED_STRING) {
  if (!isObject$2(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$2(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject$2(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$2(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var DESCRIPTORS$2 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var anObject = anObject$1;
var toPrimitive = toPrimitive$1;

// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$2 ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var createPropertyDescriptor$1 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var DESCRIPTORS$1 = descriptors;
var definePropertyModule = objectDefineProperty;
var createPropertyDescriptor = createPropertyDescriptor$1;

var createNonEnumerableProperty$4 = DESCRIPTORS$1 ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var global$a = global$c;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$4;

var setGlobal$2 = function (key, value) {
  try {
    createNonEnumerableProperty$3(global$a, key, value);
  } catch (error) {
    global$a[key] = value;
  } return value;
};

var global$9 = global$c;
var setGlobal$1 = setGlobal$2;

var SHARED = '__core-js_shared__';
var store$3 = global$9[SHARED] || setGlobal$1(SHARED, {});

var sharedStore = store$3;

var store$2 = sharedStore;

(shared$3.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.15.2',
  mode: 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$1 = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

var requireObjectCoercible = requireObjectCoercible$1;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$2 = function (argument) {
  return Object(requireObjectCoercible(argument));
};

var toObject$1 = toObject$2;

var hasOwnProperty = {}.hasOwnProperty;

var has$3 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty.call(toObject$1(it), key);
};

var id = 0;
var postfix = Math.random();

var uid$2 = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var global$8 = global$c;

var path$1 = global$8;

var path = path$1;
var global$7 = global$c;

var aFunction$2 = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn$1 = function (namespace, method) {
  return arguments.length < 2 ? aFunction$2(path[namespace]) || aFunction$2(global$7[namespace])
    : path[namespace] && path[namespace][method] || global$7[namespace] && global$7[namespace][method];
};

var getBuiltIn = getBuiltIn$1;

var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

var global$6 = global$c;
var userAgent = engineUserAgent;

var process = global$6.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] < 4 ? 1 : match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

var engineV8Version = version && +version;

/* eslint-disable es/no-symbol -- required for testing */

var V8_VERSION = engineV8Version;
var fails$2 = fails$5;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$2(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/* eslint-disable es/no-symbol -- required for testing */

var NATIVE_SYMBOL$1 = nativeSymbol;

var useSymbolAsUid = NATIVE_SYMBOL$1
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var global$5 = global$c;
var shared$2 = shared$3.exports;
var has$2 = has$3;
var uid$1 = uid$2;
var NATIVE_SYMBOL = nativeSymbol;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var WellKnownSymbolsStore = shared$2('wks');
var Symbol$1 = global$5.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

var wellKnownSymbol$3 = function (name) {
  if (!has$2(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (NATIVE_SYMBOL && has$2(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  } return WellKnownSymbolsStore[name];
};

var wellKnownSymbol$2 = wellKnownSymbol$3;

var TO_STRING_TAG$1 = wellKnownSymbol$2('toStringTag');
var test = {};

test[TO_STRING_TAG$1] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var redefine$1 = {exports: {}};

var store$1 = sharedStore;

var functionToString = Function.toString;

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store$1.inspectSource != 'function') {
  store$1.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource$2 = store$1.inspectSource;

var global$4 = global$c;
var inspectSource$1 = inspectSource$2;

var WeakMap$1 = global$4.WeakMap;

var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource$1(WeakMap$1));

var shared$1 = shared$3.exports;
var uid = uid$2;

var keys = shared$1('keys');

var sharedKey$1 = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys$1 = {};

var NATIVE_WEAK_MAP = nativeWeakMap;
var global$3 = global$c;
var isObject$1 = isObject$5;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$4;
var objectHas = has$3;
var shared = sharedStore;
var sharedKey = sharedKey$1;
var hiddenKeys = hiddenKeys$1;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap = global$3.WeakMap;
var set, get, has$1;

var enforce = function (it) {
  return has$1(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$1(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has$1 = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$2(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has$1 = function (it) {
    return objectHas(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has$1,
  enforce: enforce,
  getterFor: getterFor
};

var global$2 = global$c;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$4;
var has = has$3;
var setGlobal = setGlobal$2;
var inspectSource = inspectSource$2;
var InternalStateModule = internalState;

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(redefine$1.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) {
      createNonEnumerableProperty$1(value, 'name', key);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
  }
  if (O === global$2) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty$1(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});

var toString$1 = {}.toString;

var classofRaw$1 = function (it) {
  return toString$1.call(it).slice(8, -1);
};

var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
var classofRaw = classofRaw$1;
var wellKnownSymbol$1 = wellKnownSymbol$3;

var TO_STRING_TAG = wellKnownSymbol$1('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$3 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
var classof$2 = classof$3;

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
  return '[object ' + classof$2(this) + ']';
};

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var redefine = redefine$1.exports;
var toString = objectToString;

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

var aFunction$1 = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

var aFunction = aFunction$1;

// optional / simple context binding
var functionBindContext = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var fails$1 = fails$5;
var classof$1 = classofRaw$1;

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$1(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$1(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
var toInteger$1 = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

var toInteger = toInteger$1;

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$1 = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var classof = classofRaw$1;

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
var isArray$1 = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};

var isObject = isObject$5;
var isArray = isArray$1;
var wellKnownSymbol = wellKnownSymbol$3;

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate$1 = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

var bind = functionBindContext;
var IndexedObject = indexedObject;
var toObject = toObject$2;
var toLength = toLength$1;
var arraySpeciesCreate = arraySpeciesCreate$1;

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_OUT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push.call(target, value); // filterOut
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterOut` method
  // https://github.com/tc39/proposal-array-filtering
  filterOut: createMethod(7)
};

var fails = fails$5;

var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

var $forEach = arrayIteration.forEach;
var arrayMethodIsStrict = arrayMethodIsStrict$1;

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;

var global$1 = global$c;
var DOMIterables = domIterables;
var forEach = arrayForEach;
var createNonEnumerableProperty = createNonEnumerableProperty$4;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global$1[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}

var DESCRIPTORS = descriptors;
var defineProperty = objectDefineProperty.f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

const closeBtnText = ["取消", "关闭"];
/**
 * 基于el-dialog二次封装对话框，内置一些通用配置，比如footer，close事件的处理
 * @displayName anchor-dialog
 */
var script$4 = {
  name: "anchor-dialog",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "500px",
    },
    appendToBody: {
      type: Boolean,
      default: true,
    },
    beforeClose: Function,
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    cancelButtonText: {
      type: String,
      default: closeBtnText[0],
    },
    confirmlButtonText: {
      type: String,
      default: "确定",
    },
  },
  methods: {
    handleClose() {
      if (this.$listeners.close) {
        this.$listeners.close();
      } else if (
        // 如果是默认关闭的文案，并且没有配置自己beforeClose逻辑
        this.visible === true &&
        closeBtnText.includes(this.cancelButtonText) &&
        !this.beforeClose
      ) {
        this.$refs.peaDialog.$emit("update:visible", false);
      }
    },
    handleConfirm(e) {
      /**
       * 弹窗确认事件
       * @arg {e}  MouseEvent 点击事件对象
       */
      this.$emit("confirm", e);
    },
  },
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "el-dialog",
    _vm._g(
      _vm._b(
        {
          ref: "peaDialog",
          attrs: {
            title: _vm.title,
            visible: _vm.visible,
            width: _vm.width,
            "append-to-body": _vm.appendToBody,
            "close-on-click-modal": _vm.closeOnClickModal
          },
          on: { close: _vm.handleClose }
        },
        "el-dialog",
        _vm.$attrs,
        false
      ),
      _vm.$listeners
    ),
    [
      _c("div", [_vm._t("default")], 2),
      _vm._v(" "),
      _c(
        "div",
        { attrs: { slot: "footer" }, slot: "footer" },
        [
          _vm._t("footer", function() {
            return [
              _c("el-button", { on: { click: _vm.handleClose } }, [
                _vm._v(_vm._s(_vm.cancelButtonText))
              ]),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: { type: "primary" },
                  on: { click: _vm.handleConfirm }
                },
                [_vm._v(_vm._s(_vm.confirmlButtonText))]
              )
            ]
          })
        ],
        2
      )
    ]
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$4 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * 利用flex 自适应，main 插槽撑起剩余高度
 * @displayName anchor-layout
 */
var script$3 = {
  name: "anchor-layout",
  props: {
    /**
     * 中心main 区域的align-items属性配置
     */
    "align-items": {
      type: String,
      default: "self-start",
    },
  },
};

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "anchor-layout" }, [
    _vm.$scopedSlots.header ? _c("header", [_vm._t("header")], 2) : _vm._e(),
    _vm._v(" "),
    _c(
      "main",
      {
        staticClass: "anchor-layout-main",
        style: "align-items: " + _vm.alignItems
      },
      [_vm._t("default")],
      2
    ),
    _vm._v(" "),
    _vm.$scopedSlots.footer ? _c("footer", [_vm._t("footer")], 2) : _vm._e()
  ])
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-25b8210f_0", { source: ".anchor-layout[data-v-25b8210f] {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.anchor-layout-main[data-v-25b8210f] {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  align-items: center;\n}\n\n/*# sourceMappingURL=index.vue.map */", map: {"version":3,"sources":["/Users/admin/personal/coding/aurora-ui/src/components/anchor-layout/index.vue","index.vue"],"names":[],"mappings":"AA4CA;EACA,YAAA;EACA,aAAA;EACA,sBAAA;AC3CA;AD4CA;EACA,aAAA;EACA,OAAA;EACA,sBAAA;EAEA,mBAAA;AC3CA;;AAEA,oCAAoC","file":"index.vue","sourcesContent":["<!--\r\n * Desc: main 自动撑起页面剩余高度\r\n * File Created: Thursday, 5th November 2020 8:57:20 pm\r\n-->\r\n\r\n<template>\r\n  <div class=\"anchor-layout\">\r\n    <header v-if=\"$scopedSlots.header\">\r\n      <!--\r\n        @slot header 头部插槽内容\r\n       -->\r\n      <slot name=\"header\"></slot>\r\n    </header>\r\n    <main class=\"anchor-layout-main\" :style=\"`align-items: ${alignItems}`\">\r\n      <!-- @slot 默认插槽内容，中心main区域 -->\r\n      <slot></slot>\r\n    </main>\r\n    <footer v-if=\"$scopedSlots.footer\">\r\n      <!-- @slot footer 脚部插槽内容 -->\r\n      <slot name=\"footer\"></slot>\r\n    </footer>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\n/**\r\n * 利用flex 自适应，main 插槽撑起剩余高度\r\n * @displayName anchor-layout\r\n */\r\nexport default {\r\n  name: \"anchor-layout\",\r\n  props: {\r\n    /**\r\n     * 中心main 区域的align-items属性配置\r\n     */\r\n    \"align-items\": {\r\n      type: String,\r\n      default: \"self-start\",\r\n    },\r\n  },\r\n};\r\n</script>\r\n\r\n<style lang=\"scss\" scoped>\r\n.anchor-layout {\r\n  height: 100%;\r\n  display: flex;\r\n  flex-direction: column;\r\n  &-main {\r\n    display: flex;\r\n    flex: 1;\r\n    flex-direction: column;\r\n    // align-items: self-start; // TODO: 后来设置prop 控制\r\n    align-items: center;\r\n  }\r\n}\r\n</style>\r\n",".anchor-layout {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.anchor-layout-main {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  align-items: center;\n}\n\n/*# sourceMappingURL=index.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$3 = "data-v-25b8210f";
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$3 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//

/**
 * 分隔符
 * @displayName anchor-separater
 */
var script$2 = {
  name: "anchor-separater",
  props: {
    /**
     * 高度
     */
    height: {
      type: Number,
      default: 32,
    },
    /**
     * 宽度
     */
    width: {
      type: Number,
      default: 1,
    },
    /**
     * 颜色
     */
    color: {
      type: String,
      default: "#d7dae2",
    },
  },
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    staticClass: "separate",
    style: {
      background: _vm.color,
      height: _vm.height + "px",
      width: _vm.width + "px"
    }
  })
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-20cafa38_0", { source: ".separate[data-v-20cafa38] {\n  display: inline-block;\n  width: 1px;\n  height: 32px;\n  background: #d7dae2;\n}\n\n/*# sourceMappingURL=index.vue.map */", map: {"version":3,"sources":["/Users/admin/personal/coding/aurora-ui/src/components/anchor-separater/index.vue","index.vue"],"names":[],"mappings":"AAyCA;EACA,qBAAA;EACA,UAAA;EACA,YAAA;EACA,mBAAA;ACxCA;;AAEA,oCAAoC","file":"index.vue","sourcesContent":["<template>\n  <div\n    class=\"separate\"\n    :style=\"{ background: color, height: height + 'px', width: width + 'px' }\"\n  ></div>\n</template>\n\n<script>\n/**\n * 分隔符\n * @displayName anchor-separater\n */\nexport default {\n  name: \"anchor-separater\",\n  props: {\n    /**\n     * 高度\n     */\n    height: {\n      type: Number,\n      default: 32,\n    },\n    /**\n     * 宽度\n     */\n    width: {\n      type: Number,\n      default: 1,\n    },\n    /**\n     * 颜色\n     */\n    color: {\n      type: String,\n      default: \"#d7dae2\",\n    },\n  },\n};\n</script>\n\n<style lang=\"scss\" scoped>\n.separate {\n  display: inline-block;\n  width: 1px;\n  height: 32px;\n  background: #d7dae2;\n}\n</style>\n",".separate {\n  display: inline-block;\n  width: 1px;\n  height: 32px;\n  background: #d7dae2;\n}\n\n/*# sourceMappingURL=index.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$2 = "data-v-20cafa38";
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    createInjector,
    undefined,
    undefined
  );

var AnchorRender = {
  name: "AnchorRender",
  functional: true,
  props: {
    scope: Object,
    render: Function
  },
  render: function render(h, ctx) {
    var renderResult = ctx.props.render(h, ctx.props.scope);
    var VNode = h("span", "").constructor; // get VNode constructor

    return renderResult instanceof VNode ? renderResult : h("span", [renderResult]);
  }
};

//
var script$1 = {
  name: "AnchorColumn",
  props: {
    column: Object,
    headerAlign: String,
    align: String,
    formatter: {
      type: Function,
      default: (row, column, val, index, splitSymbol) => {
        if (val === null || val === undefined || val === "") {
          return splitSymbol;
        }
        return val;
      },
    },
  },
  components: {
    AnchorRender,
  },
  computed: {
    // 判断type是否是selection, index类型
    isTypeColumn() {
      return ["selection", "index"].includes(this.column.type);
    },
  },
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.isTypeColumn || _vm.column.openDefaultFormatter
    ? _c(
        "el-table-column",
        _vm._g(
          _vm._b(
            {
              attrs: {
                align: _vm.column.align || _vm.align || "left",
                "header-align":
                  _vm.headerAlign || _vm.column.align || _vm.align || "left"
              }
            },
            "el-table-column",
            Object.assign(
              {},
              {
                formatter: _vm.column.openDefaultFormatter
                  ? function() {
                      var args = [],
                        len = arguments.length;
                      while (len--) args[len] = arguments[len];

                      return _vm.formatter.apply(
                        void 0,
                        args.concat([_vm.column.splitSymbol])
                      )
                    }
                  : undefined
              },
              _vm.$attrs,
              _vm.column
            ),
            false
          ),
          _vm.$listeners
        )
      )
    : _c(
        "el-table-column",
        _vm._g(
          _vm._b(
            {
              attrs: {
                align: _vm.column.align || _vm.align || "left",
                "header-align":
                  _vm.headerAlign || _vm.column.align || _vm.align || "left"
              },
              scopedSlots: _vm._u(
                [
                  {
                    key: "default",
                    fn: function(scope) {
                      return [
                        _vm.column.slot || _vm.column.slotName
                          ? _c(
                              "div",
                              [
                                _vm._t(_vm.column.slotName || "default", null, {
                                  row: scope.row,
                                  $index: scope.$index
                                })
                              ],
                              2
                            )
                          : _vm.column.render
                          ? _c("anchor-render", {
                              attrs: { scope: scope, render: _vm.column.render }
                            })
                          : _c("div", [
                              _vm._v(
                                "\n      " +
                                  _vm._s(
                                    scope.column.type === "index"
                                      ? scope.$index + 1
                                      : scope.row[scope.column.property]
                                  ) +
                                  "\n    "
                              )
                            ])
                      ]
                    }
                  },
                  _vm.column.slotHeaderName || _vm.column.renderHeader
                    ? {
                        key: "header",
                        fn: function(scope) {
                          return [
                            _vm.column.slotHeaderName
                              ? _c(
                                  "span",
                                  [
                                    _vm._t(_vm.column.slotHeaderName, null, {
                                      column: scope.column,
                                      $index: scope.$index
                                    })
                                  ],
                                  2
                                )
                              : _vm.column.renderHeader
                              ? _c("anchor-render", {
                                  attrs: {
                                    scope: scope,
                                    render: _vm.column.renderHeader
                                  }
                                })
                              : _c("span", [_vm._v(_vm._s(_vm.column.label))])
                          ]
                        }
                      }
                    : null
                ],
                null,
                true
              )
            },
            "el-table-column",
            Object.assign({}, _vm.$attrs, _vm.column),
            false
          ),
          _vm.$listeners
        ),
        [
          _vm._v(" "),
          _vm._v(" "),
          _vm.column.children
            ? _vm._l(_vm.column.children, function(col, index) {
                return _c(
                  "anchor-column",
                  _vm._b(
                    { key: index, attrs: { column: col } },
                    "anchor-column",
                    Object.assign({}, _vm.$attrs, col),
                    false
                  )
                )
              })
            : _vm._e()
        ],
        2
      )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

//

/**
 * 基于el-table二次封装的表格组件, 通过column配置,自带分页功能
 * @displayName anchor-table
 */
var script = {
  name: "anchor-table",
  props: {
    /**
     * 列配置, 每个数组元素参照element-ui Table-column Attributes
     */
    column: Array,
    /**
     * 数据源
     */
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     *  是否开始空值是否默认值，空值包括`null`, 空字符串, `undefined`,
     */
    openDefaultFormatter: {
      type: Boolean,
      default: false,
    },

    /**
     *  默认格式化字符
     */
    splitSymbol: {
      type: String,
      default: "-",
    },
    /**
     * Table 的最大高度。合法的值为数字或者单位为 px 的高度, 参照el-table
     */
    maxHeight: {
      type: [String, Number],
    },
    /**
     * 是否显示分页
     */
    pagination: {
      type: Boolean,
      default: false,
    },

    /**
     * 是否带有纵向边框
     */
    border: {
      type: Boolean,
      default: true,
    },

    /**
     * 是否为斑马纹 table
     */
    stripe: {
      type: Boolean,
      default: true,
    },

    /**
     * 距离列表底部的margin-top 距离
     */
    paginationTop: {
      type: String,
      default: "15px",
    },

    /**
     * 分页对齐方式
     *  @values right, left, center
     */
    paginationAlign: {
      type: String,
      default: "right",
    },
    /**
     * 分页大小
     */
    pageSize: {
      type: Number,
      default: 10,
    },
    /**
     * 当前页
     */
    currentPage: {
      type: Number,
      default: 1,
    },
    /**
     * 合并行或列的计算方法， 同`el-table`
     */
    spanMethod: Function,
    /**
     * 需要合并prop数组,如果配置了此值，默认计算`spanMethod`方法
     */
    merge: Array,
  },
  components: {
    AnchorColumn: __vue_component__$1,
  },
  data() {
    return {
      mergeLine: {},
      mergeIndex: {},
      tableData: [],
    };
  },
  created() {
    this.getMergeArr(this.data, this.merge);
    this.updateTableData();
  },

  computed: {
    dataLength() {
      return this.data.length;
    },
  },

  methods: {
    clearSelection() {
      this.$refs.elTable.clearSelection();
    },
    toggleRowSelection(row, selected) {
      this.$refs.elTable.toggleRowSelection(row, selected);
    },
    toggleAllSelection() {
      this.$refs.elTable.toggleAllSelection();
    },
    toggleRowExpansion(row, expanded) {
      this.$refs.elTable.toggleRowExpansion(row, expanded);
    },
    setCurrentRow(row) {
      this.$refs.elTable.setCurrentRow(row);
    },
    clearSort() {
      this.$refs.elTable.clearSort();
    },
    clearFilter(columnKey) {
      this.$refs.elTable.clearFilter(columnKey);
    },
    doLayout() {
      this.$refs.elTable.doLayout();
    },
    sort(prop, order) {
      this.$refs.elTable.sort(prop, order);
    },

    getMergeArr(tableData, merge) {
      if (!merge) return;
      this.mergeLine = {};
      this.mergeIndex = {};
      merge.forEach((item) => {
        tableData.forEach((data, i) => {
          if (i === 0) {
            this.mergeIndex[item] = this.mergeIndex[item] || [];
            this.mergeIndex[item].push(1);
            this.mergeLine[item] = 0;
          } else {
            if (data[item] === tableData[i - 1][item]) {
              this.mergeIndex[item][this.mergeLine[item]] += 1;
              this.mergeIndex[item].push(0);
            } else {
              this.mergeIndex[item].push(1);
              this.mergeLine[item] = i;
            }
          }
        });
      });
    },

    // eslint-disable-next-line no-unused-vars
    mergeMethod({ row, column, rowIndex, columnIndex }) {
      const index = this.merge.indexOf(column.property);
      if (index > -1) {
        const _row = this.mergeIndex[this.merge[index]][rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },

    /* el-pagination 的 current-change事件和table 的事件冲突, 重命名*/
    paginationCurrentChange(val) {
      /**
       * el-pagination 的current-change事件
       * @arg {number} page 当前页
       */
      this.$emit("p-current-change", val);
    },

    /* change tableData */
    updateTableData() {
      this.tableData = this.data.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
  watch: {
    data() {
      this.updateTableData();
    },
    pageSize() {
      this.updateTableData();
    },
    currentPage() {
      this.updateTableData();
    },
    merge() {
      this.getMergeArr(this.data, this.merge);
    },
    dataLength() {
      this.getMergeArr(this.data, this.merge);
    },
  },
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "anchor-table-wrapper" },
    [
      _c(
        "el-table",
        _vm._g(
          _vm._b(
            {
              ref: "elTable",
              staticClass: "anchor-table",
              class: { "anchor-table-no-overflow-y": !!_vm.maxHeight },
              attrs: {
                stripe: _vm.stripe,
                border: _vm.border,
                data:
                  _vm.pagination && _vm.data.length > _vm.pageSize
                    ? _vm.tableData
                    : _vm.data,
                "span-method": _vm.merge ? _vm.mergeMethod : _vm.spanMethod,
                "max-height": _vm.maxHeight
              }
            },
            "el-table",
            _vm.$attrs,
            false
          ),
          _vm.$listeners
        ),
        _vm._l(_vm.column, function(item, index) {
          return _c(
            "anchor-column",
            _vm._b(
              {
                key: index,
                attrs: {
                  column: Object.assign(
                    {},
                    {
                      splitSymbol: _vm.splitSymbol,
                      openDefaultFormatter: _vm.openDefaultFormatter
                    },
                    item
                  )
                },
                scopedSlots: _vm._u(
                  [
                    item.slotHeaderName
                      ? {
                          key: item.slotHeaderName,
                          fn: function(scope) {
                            return [
                              _vm._t(item.slotHeaderName, null, {
                                column: scope.column,
                                $index: scope.$index
                              })
                            ]
                          }
                        }
                      : null,
                    item.slotName
                      ? {
                          key: item.slotName,
                          fn: function(scope) {
                            return [
                              _vm._t(item.slotName, null, {
                                row: scope.row,
                                $index: scope.$index
                              })
                            ]
                          }
                        }
                      : {
                          key: "default",
                          fn: function(scope) {
                            return [
                              _vm._t("default", null, {
                                row: scope.row,
                                $index: scope.$index
                              })
                            ]
                          }
                        }
                  ],
                  null,
                  true
                )
              },
              "anchor-column",
              _vm.$attrs,
              false
            )
          )
        }),
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "anchor-table-footer" },
        [
          _c("div", [_vm._t("footer")], 2),
          _vm._v(" "),
          _vm.pagination
            ? _c(
                "el-pagination",
                _vm._g(
                  _vm._b(
                    {
                      staticClass: "anchor-table-pagination",
                      style: {
                        "margin-top": _vm.paginationTop,
                        "text-align": _vm.paginationAlign
                      },
                      attrs: {
                        layout:
                          _vm.$attrs["layout"] ||
                          "sizes, prev, pager, next, total",
                        "page-size": _vm.pageSize,
                        "current-page": _vm.currentPage
                      },
                      on: { "current-change": _vm.paginationCurrentChange }
                    },
                    "el-pagination",
                    _vm.$attrs,
                    false
                  ),
                  _vm.$listeners
                )
              )
            : _vm._e()
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-2959deb9_0", { source: ".anchor-table-wrapper[data-v-2959deb9] {\n  width: 100%;\n  flex: 1;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n}\n.anchor-table-wrapper .anchor-table[data-v-2959deb9] {\n  flex: 1;\n  overflow-y: auto;\n}\n.anchor-table-wrapper .anchor-table-no-overflow-y[data-v-2959deb9] {\n  overflow-y: hidden;\n}\n.anchor-table-wrapper .anchor-table-footer[data-v-2959deb9] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.anchor-table-wrapper .anchor-table[data-v-2959deb9]  table {\n  margin: 0;\n}\n.anchor-table-wrapper .anchor-table[data-v-2959deb9]  table .cell {\n  display: flex;\n  flex-wrap: wrap;\n}\n.anchor-table-wrapper .anchor-table[data-v-2959deb9]  table .el-table__expand-column .cell {\n  display: block;\n}\n\n/*# sourceMappingURL=index.vue.map */", map: {"version":3,"sources":["/Users/admin/personal/coding/aurora-ui/src/components/anchor-table/index.vue","index.vue"],"names":[],"mappings":"AA2TA;EACA,WAAA;EACA,OAAA;EACA,gBAAA;EACA,aAAA;EACA,sBAAA;AC1TA;AD2TA;EACA,OAAA;EACA,gBAAA;ACzTA;AD0TA;EACA,kBAAA;ACxTA;AD0TA;EACA,aAAA;EACA,8BAAA;EACA,mBAAA;ACxTA;AD2TA;EACA,SAAA;ACzTA;AD2TA;EACA,aAAA;EACA,eAAA;ACzTA;AD2TA;EACA,cAAA;ACzTA;;AAEA,oCAAoC","file":"index.vue","sourcesContent":["<template>\n  <div class=\"anchor-table-wrapper\">\n    <el-table\n      ref=\"elTable\"\n      class=\"anchor-table\"\n      :class=\"{ 'anchor-table-no-overflow-y': !!maxHeight }\"\n      v-bind=\"$attrs\"\n      v-on=\"$listeners\"\n      :stripe=\"stripe\"\n      :border=\"border\"\n      :data=\"pagination && data.length > pageSize ? tableData : data\"\n      :span-method=\"merge ? mergeMethod : spanMethod\"\n      :max-height=\"maxHeight\"\n    >\n      <anchor-column\n        v-bind=\"$attrs\"\n        v-for=\"(item, index) in column\"\n        :key=\"index\"\n        :column=\"{\n          splitSymbol: splitSymbol,\n          openDefaultFormatter: openDefaultFormatter,\n          ...item,\n        }\"\n      >\n        <!-- template 填充anchor-column 的插槽 -->\n        <template\n          v-if=\"item.slotHeaderName\"\n          v-slot:[item.slotHeaderName]=\"scope\"\n        >\n          <!--暴露slot给外部组件用 -->\n\n          <!--\n              @slot 提供给列表头部，列配置的插槽\n              @binding {string} name 指定插槽名字（没指定的话，默认default）\n              @binding {number} $index 第几列\n              @binding {object} column 列配置数据\n           -->\n          <slot\n            :name=\"item.slotHeaderName\"\n            :column=\"scope.column\"\n            :$index=\"scope.$index\"\n          />\n        </template>\n\n        <template v-if=\"item.slotName\" v-slot:[item.slotName]=\"scope\">\n          <!--\n              @slot 提供给列表头部，列配置的插槽\n              @binding {string} name 指定插槽名字（没指定的话，默认default）\n              @binding {number} $index 第几列\n              @binding {object} row 列配置数据\n           -->\n          <slot :name=\"item.slotName\" :row=\"scope.row\" :$index=\"scope.$index\" />\n        </template>\n        <template v-else v-slot=\"scope\">\n          <!--\n              @slot 提供给列表头部，列配置的插槽\n              @binding {string} name 指定插槽名字（没指定的话，默认default）\n              @binding {number} $index 第几列\n              @binding {object} row     列配置数据\n           -->\n          <slot :name=\"'default'\" :row=\"scope.row\" :$index=\"scope.$index\" />\n        </template>\n      </anchor-column>\n    </el-table>\n    <div class=\"anchor-table-footer\">\n      <div>\n        <!-- @slot 列表底部操作，一般用于列表下面操作，与分页一排 -->\n        <slot name=\"footer\" />\n      </div>\n      <el-pagination\n        class=\"anchor-table-pagination\"\n        v-if=\"pagination\"\n        v-bind=\"$attrs\"\n        :layout=\"$attrs['layout'] || 'sizes, prev, pager, next, total'\"\n        v-on=\"$listeners\"\n        @current-change=\"paginationCurrentChange\"\n        :page-size=\"pageSize\"\n        :current-page=\"currentPage\"\n        :style=\"{ 'margin-top': paginationTop, 'text-align': paginationAlign }\"\n      ></el-pagination>\n    </div>\n  </div>\n</template>\n\n<script>\nimport AnchorColumn from \"./anchor-column\";\n\n/**\n * 基于el-table二次封装的表格组件, 通过column配置,自带分页功能\n * @displayName anchor-table\n */\nexport default {\n  name: \"anchor-table\",\n  props: {\n    /**\n     * 列配置, 每个数组元素参照element-ui Table-column Attributes\n     */\n    column: Array,\n    /**\n     * 数据源\n     */\n    data: {\n      type: Array,\n      default() {\n        return [];\n      },\n    },\n    /**\n     *  是否开始空值是否默认值，空值包括`null`, 空字符串, `undefined`,\n     */\n    openDefaultFormatter: {\n      type: Boolean,\n      default: false,\n    },\n\n    /**\n     *  默认格式化字符\n     */\n    splitSymbol: {\n      type: String,\n      default: \"-\",\n    },\n    /**\n     * Table 的最大高度。合法的值为数字或者单位为 px 的高度, 参照el-table\n     */\n    maxHeight: {\n      type: [String, Number],\n    },\n    /**\n     * 是否显示分页\n     */\n    pagination: {\n      type: Boolean,\n      default: false,\n    },\n\n    /**\n     * 是否带有纵向边框\n     */\n    border: {\n      type: Boolean,\n      default: true,\n    },\n\n    /**\n     * 是否为斑马纹 table\n     */\n    stripe: {\n      type: Boolean,\n      default: true,\n    },\n\n    /**\n     * 距离列表底部的margin-top 距离\n     */\n    paginationTop: {\n      type: String,\n      default: \"15px\",\n    },\n\n    /**\n     * 分页对齐方式\n     *  @values right, left, center\n     */\n    paginationAlign: {\n      type: String,\n      default: \"right\",\n    },\n    /**\n     * 分页大小\n     */\n    pageSize: {\n      type: Number,\n      default: 10,\n    },\n    /**\n     * 当前页\n     */\n    currentPage: {\n      type: Number,\n      default: 1,\n    },\n    /**\n     * 合并行或列的计算方法， 同`el-table`\n     */\n    spanMethod: Function,\n    /**\n     * 需要合并prop数组,如果配置了此值，默认计算`spanMethod`方法\n     */\n    merge: Array,\n  },\n  components: {\n    AnchorColumn,\n  },\n  data() {\n    return {\n      mergeLine: {},\n      mergeIndex: {},\n      tableData: [],\n    };\n  },\n  created() {\n    this.getMergeArr(this.data, this.merge);\n    this.updateTableData();\n  },\n\n  computed: {\n    dataLength() {\n      return this.data.length;\n    },\n  },\n\n  methods: {\n    clearSelection() {\n      this.$refs.elTable.clearSelection();\n    },\n    toggleRowSelection(row, selected) {\n      this.$refs.elTable.toggleRowSelection(row, selected);\n    },\n    toggleAllSelection() {\n      this.$refs.elTable.toggleAllSelection();\n    },\n    toggleRowExpansion(row, expanded) {\n      this.$refs.elTable.toggleRowExpansion(row, expanded);\n    },\n    setCurrentRow(row) {\n      this.$refs.elTable.setCurrentRow(row);\n    },\n    clearSort() {\n      this.$refs.elTable.clearSort();\n    },\n    clearFilter(columnKey) {\n      this.$refs.elTable.clearFilter(columnKey);\n    },\n    doLayout() {\n      this.$refs.elTable.doLayout();\n    },\n    sort(prop, order) {\n      this.$refs.elTable.sort(prop, order);\n    },\n\n    getMergeArr(tableData, merge) {\n      if (!merge) return;\n      this.mergeLine = {};\n      this.mergeIndex = {};\n      merge.forEach((item) => {\n        tableData.forEach((data, i) => {\n          if (i === 0) {\n            this.mergeIndex[item] = this.mergeIndex[item] || [];\n            this.mergeIndex[item].push(1);\n            this.mergeLine[item] = 0;\n          } else {\n            if (data[item] === tableData[i - 1][item]) {\n              this.mergeIndex[item][this.mergeLine[item]] += 1;\n              this.mergeIndex[item].push(0);\n            } else {\n              this.mergeIndex[item].push(1);\n              this.mergeLine[item] = i;\n            }\n          }\n        });\n      });\n    },\n\n    // eslint-disable-next-line no-unused-vars\n    mergeMethod({ row, column, rowIndex, columnIndex }) {\n      const index = this.merge.indexOf(column.property);\n      if (index > -1) {\n        const _row = this.mergeIndex[this.merge[index]][rowIndex];\n        const _col = _row > 0 ? 1 : 0;\n        return {\n          rowspan: _row,\n          colspan: _col,\n        };\n      }\n    },\n\n    /* el-pagination 的 current-change事件和table 的事件冲突, 重命名*/\n    paginationCurrentChange(val) {\n      /**\n       * el-pagination 的current-change事件\n       * @arg {number} page 当前页\n       */\n      this.$emit(\"p-current-change\", val);\n    },\n\n    /* change tableData */\n    updateTableData() {\n      this.tableData = this.data.slice(\n        (this.currentPage - 1) * this.pageSize,\n        this.currentPage * this.pageSize\n      );\n    },\n  },\n  watch: {\n    data() {\n      this.updateTableData();\n    },\n    pageSize() {\n      this.updateTableData();\n    },\n    currentPage() {\n      this.updateTableData();\n    },\n    merge() {\n      this.getMergeArr(this.data, this.merge);\n    },\n    dataLength() {\n      this.getMergeArr(this.data, this.merge);\n    },\n  },\n};\n</script>\n\n<style lang=\"scss\" scoped>\n.anchor-table-wrapper {\n  width: 100%;\n  flex: 1;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  .anchor-table {\n    flex: 1;\n    overflow-y: auto;\n    &-no-overflow-y {\n      overflow-y: hidden;\n    }\n    &-footer {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n    }\n\n    ::v-deep table {\n      margin: 0;\n\n      .cell {\n        display: flex;\n        flex-wrap: wrap;\n      }\n      .el-table__expand-column .cell {\n        display: block;\n      }\n    }\n  }\n}\n</style>\n",".anchor-table-wrapper {\n  width: 100%;\n  flex: 1;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n}\n.anchor-table-wrapper .anchor-table {\n  flex: 1;\n  overflow-y: auto;\n}\n.anchor-table-wrapper .anchor-table-no-overflow-y {\n  overflow-y: hidden;\n}\n.anchor-table-wrapper .anchor-table-footer {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.anchor-table-wrapper .anchor-table ::v-deep table {\n  margin: 0;\n}\n.anchor-table-wrapper .anchor-table ::v-deep table .cell {\n  display: flex;\n  flex-wrap: wrap;\n}\n.anchor-table-wrapper .anchor-table ::v-deep table .el-table__expand-column .cell {\n  display: block;\n}\n\n/*# sourceMappingURL=index.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-2959deb9";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

var components = [__vue_component__$4, __vue_component__$2, __vue_component__$3, __vue_component__]; // const components = [];
// const contexts = require.context(
//   "./",
//   true,
//   /^\.\/(components)\/\S+\/index\.vue$/
// );
// contexts.keys().forEach((component) => {
//   const componentEntity = contexts(component).default;
//   /* ts class 类型组件, build 之后 变量名会变, 所以根据路径指定名字 */
//   if (componentEntity instanceof Function) {
//     const componentName = component.replace(
//       /^\.\/(components)\/(\S+)\/index\.vue$/,
//       (match, $1, $2) => $2
//     );
//     Object.defineProperty(componentEntity, "name", {
//       value: componentName,
//     });
//   }
//   components.push(componentEntity);
// });

var install = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(Vue) {
    var opts,
        isUseElement,
        elementUI,
        _args = arguments;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            opts = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            isUseElement = opts.isUseElement;

            if (!isUseElement) {
              _context.next = 7;
              break;
            }

            _context.next = 5;
            return import('element-ui');

          case 5:
            elementUI = _context.sent;
            Vue.use(elementUI);

          case 7:
            components.forEach(function (component) {
              component.name && Vue.component(component.name, component);
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function install(_x) {
    return _ref.apply(this, arguments);
  };
}();

var AnchorUI = {
  install: install
};

export { AnchorUI as default };