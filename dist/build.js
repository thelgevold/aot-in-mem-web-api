(function () {
'use strict';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * This class should not be used directly by an application developer. Instead, use
 * {@link Location}.
 *
 * `PlatformLocation` encapsulates all calls to DOM apis, which allows the Router to be platform
 * agnostic.
 * This means that we can have different implementation of `PlatformLocation` for the different
 * platforms
 * that angular supports. For example, the default `PlatformLocation` is {@link
 * BrowserPlatformLocation},
 * however when you run your app in a WebWorker you use {@link WebWorkerPlatformLocation}.
 *
 * The `PlatformLocation` class is used directly by all implementations of {@link LocationStrategy}
 * when
 * they need to interact with the DOM apis like pushState, popState, etc...
 *
 * {@link LocationStrategy} in turn is used by the {@link Location} service which is used directly
 * by
 * the {@link Router} in order to navigate between routes. Since all interactions between {@link
 * Router} /
 * {@link Location} / {@link LocationStrategy} and DOM apis flow through the `PlatformLocation`
 * class
 * they are all platform independent.
 *
 * @stable
 */
var PlatformLocation = (function () {
    function PlatformLocation() {
    }
    Object.defineProperty(PlatformLocation.prototype, "pathname", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformLocation.prototype, "search", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformLocation.prototype, "hash", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    return PlatformLocation;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var globalScope;
if (typeof window === 'undefined') {
    if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
        // TODO: Replace any with WorkerGlobalScope from lib.webworker.d.ts #3492
        globalScope = self;
    }
    else {
        globalScope = global;
    }
}
else {
    globalScope = window;
}
function scheduleMicroTask(fn) {
    Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
}
// Need to declare a new variable for global here since TypeScript
// exports the original value of the symbol.
var _global = globalScope;
function getTypeNameForDebugging(type) {
    if (type['name']) {
        return type['name'];
    }
    return typeof type;
}
var Math$1 = _global.Math;
var Date$1 = _global.Date;
// TODO: remove calls to assert in production environment
// Note: Can't just export this and import in in other files
// as `assert` is a reserved keyword in Dart
_global.assert = function assert(condition) {
    // TODO: to be fixed properly via #2830, noop for now
};
function isPresent(obj) {
    return obj !== undefined && obj !== null;
}
function isBlank(obj) {
    return obj === undefined || obj === null;
}


function isString(obj) {
    return typeof obj === 'string';
}
function isFunction(obj) {
    return typeof obj === 'function';
}



function isPromise(obj) {
    // allow any Promise/A+ compliant thenable.
    // It's up to the caller to ensure that obj.then conforms to the spec
    return isPresent(obj) && isFunction(obj.then);
}
function isArray(obj) {
    return Array.isArray(obj);
}


function stringify(token) {
    if (typeof token === 'string') {
        return token;
    }
    if (token === undefined || token === null) {
        return '' + token;
    }
    if (token.overriddenName) {
        return token.overriddenName;
    }
    if (token.name) {
        return token.name;
    }
    var res = token.toString();
    var newLineIndex = res.indexOf('\n');
    return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
}
// serialize / deserialize enum exist only for consistency with dart API
// enums in typescript don't need to be serialized



var StringWrapper = (function () {
    function StringWrapper() {
    }
    StringWrapper.fromCharCode = function (code) { return String.fromCharCode(code); };
    StringWrapper.charCodeAt = function (s, index) { return s.charCodeAt(index); };
    StringWrapper.split = function (s, regExp) { return s.split(regExp); };
    StringWrapper.equals = function (s, s2) { return s === s2; };
    StringWrapper.stripLeft = function (s, charVal) {
        if (s && s.length) {
            var pos = 0;
            for (var i = 0; i < s.length; i++) {
                if (s[i] != charVal)
                    break;
                pos++;
            }
            s = s.substring(pos);
        }
        return s;
    };
    StringWrapper.stripRight = function (s, charVal) {
        if (s && s.length) {
            var pos = s.length;
            for (var i = s.length - 1; i >= 0; i--) {
                if (s[i] != charVal)
                    break;
                pos--;
            }
            s = s.substring(0, pos);
        }
        return s;
    };
    StringWrapper.replace = function (s, from, replace) {
        return s.replace(from, replace);
    };
    StringWrapper.replaceAll = function (s, from, replace) {
        return s.replace(from, replace);
    };
    StringWrapper.slice = function (s, from, to) {
        if (from === void 0) { from = 0; }
        if (to === void 0) { to = null; }
        return s.slice(from, to === null ? undefined : to);
    };
    StringWrapper.replaceAllMapped = function (s, from, cb) {
        return s.replace(from, function () {
            var matches = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                matches[_i - 0] = arguments[_i];
            }
            // Remove offset & string from the result array
            matches.splice(-2, 2);
            // The callback receives match, p1, ..., pn
            return cb(matches);
        });
    };
    StringWrapper.contains = function (s, substr) { return s.indexOf(substr) != -1; };
    StringWrapper.compare = function (a, b) {
        if (a < b) {
            return -1;
        }
        else if (a > b) {
            return 1;
        }
        else {
            return 0;
        }
    };
    return StringWrapper;
}());

var NumberWrapper = (function () {
    function NumberWrapper() {
    }
    NumberWrapper.toFixed = function (n, fractionDigits) { return n.toFixed(fractionDigits); };
    NumberWrapper.equal = function (a, b) { return a === b; };
    NumberWrapper.parseIntAutoRadix = function (text) {
        var result = parseInt(text);
        if (isNaN(result)) {
            throw new Error('Invalid integer literal when parsing ' + text);
        }
        return result;
    };
    NumberWrapper.parseInt = function (text, radix) {
        if (radix == 10) {
            if (/^(\-|\+)?[0-9]+$/.test(text)) {
                return parseInt(text, radix);
            }
        }
        else if (radix == 16) {
            if (/^(\-|\+)?[0-9ABCDEFabcdef]+$/.test(text)) {
                return parseInt(text, radix);
            }
        }
        else {
            var result = parseInt(text, radix);
            if (!isNaN(result)) {
                return result;
            }
        }
        throw new Error('Invalid integer literal when parsing ' + text + ' in base ' + radix);
    };
    Object.defineProperty(NumberWrapper, "NaN", {
        get: function () { return NaN; },
        enumerable: true,
        configurable: true
    });
    NumberWrapper.isNumeric = function (value) { return !isNaN(value - parseFloat(value)); };
    NumberWrapper.isNaN = function (value) { return isNaN(value); };
    NumberWrapper.isInteger = function (value) { return Number.isInteger(value); };
    return NumberWrapper;
}());


// JS has NaN !== NaN
function looseIdentical(a, b) {
    return a === b || typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b);
}
// JS considers NaN is the same as NaN for map Key (while NaN !== NaN otherwise)
// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
function getMapKey(value) {
    return value;
}


function isJsObject(o) {
    return o !== null && (typeof o === 'function' || typeof o === 'object');
}
function print(obj) {
    console.log(obj);
}
function warn(obj) {
    console.warn(obj);
}
// Can't be all uppercase as our transpiler would think it is a special directive...



var _symbolIterator = null;
function getSymbolIterator() {
    if (isBlank(_symbolIterator)) {
        if (isPresent(globalScope.Symbol) && isPresent(Symbol.iterator)) {
            _symbolIterator = Symbol.iterator;
        }
        else {
            // es6-shim specific logic
            var keys = Object.getOwnPropertyNames(Map.prototype);
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                if (key !== 'entries' && key !== 'size' &&
                    Map.prototype[key] === Map.prototype['entries']) {
                    _symbolIterator = key;
                }
            }
        }
    }
    return _symbolIterator;
}

function isPrimitive(obj) {
    return !isJsObject(obj);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var _nextClassId = 0;
function extractAnnotation(annotation) {
    if (isFunction(annotation) && annotation.hasOwnProperty('annotation')) {
        // it is a decorator, extract annotation
        annotation = annotation.annotation;
    }
    return annotation;
}
function applyParams(fnOrArray, key) {
    if (fnOrArray === Object || fnOrArray === String || fnOrArray === Function ||
        fnOrArray === Number || fnOrArray === Array) {
        throw new Error("Can not use native " + stringify(fnOrArray) + " as constructor");
    }
    if (isFunction(fnOrArray)) {
        return fnOrArray;
    }
    else if (fnOrArray instanceof Array) {
        var annotations = fnOrArray;
        var annoLength = annotations.length - 1;
        var fn = fnOrArray[annoLength];
        if (!isFunction(fn)) {
            throw new Error("Last position of Class method array must be Function in key " + key + " was '" + stringify(fn) + "'");
        }
        if (annoLength != fn.length) {
            throw new Error("Number of annotations (" + annoLength + ") does not match number of arguments (" + fn.length + ") in the function: " + stringify(fn));
        }
        var paramsAnnotations = [];
        for (var i = 0, ii = annotations.length - 1; i < ii; i++) {
            var paramAnnotations = [];
            paramsAnnotations.push(paramAnnotations);
            var annotation = annotations[i];
            if (annotation instanceof Array) {
                for (var j = 0; j < annotation.length; j++) {
                    paramAnnotations.push(extractAnnotation(annotation[j]));
                }
            }
            else if (isFunction(annotation)) {
                paramAnnotations.push(extractAnnotation(annotation));
            }
            else {
                paramAnnotations.push(annotation);
            }
        }
        Reflect.defineMetadata('parameters', paramsAnnotations, fn);
        return fn;
    }
    else {
        throw new Error("Only Function or Array is supported in Class definition for key '" + key + "' is '" + stringify(fnOrArray) + "'");
    }
}
/**
 * Provides a way for expressing ES6 classes with parameter annotations in ES5.
 *
 * ## Basic Example
 *
 * ```
 * var Greeter = ng.Class({
 *   constructor: function(name) {
 *     this.name = name;
 *   },
 *
 *   greet: function() {
 *     alert('Hello ' + this.name + '!');
 *   }
 * });
 * ```
 *
 * is equivalent to ES6:
 *
 * ```
 * class Greeter {
 *   constructor(name) {
 *     this.name = name;
 *   }
 *
 *   greet() {
 *     alert('Hello ' + this.name + '!');
 *   }
 * }
 * ```
 *
 * or equivalent to ES5:
 *
 * ```
 * var Greeter = function (name) {
 *   this.name = name;
 * }
 *
 * Greeter.prototype.greet = function () {
 *   alert('Hello ' + this.name + '!');
 * }
 * ```
 *
 * ### Example with parameter annotations
 *
 * ```
 * var MyService = ng.Class({
 *   constructor: [String, [new Query(), QueryList], function(name, queryList) {
 *     ...
 *   }]
 * });
 * ```
 *
 * is equivalent to ES6:
 *
 * ```
 * class MyService {
 *   constructor(name: string, @Query() queryList: QueryList) {
 *     ...
 *   }
 * }
 * ```
 *
 * ### Example with inheritance
 *
 * ```
 * var Shape = ng.Class({
 *   constructor: (color) {
 *     this.color = color;
 *   }
 * });
 *
 * var Square = ng.Class({
 *   extends: Shape,
 *   constructor: function(color, size) {
 *     Shape.call(this, color);
 *     this.size = size;
 *   }
 * });
 * ```
 * @stable
 */
function Class(clsDef) {
    var constructor = applyParams(clsDef.hasOwnProperty('constructor') ? clsDef.constructor : undefined, 'constructor');
    var proto = constructor.prototype;
    if (clsDef.hasOwnProperty('extends')) {
        if (isFunction(clsDef.extends)) {
            constructor.prototype = proto =
                Object.create(clsDef.extends.prototype);
        }
        else {
            throw new Error("Class definition 'extends' property must be a constructor function was: " + stringify(clsDef.extends));
        }
    }
    for (var key in clsDef) {
        if (key != 'extends' && key != 'prototype' && clsDef.hasOwnProperty(key)) {
            proto[key] = applyParams(clsDef[key], key);
        }
    }
    if (this && this.annotations instanceof Array) {
        Reflect.defineMetadata('annotations', this.annotations, constructor);
    }
    var constructorName = constructor['name'];
    if (!constructorName || constructorName === 'constructor') {
        constructor['overriddenName'] = "class" + _nextClassId++;
    }
    return constructor;
}
var Reflect = _global.Reflect;
function makeDecorator(name, props, parentClass, chainFn) {
    if (chainFn === void 0) { chainFn = null; }
    var metaCtor = makeMetadataCtor([props]);
    function DecoratorFactory(objOrType) {
        if (!(Reflect && Reflect.getMetadata)) {
            throw 'reflect-metadata shim is required when using class decorators';
        }
        if (this instanceof DecoratorFactory) {
            metaCtor.call(this, objOrType);
            return this;
        }
        else {
            var annotationInstance_1 = new DecoratorFactory(objOrType);
            var chainAnnotation = isFunction(this) && this.annotations instanceof Array ? this.annotations : [];
            chainAnnotation.push(annotationInstance_1);
            var TypeDecorator = function TypeDecorator(cls) {
                var annotations = Reflect.getOwnMetadata('annotations', cls) || [];
                annotations.push(annotationInstance_1);
                Reflect.defineMetadata('annotations', annotations, cls);
                return cls;
            };
            TypeDecorator.annotations = chainAnnotation;
            TypeDecorator.Class = Class;
            if (chainFn)
                chainFn(TypeDecorator);
            return TypeDecorator;
        }
    }
    if (parentClass) {
        DecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    DecoratorFactory.prototype.toString = function () { return ("@" + name); };
    DecoratorFactory.annotationCls = DecoratorFactory;
    return DecoratorFactory;
}
function makeMetadataCtor(props) {
    function ctor() {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        props.forEach(function (prop, i) {
            var argVal = args[i];
            if (Array.isArray(prop)) {
                // plain parameter
                var val = !argVal || argVal === undefined ? prop[1] : argVal;
                _this[prop[0]] = val;
            }
            else {
                for (var propName in prop) {
                    var val = !argVal || argVal[propName] === undefined ? prop[propName] : argVal[propName];
                    _this[propName] = val;
                }
            }
        });
    }
    return ctor;
}
function makeParamDecorator(name, props, parentClass) {
    var metaCtor = makeMetadataCtor(props);
    function ParamDecoratorFactory() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (this instanceof ParamDecoratorFactory) {
            metaCtor.apply(this, args);
            return this;
        }
        var annotationInstance = new ((_a = ParamDecoratorFactory).bind.apply(_a, [void 0].concat(args)))();
        ParamDecorator.annotation = annotationInstance;
        return ParamDecorator;
        function ParamDecorator(cls, unusedKey, index) {
            var parameters = Reflect.getMetadata('parameters', cls) || [];
            // there might be gaps if some in between parameters do not have annotations.
            // we pad with nulls.
            while (parameters.length <= index) {
                parameters.push(null);
            }
            parameters[index] = parameters[index] || [];
            var annotationsForParam = parameters[index];
            annotationsForParam.push(annotationInstance);
            Reflect.defineMetadata('parameters', parameters, cls);
            return cls;
        }
        var _a;
    }
    if (parentClass) {
        ParamDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    ParamDecoratorFactory.prototype.toString = function () { return ("@" + name); };
    ParamDecoratorFactory.annotationCls = ParamDecoratorFactory;
    return ParamDecoratorFactory;
}
function makePropDecorator(name, props, parentClass) {
    var metaCtor = makeMetadataCtor(props);
    function PropDecoratorFactory() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (this instanceof PropDecoratorFactory) {
            metaCtor.apply(this, args);
            return this;
        }
        else {
            var decoratorInstance = new ((_a = PropDecoratorFactory).bind.apply(_a, [void 0].concat(args)))();
            return function PropDecorator(target, name) {
                var meta = Reflect.getOwnMetadata('propMetadata', target.constructor) || {};
                meta[name] = meta[name] || [];
                meta[name].unshift(decoratorInstance);
                Reflect.defineMetadata('propMetadata', meta, target.constructor);
            };
        }
        var _a;
    }
    if (parentClass) {
        PropDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    PropDecoratorFactory.prototype.toString = function () { return ("@" + name); };
    PropDecoratorFactory.annotationCls = PropDecoratorFactory;
    return PropDecoratorFactory;
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Inject decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var Inject = makeParamDecorator('Inject', [['token', undefined]]);
/**
 * Optional decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var Optional = makeParamDecorator('Optional', []);
/**
 * Injectable decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var Injectable = makeParamDecorator('Injectable', []);
/**
 * Self decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var Self = makeParamDecorator('Self', []);
/**
 * SkipSelf decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var SkipSelf = makeParamDecorator('SkipSelf', []);
/**
 * Host decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var Host = makeParamDecorator('Host', []);

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Creates a token that can be used in a DI Provider.
 *
 * ### Example ([live demo](http://plnkr.co/edit/Ys9ezXpj2Mnoy3Uc8KBp?p=preview))
 *
 * ```typescript
 * var t = new OpaqueToken("value");
 *
 * var injector = Injector.resolveAndCreate([
 *   {provide: t, useValue: "bindingValue"}
 * ]);
 *
 * expect(injector.get(t)).toEqual("bindingValue");
 * ```
 *
 * Using an `OpaqueToken` is preferable to using strings as tokens because of possible collisions
 * caused by multiple providers using the same string as two different tokens.
 *
 * Using an `OpaqueToken` is preferable to using an `Object` as tokens because it provides better
 * error messages.
 * @stable
 */
// so that metadata is gathered for this class
var OpaqueToken = (function () {
    function OpaqueToken(_desc) {
        this._desc = _desc;
    }
    OpaqueToken.prototype.toString = function () { return "Token " + this._desc; };
    OpaqueToken.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    OpaqueToken.ctorParameters = [
        null,
    ];
    return OpaqueToken;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * This token can be used to create a virtual provider that will populate the
 * `entryComponents` fields of components and ng modules based on its `useValue`.
 * All components that are referenced in the `useValue` value (either directly
 * or in a nested array or map) will be added to the `entryComponents` property.
 *
 * ### Example
 * The following example shows how the router can populate the `entryComponents`
 * field of an NgModule based on the router configuration which refers
 * to components.
 *
 * ```typescript
 * // helper function inside the router
 * function provideRoutes(routes) {
 *   return [
 *     {provide: ROUTES, useValue: routes},
 *     {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: routes, multi: true}
 *   ];
 * }
 *
 * // user code
 * let routes = [
 *   {path: '/root', component: RootComp},
 *   {path: '/teams', component: TeamsComp}
 * ];
 *
 * @NgModule({
 *   providers: [provideRoutes(routes)]
 * })
 * class ModuleWithRoutes {}
 * ```
 *
 * @experimental
 */
var ANALYZE_FOR_ENTRY_COMPONENTS = new OpaqueToken('AnalyzeForEntryComponents');
/**
 * Attribute decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var Attribute = makeParamDecorator('Attribute', [['attributeName', undefined]]);
/**
 * Base class for query metadata.
 *
 * See {@link ContentChildren}, {@link ContentChild}, {@link ViewChildren}, {@link ViewChild} for
 * more information.
 *
 * @stable
 */
var Query = (function () {
    function Query() {
    }
    return Query;
}());
/**
 * ContentChildren decorator and metadata.
 *
 *  @stable
 *  @Annotation
 */
var ContentChildren = makePropDecorator('ContentChildren', [
    ['selector', undefined],
    { first: false, isViewQuery: false, descendants: false, read: undefined }
], Query);
/**
 * @whatItDoes Configures a content query.
 *
 * @howToUse
 *
 * {@example core/di/ts/contentChild/content_child_howto.ts region='HowTo'}
 *
 * @description
 *
 * You can use ContentChild to get the first element or the directive matching the selector from the
 * content DOM. If the content DOM changes, and a new child matches the selector,
 * the property will be updated.
 *
 * Content queries are set before the `ngAfterContentInit` callback is called.
 *
 * **Metadata Properties**:
 *
 * * **selector** - the directive type or the name used for querying.
 * * **read** - read a different token from the queried element.
 *
 * Let's look at an example:
 *
 * {@example core/di/ts/contentChild/content_child_example.ts region='Component'}
 *
 * **npm package**: `@angular/core`
 *
 * @stable
 * @Annotation
 */
var ContentChild = makePropDecorator('ContentChild', [
    ['selector', undefined], {
        first: true,
        isViewQuery: false,
        descendants: false,
        read: undefined,
    }
], Query);
/**
 * @whatItDoes Configures a view query.
 *
 * @howToUse
 *
 * {@example core/di/ts/viewChildren/view_children_howto.ts region='HowTo'}
 *
 * @description
 *
 * You can use ViewChildren to get the {@link QueryList} of elements or directives from the
 * view DOM. Any time a child element is added, removed, or moved, the query list will be updated,
 * and the changes observable of the query list will emit a new value.
 *
 * View queries are set before the `ngAfterViewInit` callback is called.
 *
 * **Metadata Properties**:
 *
 * * **selector** - the directive type or the name used for querying.
 * * **read** - read a different token from the queried elements.
 *
 * Let's look at an example:
 *
 * {@example core/di/ts/viewChildren/view_children_example.ts region='Component'}
 *
 * **npm package**: `@angular/core`
 *
 * @stable
 * @Annotation
 */
var ViewChildren = makePropDecorator('ViewChildren', [
    ['selector', undefined], {
        first: false,
        isViewQuery: true,
        descendants: true,
        read: undefined,
    }
], Query);
/**
 * ViewChild decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var ViewChild = makePropDecorator('ViewChild', [
    ['selector', undefined], {
        first: true,
        isViewQuery: true,
        descendants: true,
        read: undefined,
    }
], Query);

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Describes within the change detector which strategy will be used the next time change
 * detection is triggered.
 * @stable
 */
var ChangeDetectionStrategy;
(function (ChangeDetectionStrategy) {
    /**
     * `OnPush` means that the change detector's mode will be set to `CheckOnce` during hydration.
     */
    ChangeDetectionStrategy[ChangeDetectionStrategy["OnPush"] = 0] = "OnPush";
    /**
     * `Default` means that the change detector's mode will be set to `CheckAlways` during hydration.
     */
    ChangeDetectionStrategy[ChangeDetectionStrategy["Default"] = 1] = "Default";
})(ChangeDetectionStrategy || (ChangeDetectionStrategy = {}));
/**
 * Describes the status of the detector.
 */
var ChangeDetectorStatus;
(function (ChangeDetectorStatus) {
    /**
     * `CheckedOnce` means that after calling detectChanges the mode of the change detector
     * will become `Checked`.
     */
    ChangeDetectorStatus[ChangeDetectorStatus["CheckOnce"] = 0] = "CheckOnce";
    /**
     * `Checked` means that the change detector should be skipped until its mode changes to
     * `CheckOnce`.
     */
    ChangeDetectorStatus[ChangeDetectorStatus["Checked"] = 1] = "Checked";
    /**
     * `CheckAlways` means that after calling detectChanges the mode of the change detector
     * will remain `CheckAlways`.
     */
    ChangeDetectorStatus[ChangeDetectorStatus["CheckAlways"] = 2] = "CheckAlways";
    /**
     * `Detached` means that the change detector sub tree is not a part of the main tree and
     * should be skipped.
     */
    ChangeDetectorStatus[ChangeDetectorStatus["Detached"] = 3] = "Detached";
    /**
     * `Errored` means that the change detector encountered an error checking a binding
     * or calling a directive lifecycle method and is now in an inconsistent state. Change
     * detectors in this state will no longer detect changes.
     */
    ChangeDetectorStatus[ChangeDetectorStatus["Errored"] = 4] = "Errored";
    /**
     * `Destroyed` means that the change detector is destroyed.
     */
    ChangeDetectorStatus[ChangeDetectorStatus["Destroyed"] = 5] = "Destroyed";
})(ChangeDetectorStatus || (ChangeDetectorStatus = {}));
/**
 * List of possible {@link ChangeDetectionStrategy} values.
 */
var CHANGE_DETECTION_STRATEGY_VALUES = [
    ChangeDetectionStrategy.OnPush,
    ChangeDetectionStrategy.Default,
];
/**
 * List of possible {@link ChangeDetectorStatus} values.
 */

function isDefaultChangeDetectionStrategy(changeDetectionStrategy) {
    return isBlank(changeDetectionStrategy) ||
        changeDetectionStrategy === ChangeDetectionStrategy.Default;
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Directive decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var Directive = makeDecorator('Directive', {
    selector: undefined,
    inputs: undefined,
    outputs: undefined,
    host: undefined,
    providers: undefined,
    exportAs: undefined,
    queries: undefined
});
/**
 * Component decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var Component = makeDecorator('Component', {
    selector: undefined,
    inputs: undefined,
    outputs: undefined,
    host: undefined,
    exportAs: undefined,
    moduleId: undefined,
    providers: undefined,
    viewProviders: undefined,
    changeDetection: ChangeDetectionStrategy.Default,
    queries: undefined,
    templateUrl: undefined,
    template: undefined,
    styleUrls: undefined,
    styles: undefined,
    animations: undefined,
    encapsulation: undefined,
    interpolation: undefined,
    entryComponents: undefined
}, Directive);
/**
 * Pipe decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var Pipe = makeDecorator('Pipe', {
    name: undefined,
    pure: true,
});
/**
 * Input decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var Input = makePropDecorator('Input', [['bindingPropertyName', undefined]]);
/**
 * Output decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var Output = makePropDecorator('Output', [['bindingPropertyName', undefined]]);
/**
 * HostBinding decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var HostBinding = makePropDecorator('HostBinding', [['hostPropertyName', undefined]]);
/**
 * HostBinding decorator and metadata.
 *
 * @stable
 * @Annotation
 */
var HostListener = makePropDecorator('HostListener', [['eventName', undefined], ['args', []]]);

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @stable
 */
var LifecycleHooks;
(function (LifecycleHooks) {
    LifecycleHooks[LifecycleHooks["OnInit"] = 0] = "OnInit";
    LifecycleHooks[LifecycleHooks["OnDestroy"] = 1] = "OnDestroy";
    LifecycleHooks[LifecycleHooks["DoCheck"] = 2] = "DoCheck";
    LifecycleHooks[LifecycleHooks["OnChanges"] = 3] = "OnChanges";
    LifecycleHooks[LifecycleHooks["AfterContentInit"] = 4] = "AfterContentInit";
    LifecycleHooks[LifecycleHooks["AfterContentChecked"] = 5] = "AfterContentChecked";
    LifecycleHooks[LifecycleHooks["AfterViewInit"] = 6] = "AfterViewInit";
    LifecycleHooks[LifecycleHooks["AfterViewChecked"] = 7] = "AfterViewChecked";
})(LifecycleHooks || (LifecycleHooks = {}));
var LIFECYCLE_HOOKS_VALUES = [
    LifecycleHooks.OnInit, LifecycleHooks.OnDestroy, LifecycleHooks.DoCheck, LifecycleHooks.OnChanges,
    LifecycleHooks.AfterContentInit, LifecycleHooks.AfterContentChecked, LifecycleHooks.AfterViewInit,
    LifecycleHooks.AfterViewChecked
];
/**
 * @whatItDoes Lifecycle hook that is called when any data-bound property of a directive changes.
 * @howToUse
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnChanges'}
 *
 * @description
 * `ngOnChanges` is called right after the data-bound properties have been checked and before view
 * and content children are checked if at least one of them has changed.
 * The `changes` parameter contains the changed properties.
 *
 * See {@linkDocs guide/lifecycle-hooks#onchanges "Lifecycle Hooks Guide"}.
 *
 * @stable
 */
var OnChanges = (function () {
    function OnChanges() {
    }
    return OnChanges;
}());
/**
 * @whatItDoes Lifecycle hook that is called after data-bound properties of a directive are
 * initialized.
 * @howToUse
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnInit'}
 *
 * @description
 * `ngOnInit` is called right after the directive's data-bound properties have been checked for the
 * first time, and before any of its children have been checked. It is invoked only once when the
 * directive is instantiated.
 *
 * See {@linkDocs guide/lifecycle-hooks "Lifecycle Hooks Guide"}.
 *
 * @stable
 */
var OnInit = (function () {
    function OnInit() {
    }
    return OnInit;
}());
/**
 * @whatItDoes Lifecycle hook that is called when Angular dirty checks a directive.
 * @howToUse
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='DoCheck'}
 *
 * @description
 * `ngDoCheck` gets called to check the changes in the directives in addition to the default
 * algorithm. The default change detection algorithm looks for differences by comparing
 * bound-property values by reference across change detection runs.
 *
 * Note that a directive typically should not use both `DoCheck` and {@link OnChanges} to respond to
 * changes on the same input, as `ngOnChanges` will continue to be called when the default change
 * detector detects changes.
 *
 * See {@link KeyValueDiffers} and {@link IterableDiffers} for implementing custom dirty checking
 * for collections.
 *
 * See {@linkDocs guide/lifecycle-hooks#docheck "Lifecycle Hooks Guide"}.
 *
 * @stable
 */
var DoCheck = (function () {
    function DoCheck() {
    }
    return DoCheck;
}());
/**
 * @whatItDoes Lifecycle hook that is called when a directive or pipe is destroyed.
 * @howToUse
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnDestroy'}
 *
 * @description
 * `ngOnDestroy` callback is typically used for any custom cleanup that needs to occur when the
 * instance is destroyed.
 *
 * See {@linkDocs guide/lifecycle-hooks "Lifecycle Hooks Guide"}.
 *
 * @stable
 */
var OnDestroy = (function () {
    function OnDestroy() {
    }
    return OnDestroy;
}());
/**
 *
 * @whatItDoes Lifecycle hook that is called after a directive's content has been fully
 * initialized.
 * @howToUse
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterContentInit'}
 *
 * @description
 * See {@linkDocs guide/lifecycle-hooks#aftercontent "Lifecycle Hooks Guide"}.
 *
 * @stable
 */
var AfterContentInit = (function () {
    function AfterContentInit() {
    }
    return AfterContentInit;
}());
/**
 * @whatItDoes Lifecycle hook that is called after every check of a directive's content.
 * @howToUse
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterContentChecked'}
 *
 * @description
 * See {@linkDocs guide/lifecycle-hooks#aftercontent "Lifecycle Hooks Guide"}.
 *
 * @stable
 */
var AfterContentChecked = (function () {
    function AfterContentChecked() {
    }
    return AfterContentChecked;
}());
/**
 * @whatItDoes Lifecycle hook that is called after a component's view has been fully
 * initialized.
 * @howToUse
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterViewInit'}
 *
 * @description
 * See {@linkDocs guide/lifecycle-hooks#afterview "Lifecycle Hooks Guide"}.
 *
 * @stable
 */
var AfterViewInit = (function () {
    function AfterViewInit() {
    }
    return AfterViewInit;
}());
/**
 * @whatItDoes Lifecycle hook that is called after every check of a component's view.
 * @howToUse
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterViewChecked'}
 *
 * @description
 * See {@linkDocs guide/lifecycle-hooks#afterview "Lifecycle Hooks Guide"}.
 *
 * @stable
 */
var AfterViewChecked = (function () {
    function AfterViewChecked() {
    }
    return AfterViewChecked;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Defines a schema that will allow:
 * - any non-angular elements with a `-` in their name,
 * - any properties on elements with a `-` in their name which is the common rule for custom
 * elements.
 *
 * @stable
 */
var CUSTOM_ELEMENTS_SCHEMA = {
    name: 'custom-elements'
};
/**
 * Defines a schema that will allow any property on any element.
 *
 * @experimental
 */
var NO_ERRORS_SCHEMA = {
    name: 'no-errors-schema'
};
/**
 * NgModule decorator and metadata
 *
 * @stable
 * @Annotation
 */
var NgModule = makeDecorator('NgModule', {
    providers: undefined,
    declarations: undefined,
    imports: undefined,
    exports: undefined,
    entryComponents: undefined,
    bootstrap: undefined,
    schemas: undefined,
    id: undefined,
});

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Defines template and style encapsulation options available for Component's {@link Component}.
 *
 * See {@link ViewMetadata#encapsulation}.
 * @stable
 */
var ViewEncapsulation;
(function (ViewEncapsulation) {
    /**
     * Emulate `Native` scoping of styles by adding an attribute containing surrogate id to the Host
     * Element and pre-processing the style rules provided via
     * {@link ViewMetadata#styles} or {@link ViewMetadata#stylesUrls}, and adding the new Host Element
     * attribute to all selectors.
     *
     * This is the default option.
     */
    ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
    /**
     * Use the native encapsulation mechanism of the renderer.
     *
     * For the DOM this means using [Shadow DOM](https://w3c.github.io/webcomponents/spec/shadow/) and
     * creating a ShadowRoot for Component's Host Element.
     */
    ViewEncapsulation[ViewEncapsulation["Native"] = 1] = "Native";
    /**
     * Don't provide any template or style encapsulation.
     */
    ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
})(ViewEncapsulation || (ViewEncapsulation = {}));
var VIEW_ENCAPSULATION_VALUES = [ViewEncapsulation.Emulated, ViewEncapsulation.Native, ViewEncapsulation.None];
/**
 * Metadata properties available for configuring Views.
 *
 * Each Angular component requires a single `@Component` and at least one `@View` annotation. The
 * `@View` annotation specifies the HTML template to use, and lists the directives that are active
 * within the template.
 *
 * When a component is instantiated, the template is loaded into the component's shadow root, and
 * the expressions and statements in the template are evaluated against the component.
 *
 * For details on the `@Component` annotation, see {@link Component}.
 *
 * ### Example
 *
 * ```
 * @Component({
 *   selector: 'greet',
 *   template: 'Hello {{name}}!',
 *   directives: [GreetUser, Bold]
 * })
 * class Greet {
 *   name: string;
 *
 *   constructor() {
 *     this.name = 'World';
 *   }
 * }
 * ```
 *
 * @deprecated Use Component instead.
 */
var ViewMetadata = (function () {
    function ViewMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, templateUrl = _b.templateUrl, template = _b.template, encapsulation = _b.encapsulation, styles = _b.styles, styleUrls = _b.styleUrls, animations = _b.animations, interpolation = _b.interpolation;
        this.templateUrl = templateUrl;
        this.template = template;
        this.styleUrls = styleUrls;
        this.styles = styles;
        this.encapsulation = encapsulation;
        this.animations = animations;
        this.interpolation = interpolation;
    }
    return ViewMetadata;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Public API for util

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Allows to refer to references which are not yet defined.
 *
 * For instance, `forwardRef` is used when the `token` which we need to refer to for the purposes of
 * DI is declared,
 * but not yet defined. It is also used when the `token` which we use when creating a query is not
 * yet defined.
 *
 * ### Example
 * {@example core/di/ts/forward_ref/forward_ref_spec.ts region='forward_ref'}
 * @experimental
 */
function forwardRef(forwardRefFn) {
    forwardRefFn.__forward_ref__ = forwardRef;
    forwardRefFn.toString = function () { return stringify(this()); };
    return forwardRefFn;
}
/**
 * Lazily retrieves the reference value from a forwardRef.
 *
 * Acts as the identity function when given a non-forward-ref value.
 *
 * ### Example ([live demo](http://plnkr.co/edit/GU72mJrk1fiodChcmiDR?p=preview))
 *
 * {@example core/di/ts/forward_ref/forward_ref_spec.ts region='resolve_forward_ref'}
 *
 * See: {@link forwardRef}
 * @experimental
 */
function resolveForwardRef(type) {
    if (isFunction(type) && type.hasOwnProperty('__forward_ref__') &&
        type.__forward_ref__ === forwardRef) {
        return type();
    }
    else {
        return type;
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function unimplemented() {
    throw new Error('unimplemented');
}
/**
 * @stable
 */
var BaseError = (function (_super) {
    __extends(BaseError, _super);
    function BaseError(message) {
        // Errors don't use current this, instead they create a new instance.
        // We have to do forward all of our api to the nativeInstance.
        var nativeError = _super.call(this, message);
        this._nativeError = nativeError;
    }
    Object.defineProperty(BaseError.prototype, "message", {
        get: function () { return this._nativeError.message; },
        set: function (message) { this._nativeError.message = message; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseError.prototype, "name", {
        get: function () { return this._nativeError.name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseError.prototype, "stack", {
        get: function () { return this._nativeError.stack; },
        set: function (value) { this._nativeError.stack = value; },
        enumerable: true,
        configurable: true
    });
    BaseError.prototype.toString = function () { return this._nativeError.toString(); };
    return BaseError;
}(Error));
/**
 * @stable
 */
var WrappedError = (function (_super) {
    __extends(WrappedError, _super);
    function WrappedError(message, error) {
        _super.call(this, message + " caused by: " + (error instanceof Error ? error.message : error));
        this.originalError = error;
    }
    Object.defineProperty(WrappedError.prototype, "stack", {
        get: function () {
            return (this.originalError instanceof Error ? this.originalError : this._nativeError)
                .stack;
        },
        enumerable: true,
        configurable: true
    });
    return WrappedError;
}(BaseError));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var _THROW_IF_NOT_FOUND = new Object();
var THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
var _NullInjector = (function () {
    function _NullInjector() {
    }
    _NullInjector.prototype.get = function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = _THROW_IF_NOT_FOUND; }
        if (notFoundValue === _THROW_IF_NOT_FOUND) {
            throw new Error("No provider for " + stringify(token) + "!");
        }
        return notFoundValue;
    };
    return _NullInjector;
}());
/**
 * @whatItDoes Injector interface
 * @howToUse
 * ```
 * const injector: Injector = ...;
 * injector.get(...);
 * ```
 *
 * @description
 * For more details, see the {@linkDocs guide/dependency-injection "Dependency Injection Guide"}.
 *
 * ### Example
 *
 * {@example core/di/ts/injector_spec.ts region='Injector'}
 *
 * `Injector` returns itself when given `Injector` as a token:
 * {@example core/di/ts/injector_spec.ts region='injectInjector'}
 *
 * @stable
 */
var Injector = (function () {
    function Injector() {
    }
    /**
     * Retrieves an instance from the injector based on the provided token.
     * If not found:
     * - Throws {@link NoProviderError} if no `notFoundValue` that is not equal to
     * Injector.THROW_IF_NOT_FOUND is given
     * - Returns the `notFoundValue` otherwise
     * ```
     */
    Injector.prototype.get = function (token, notFoundValue) { return unimplemented(); };
    Injector.THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
    Injector.NULL = new _NullInjector();
    return Injector;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var Map$1 = _global.Map;
var Set$1 = _global.Set;
// Safari and Internet Explorer do not support the iterable parameter to the
// Map constructor.  We work around that by manually adding the items.
var createMapFromPairs = (function () {
    try {
        if (new Map$1([[1, 2]]).size === 1) {
            return function createMapFromPairs(pairs) { return new Map$1(pairs); };
        }
    }
    catch (e) {
    }
    return function createMapAndPopulateFromPairs(pairs) {
        var map = new Map$1();
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            map.set(pair[0], pair[1]);
        }
        return map;
    };
})();
var createMapFromMap = (function () {
    try {
        if (new Map$1(new Map$1())) {
            return function createMapFromMap(m) { return new Map$1(m); };
        }
    }
    catch (e) {
    }
    return function createMapAndPopulateFromMap(m) {
        var map = new Map$1();
        m.forEach(function (v, k) { map.set(k, v); });
        return map;
    };
})();
var _clearValues = (function () {
    if ((new Map$1()).keys().next) {
        return function _clearValues(m) {
            var keyIterator = m.keys();
            var k;
            while (!((k = keyIterator.next()).done)) {
                m.set(k.value, null);
            }
        };
    }
    else {
        return function _clearValuesWithForeEach(m) {
            m.forEach(function (v, k) { m.set(k, null); });
        };
    }
})();
// Safari doesn't implement MapIterator.next(), which is used is Traceur's polyfill of Array.from
// TODO(mlaval): remove the work around once we have a working polyfill of Array.from
var _arrayFromMap = (function () {
    try {
        if ((new Map$1()).values().next) {
            return function createArrayFromMap(m, getValues) {
                return getValues ? Array.from(m.values()) : Array.from(m.keys());
            };
        }
    }
    catch (e) {
    }
    return function createArrayFromMapWithForeach(m, getValues) {
        var res = ListWrapper.createFixedSize(m.size), i = 0;
        m.forEach(function (v, k) {
            res[i] = getValues ? v : k;
            i++;
        });
        return res;
    };
})();
var MapWrapper = (function () {
    function MapWrapper() {
    }
    MapWrapper.clone = function (m) { return createMapFromMap(m); };
    MapWrapper.createFromStringMap = function (stringMap) {
        var result = new Map$1();
        for (var prop in stringMap) {
            result.set(prop, stringMap[prop]);
        }
        return result;
    };
    MapWrapper.toStringMap = function (m) {
        var r = {};
        m.forEach(function (v, k) { return r[k] = v; });
        return r;
    };
    MapWrapper.createFromPairs = function (pairs) { return createMapFromPairs(pairs); };
    MapWrapper.clearValues = function (m) { _clearValues(m); };
    MapWrapper.iterable = function (m) { return m; };
    MapWrapper.keys = function (m) { return _arrayFromMap(m, false); };
    MapWrapper.values = function (m) { return _arrayFromMap(m, true); };
    return MapWrapper;
}());
/**
 * Wraps Javascript Objects
 */
var StringMapWrapper = (function () {
    function StringMapWrapper() {
    }
    StringMapWrapper.create = function () {
        // Note: We are not using Object.create(null) here due to
        // performance!
        // http://jsperf.com/ng2-object-create-null
        return {};
    };
    StringMapWrapper.contains = function (map, key) {
        return map.hasOwnProperty(key);
    };
    StringMapWrapper.get = function (map, key) {
        return map.hasOwnProperty(key) ? map[key] : undefined;
    };
    StringMapWrapper.set = function (map, key, value) { map[key] = value; };
    StringMapWrapper.keys = function (map) { return Object.keys(map); };
    StringMapWrapper.values = function (map) {
        return Object.keys(map).map(function (k) { return map[k]; });
    };
    StringMapWrapper.isEmpty = function (map) {
        for (var prop in map) {
            return false;
        }
        return true;
    };
    StringMapWrapper.delete = function (map, key) { delete map[key]; };
    StringMapWrapper.forEach = function (map, callback) {
        for (var _i = 0, _a = Object.keys(map); _i < _a.length; _i++) {
            var k = _a[_i];
            callback(map[k], k);
        }
    };
    StringMapWrapper.merge = function (m1, m2) {
        var m = {};
        for (var _i = 0, _a = Object.keys(m1); _i < _a.length; _i++) {
            var k = _a[_i];
            m[k] = m1[k];
        }
        for (var _b = 0, _c = Object.keys(m2); _b < _c.length; _b++) {
            var k = _c[_b];
            m[k] = m2[k];
        }
        return m;
    };
    StringMapWrapper.equals = function (m1, m2) {
        var k1 = Object.keys(m1);
        var k2 = Object.keys(m2);
        if (k1.length != k2.length) {
            return false;
        }
        for (var i = 0; i < k1.length; i++) {
            var key = k1[i];
            if (m1[key] !== m2[key]) {
                return false;
            }
        }
        return true;
    };
    return StringMapWrapper;
}());
var ListWrapper = (function () {
    function ListWrapper() {
    }
    // JS has no way to express a statically fixed size list, but dart does so we
    // keep both methods.
    ListWrapper.createFixedSize = function (size) { return new Array(size); };
    ListWrapper.createGrowableSize = function (size) { return new Array(size); };
    ListWrapper.clone = function (array) { return array.slice(0); };
    ListWrapper.forEachWithIndex = function (array, fn) {
        for (var i = 0; i < array.length; i++) {
            fn(array[i], i);
        }
    };
    ListWrapper.first = function (array) {
        if (!array)
            return null;
        return array[0];
    };
    ListWrapper.last = function (array) {
        if (!array || array.length == 0)
            return null;
        return array[array.length - 1];
    };
    ListWrapper.indexOf = function (array, value, startIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        return array.indexOf(value, startIndex);
    };
    ListWrapper.contains = function (list, el) { return list.indexOf(el) !== -1; };
    ListWrapper.reversed = function (array) {
        var a = ListWrapper.clone(array);
        return a.reverse();
    };
    ListWrapper.concat = function (a, b) { return a.concat(b); };
    ListWrapper.insert = function (list, index, value) { list.splice(index, 0, value); };
    ListWrapper.removeAt = function (list, index) {
        var res = list[index];
        list.splice(index, 1);
        return res;
    };
    ListWrapper.removeAll = function (list, items) {
        for (var i = 0; i < items.length; ++i) {
            var index = list.indexOf(items[i]);
            list.splice(index, 1);
        }
    };
    ListWrapper.remove = function (list, el) {
        var index = list.indexOf(el);
        if (index > -1) {
            list.splice(index, 1);
            return true;
        }
        return false;
    };
    ListWrapper.clear = function (list) { list.length = 0; };
    ListWrapper.isEmpty = function (list) { return list.length == 0; };
    ListWrapper.fill = function (list, value, start, end) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = null; }
        list.fill(value, start, end === null ? list.length : end);
    };
    ListWrapper.equals = function (a, b) {
        if (a.length != b.length)
            return false;
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    };
    ListWrapper.slice = function (l, from, to) {
        if (from === void 0) { from = 0; }
        if (to === void 0) { to = null; }
        return l.slice(from, to === null ? undefined : to);
    };
    ListWrapper.splice = function (l, from, length) { return l.splice(from, length); };
    ListWrapper.sort = function (l, compareFn) {
        if (isPresent(compareFn)) {
            l.sort(compareFn);
        }
        else {
            l.sort();
        }
    };
    ListWrapper.toString = function (l) { return l.toString(); };
    ListWrapper.toJSON = function (l) { return JSON.stringify(l); };
    ListWrapper.maximum = function (list, predicate) {
        if (list.length == 0) {
            return null;
        }
        var solution = null;
        var maxValue = -Infinity;
        for (var index = 0; index < list.length; index++) {
            var candidate = list[index];
            if (isBlank(candidate)) {
                continue;
            }
            var candidateValue = predicate(candidate);
            if (candidateValue > maxValue) {
                solution = candidate;
                maxValue = candidateValue;
            }
        }
        return solution;
    };
    ListWrapper.flatten = function (list) {
        var target = [];
        _flattenArray(list, target);
        return target;
    };
    ListWrapper.addAll = function (list, source) {
        for (var i = 0; i < source.length; i++) {
            list.push(source[i]);
        }
    };
    return ListWrapper;
}());
function _flattenArray(source, target) {
    if (isPresent(source)) {
        for (var i = 0; i < source.length; i++) {
            var item = source[i];
            if (isArray(item)) {
                _flattenArray(item, target);
            }
            else {
                target.push(item);
            }
        }
    }
    return target;
}
function isListLikeIterable(obj) {
    if (!isJsObject(obj))
        return false;
    return isArray(obj) ||
        (!(obj instanceof Map$1) &&
            getSymbolIterator() in obj); // JS Iterable have a Symbol.iterator prop
}
function areIterablesEqual(a, b, comparator) {
    var iterator1 = a[getSymbolIterator()]();
    var iterator2 = b[getSymbolIterator()]();
    while (true) {
        var item1 = iterator1.next();
        var item2 = iterator2.next();
        if (item1.done && item2.done)
            return true;
        if (item1.done || item2.done)
            return false;
        if (!comparator(item1.value, item2.value))
            return false;
    }
}
function iterateListLike(obj, fn) {
    if (isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
            fn(obj[i]);
        }
    }
    else {
        var iterator = obj[getSymbolIterator()]();
        var item;
        while (!((item = iterator.next()).done)) {
            fn(item.value);
        }
    }
}
// Safari and Internet Explorer do not support the iterable parameter to the
// Set constructor.  We work around that by manually adding the items.
var createSetFromList = (function () {
    var test = new Set$1([1, 2, 3]);
    if (test.size === 3) {
        return function createSetFromList(lst) { return new Set$1(lst); };
    }
    else {
        return function createSetAndPopulateFromList(lst) {
            var res = new Set$1(lst);
            if (res.size !== lst.length) {
                for (var i = 0; i < lst.length; i++) {
                    res.add(lst[i]);
                }
            }
            return res;
        };
    }
})();
var SetWrapper = (function () {
    function SetWrapper() {
    }
    SetWrapper.createFromList = function (lst) { return createSetFromList(lst); };
    SetWrapper.has = function (s, key) { return s.has(key); };
    SetWrapper.delete = function (m, k) { m.delete(k); };
    return SetWrapper;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$1 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function findFirstClosedCycle(keys) {
    var res = [];
    for (var i = 0; i < keys.length; ++i) {
        if (ListWrapper.contains(res, keys[i])) {
            res.push(keys[i]);
            return res;
        }
        res.push(keys[i]);
    }
    return res;
}
function constructResolvingPath(keys) {
    if (keys.length > 1) {
        var reversed = findFirstClosedCycle(ListWrapper.reversed(keys));
        var tokenStrs = reversed.map(function (k) { return stringify(k.token); });
        return ' (' + tokenStrs.join(' -> ') + ')';
    }
    return '';
}
/**
 * Base class for all errors arising from misconfigured providers.
 * @stable
 */
var AbstractProviderError = (function (_super) {
    __extends$1(AbstractProviderError, _super);
    function AbstractProviderError(injector, key, constructResolvingMessage) {
        _super.call(this, 'DI Error');
        this.keys = [key];
        this.injectors = [injector];
        this.constructResolvingMessage = constructResolvingMessage;
        this.message = this.constructResolvingMessage(this.keys);
    }
    AbstractProviderError.prototype.addKey = function (injector, key) {
        this.injectors.push(injector);
        this.keys.push(key);
        this.message = this.constructResolvingMessage(this.keys);
    };
    return AbstractProviderError;
}(BaseError));
/**
 * Thrown when trying to retrieve a dependency by key from {@link Injector}, but the
 * {@link Injector} does not have a {@link Provider} for the given key.
 *
 * ### Example ([live demo](http://plnkr.co/edit/vq8D3FRB9aGbnWJqtEPE?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor(b:B) {}
 * }
 *
 * expect(() => Injector.resolveAndCreate([A])).toThrowError();
 * ```
 * @stable
 */
var NoProviderError = (function (_super) {
    __extends$1(NoProviderError, _super);
    function NoProviderError(injector, key) {
        _super.call(this, injector, key, function (keys) {
            var first = stringify(ListWrapper.first(keys).token);
            return "No provider for " + first + "!" + constructResolvingPath(keys);
        });
    }
    return NoProviderError;
}(AbstractProviderError));
/**
 * Thrown when dependencies form a cycle.
 *
 * ### Example ([live demo](http://plnkr.co/edit/wYQdNos0Tzql3ei1EV9j?p=info))
 *
 * ```typescript
 * var injector = Injector.resolveAndCreate([
 *   {provide: "one", useFactory: (two) => "two", deps: [[new Inject("two")]]},
 *   {provide: "two", useFactory: (one) => "one", deps: [[new Inject("one")]]}
 * ]);
 *
 * expect(() => injector.get("one")).toThrowError();
 * ```
 *
 * Retrieving `A` or `B` throws a `CyclicDependencyError` as the graph above cannot be constructed.
 * @stable
 */
var CyclicDependencyError = (function (_super) {
    __extends$1(CyclicDependencyError, _super);
    function CyclicDependencyError(injector, key) {
        _super.call(this, injector, key, function (keys) {
            return "Cannot instantiate cyclic dependency!" + constructResolvingPath(keys);
        });
    }
    return CyclicDependencyError;
}(AbstractProviderError));
/**
 * Thrown when a constructing type returns with an Error.
 *
 * The `InstantiationError` class contains the original error plus the dependency graph which caused
 * this object to be instantiated.
 *
 * ### Example ([live demo](http://plnkr.co/edit/7aWYdcqTQsP0eNqEdUAf?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor() {
 *     throw new Error('message');
 *   }
 * }
 *
 * var injector = Injector.resolveAndCreate([A]);

 * try {
 *   injector.get(A);
 * } catch (e) {
 *   expect(e instanceof InstantiationError).toBe(true);
 *   expect(e.originalException.message).toEqual("message");
 *   expect(e.originalStack).toBeDefined();
 * }
 * ```
 * @stable
 */
var InstantiationError = (function (_super) {
    __extends$1(InstantiationError, _super);
    function InstantiationError(injector, originalException, originalStack, key) {
        _super.call(this, 'DI Error', originalException);
        this.keys = [key];
        this.injectors = [injector];
    }
    InstantiationError.prototype.addKey = function (injector, key) {
        this.injectors.push(injector);
        this.keys.push(key);
    };
    Object.defineProperty(InstantiationError.prototype, "message", {
        get: function () {
            var first = stringify(ListWrapper.first(this.keys).token);
            return this.originalError.message + ": Error during instantiation of " + first + "!" + constructResolvingPath(this.keys) + ".";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InstantiationError.prototype, "causeKey", {
        get: function () { return this.keys[0]; },
        enumerable: true,
        configurable: true
    });
    return InstantiationError;
}(WrappedError));
/**
 * Thrown when an object other then {@link Provider} (or `Type`) is passed to {@link Injector}
 * creation.
 *
 * ### Example ([live demo](http://plnkr.co/edit/YatCFbPAMCL0JSSQ4mvH?p=preview))
 *
 * ```typescript
 * expect(() => Injector.resolveAndCreate(["not a type"])).toThrowError();
 * ```
 * @stable
 */
var InvalidProviderError = (function (_super) {
    __extends$1(InvalidProviderError, _super);
    function InvalidProviderError(provider) {
        _super.call(this, "Invalid provider - only instances of Provider and Type are allowed, got: " + provider);
    }
    return InvalidProviderError;
}(BaseError));
/**
 * Thrown when the class has no annotation information.
 *
 * Lack of annotation information prevents the {@link Injector} from determining which dependencies
 * need to be injected into the constructor.
 *
 * ### Example ([live demo](http://plnkr.co/edit/rHnZtlNS7vJOPQ6pcVkm?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor(b) {}
 * }
 *
 * expect(() => Injector.resolveAndCreate([A])).toThrowError();
 * ```
 *
 * This error is also thrown when the class not marked with {@link Injectable} has parameter types.
 *
 * ```typescript
 * class B {}
 *
 * class A {
 *   constructor(b:B) {} // no information about the parameter types of A is available at runtime.
 * }
 *
 * expect(() => Injector.resolveAndCreate([A,B])).toThrowError();
 * ```
 * @stable
 */
var NoAnnotationError = (function (_super) {
    __extends$1(NoAnnotationError, _super);
    function NoAnnotationError(typeOrFunc, params) {
        _super.call(this, NoAnnotationError._genMessage(typeOrFunc, params));
    }
    NoAnnotationError._genMessage = function (typeOrFunc, params) {
        var signature = [];
        for (var i = 0, ii = params.length; i < ii; i++) {
            var parameter = params[i];
            if (isBlank(parameter) || parameter.length == 0) {
                signature.push('?');
            }
            else {
                signature.push(parameter.map(stringify).join(' '));
            }
        }
        return 'Cannot resolve all parameters for \'' + stringify(typeOrFunc) + '\'(' +
            signature.join(', ') + '). ' +
            'Make sure that all the parameters are decorated with Inject or have valid type annotations and that \'' +
            stringify(typeOrFunc) + '\' is decorated with Injectable.';
    };
    return NoAnnotationError;
}(BaseError));
/**
 * Thrown when getting an object by index.
 *
 * ### Example ([live demo](http://plnkr.co/edit/bRs0SX2OTQiJzqvjgl8P?p=preview))
 *
 * ```typescript
 * class A {}
 *
 * var injector = Injector.resolveAndCreate([A]);
 *
 * expect(() => injector.getAt(100)).toThrowError();
 * ```
 * @stable
 */
var OutOfBoundsError = (function (_super) {
    __extends$1(OutOfBoundsError, _super);
    function OutOfBoundsError(index) {
        _super.call(this, "Index " + index + " is out-of-bounds.");
    }
    return OutOfBoundsError;
}(BaseError));
// TODO: add a working example after alpha38 is released
/**
 * Thrown when a multi provider and a regular provider are bound to the same token.
 *
 * ### Example
 *
 * ```typescript
 * expect(() => Injector.resolveAndCreate([
 *   { provide: "Strings", useValue: "string1", multi: true},
 *   { provide: "Strings", useValue: "string2", multi: false}
 * ])).toThrowError();
 * ```
 */
var MixingMultiProvidersWithRegularProvidersError = (function (_super) {
    __extends$1(MixingMultiProvidersWithRegularProvidersError, _super);
    function MixingMultiProvidersWithRegularProvidersError(provider1, provider2) {
        _super.call(this, 'Cannot mix multi providers and regular providers, got: ' + provider1.toString() + ' ' +
            provider2.toString());
    }
    return MixingMultiProvidersWithRegularProvidersError;
}(BaseError));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A unique object used for retrieving items from the {@link ReflectiveInjector}.
 *
 * Keys have:
 * - a system-wide unique `id`.
 * - a `token`.
 *
 * `Key` is used internally by {@link ReflectiveInjector} because its system-wide unique `id` allows
 * the
 * injector to store created objects in a more efficient way.
 *
 * `Key` should not be created directly. {@link ReflectiveInjector} creates keys automatically when
 * resolving
 * providers.
 * @experimental
 */
var ReflectiveKey = (function () {
    /**
     * Private
     */
    function ReflectiveKey(token, id) {
        this.token = token;
        this.id = id;
        if (isBlank(token)) {
            throw new Error('Token must be defined!');
        }
    }
    Object.defineProperty(ReflectiveKey.prototype, "displayName", {
        /**
         * Returns a stringified token.
         */
        get: function () { return stringify(this.token); },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves a `Key` for a token.
     */
    ReflectiveKey.get = function (token) {
        return _globalKeyRegistry.get(resolveForwardRef(token));
    };
    Object.defineProperty(ReflectiveKey, "numberOfKeys", {
        /**
         * @returns the number of keys registered in the system.
         */
        get: function () { return _globalKeyRegistry.numberOfKeys; },
        enumerable: true,
        configurable: true
    });
    return ReflectiveKey;
}());
/**
 * @internal
 */
var KeyRegistry = (function () {
    function KeyRegistry() {
        this._allKeys = new Map();
    }
    KeyRegistry.prototype.get = function (token) {
        if (token instanceof ReflectiveKey)
            return token;
        if (this._allKeys.has(token)) {
            return this._allKeys.get(token);
        }
        var newKey = new ReflectiveKey(token, ReflectiveKey.numberOfKeys);
        this._allKeys.set(token, newKey);
        return newKey;
    };
    Object.defineProperty(KeyRegistry.prototype, "numberOfKeys", {
        get: function () { return this._allKeys.size; },
        enumerable: true,
        configurable: true
    });
    return KeyRegistry;
}());
var _globalKeyRegistry = new KeyRegistry();

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @whatItDoes Represents a type that a Component or other object is instances of.
 *
 * @description
 *
 * An example of a `Type` is `MyCustomComponent` class, which in JavaScript is be represented by
 * the `MyCustomComponent` constructor function.
 *
 * @stable
 */
var Type = Function;

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ReflectionCapabilities = (function () {
    function ReflectionCapabilities(reflect) {
        this._reflect = reflect || _global.Reflect;
    }
    ReflectionCapabilities.prototype.isReflectionEnabled = function () { return true; };
    ReflectionCapabilities.prototype.factory = function (t) {
        var prototype = t.prototype;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var instance = Object.create(prototype);
            t.apply(instance, args);
            return instance;
        };
    };
    /** @internal */
    ReflectionCapabilities.prototype._zipTypesAndAnnotations = function (paramTypes /** TODO #9100 */, paramAnnotations /** TODO #9100 */) {
        var result;
        if (typeof paramTypes === 'undefined') {
            result = new Array(paramAnnotations.length);
        }
        else {
            result = new Array(paramTypes.length);
        }
        for (var i = 0; i < result.length; i++) {
            // TS outputs Object for parameters without types, while Traceur omits
            // the annotations. For now we preserve the Traceur behavior to aid
            // migration, but this can be revisited.
            if (typeof paramTypes === 'undefined') {
                result[i] = [];
            }
            else if (paramTypes[i] != Object) {
                result[i] = [paramTypes[i]];
            }
            else {
                result[i] = [];
            }
            if (isPresent(paramAnnotations) && isPresent(paramAnnotations[i])) {
                result[i] = result[i].concat(paramAnnotations[i]);
            }
        }
        return result;
    };
    ReflectionCapabilities.prototype.parameters = function (typeOrFunc) {
        // Prefer the direct API.
        if (isPresent(typeOrFunc.parameters)) {
            return typeOrFunc.parameters;
        }
        // API of tsickle for lowering decorators to properties on the class.
        if (isPresent(typeOrFunc.ctorParameters)) {
            var ctorParameters = typeOrFunc.ctorParameters;
            var paramTypes_1 = ctorParameters.map(function (ctorParam /** TODO #9100 */) { return ctorParam && ctorParam.type; });
            var paramAnnotations_1 = ctorParameters.map(function (ctorParam /** TODO #9100 */) {
                return ctorParam && convertTsickleDecoratorIntoMetadata(ctorParam.decorators);
            });
            return this._zipTypesAndAnnotations(paramTypes_1, paramAnnotations_1);
        }
        // API for metadata created by invoking the decorators.
        if (isPresent(this._reflect) && isPresent(this._reflect.getMetadata)) {
            var paramAnnotations = this._reflect.getMetadata('parameters', typeOrFunc);
            var paramTypes = this._reflect.getMetadata('design:paramtypes', typeOrFunc);
            if (isPresent(paramTypes) || isPresent(paramAnnotations)) {
                return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
            }
        }
        // The array has to be filled with `undefined` because holes would be skipped by `some`
        var parameters = new Array(typeOrFunc.length);
        parameters.fill(undefined);
        return parameters;
    };
    ReflectionCapabilities.prototype.annotations = function (typeOrFunc) {
        // Prefer the direct API.
        if (isPresent(typeOrFunc.annotations)) {
            var annotations = typeOrFunc.annotations;
            if (isFunction(annotations) && annotations.annotations) {
                annotations = annotations.annotations;
            }
            return annotations;
        }
        // API of tsickle for lowering decorators to properties on the class.
        if (isPresent(typeOrFunc.decorators)) {
            return convertTsickleDecoratorIntoMetadata(typeOrFunc.decorators);
        }
        // API for metadata created by invoking the decorators.
        if (isPresent(this._reflect) && isPresent(this._reflect.getMetadata)) {
            var annotations = this._reflect.getMetadata('annotations', typeOrFunc);
            if (isPresent(annotations))
                return annotations;
        }
        return [];
    };
    ReflectionCapabilities.prototype.propMetadata = function (typeOrFunc) {
        // Prefer the direct API.
        if (isPresent(typeOrFunc.propMetadata)) {
            var propMetadata = typeOrFunc.propMetadata;
            if (isFunction(propMetadata) && propMetadata.propMetadata) {
                propMetadata = propMetadata.propMetadata;
            }
            return propMetadata;
        }
        // API of tsickle for lowering decorators to properties on the class.
        if (isPresent(typeOrFunc.propDecorators)) {
            var propDecorators_1 = typeOrFunc.propDecorators;
            var propMetadata_1 = {};
            Object.keys(propDecorators_1).forEach(function (prop) {
                propMetadata_1[prop] = convertTsickleDecoratorIntoMetadata(propDecorators_1[prop]);
            });
            return propMetadata_1;
        }
        // API for metadata created by invoking the decorators.
        if (isPresent(this._reflect) && isPresent(this._reflect.getMetadata)) {
            var propMetadata = this._reflect.getMetadata('propMetadata', typeOrFunc);
            if (isPresent(propMetadata))
                return propMetadata;
        }
        return {};
    };
    // Note: JavaScript does not support to query for interfaces during runtime.
    // However, we can't throw here as the reflector will always call this method
    // when asked for a lifecycle interface as this is what we check in Dart.
    ReflectionCapabilities.prototype.interfaces = function (type) { return []; };
    ReflectionCapabilities.prototype.hasLifecycleHook = function (type, lcInterface, lcProperty) {
        if (!(type instanceof Type))
            return false;
        var proto = type.prototype;
        return !!proto[lcProperty];
    };
    ReflectionCapabilities.prototype.getter = function (name) { return new Function('o', 'return o.' + name + ';'); };
    ReflectionCapabilities.prototype.setter = function (name) {
        return new Function('o', 'v', 'return o.' + name + ' = v;');
    };
    ReflectionCapabilities.prototype.method = function (name) {
        var functionBody = "if (!o." + name + ") throw new Error('\"" + name + "\" is undefined');\n        return o." + name + ".apply(o, args);";
        return new Function('o', 'args', functionBody);
    };
    // There is not a concept of import uri in Js, but this is useful in developing Dart applications.
    ReflectionCapabilities.prototype.importUri = function (type) {
        // StaticSymbol
        if (typeof type === 'object' && type['filePath']) {
            return type['filePath'];
        }
        // Runtime type
        return "./" + stringify(type);
    };
    ReflectionCapabilities.prototype.resolveIdentifier = function (name, moduleUrl, runtime) { return runtime; };
    ReflectionCapabilities.prototype.resolveEnum = function (enumIdentifier, name) { return enumIdentifier[name]; };
    return ReflectionCapabilities;
}());
function convertTsickleDecoratorIntoMetadata(decoratorInvocations) {
    if (!decoratorInvocations) {
        return [];
    }
    return decoratorInvocations.map(function (decoratorInvocation) {
        var decoratorType = decoratorInvocation.type;
        var annotationCls = decoratorType.annotationCls;
        var annotationArgs = decoratorInvocation.args ? decoratorInvocation.args : [];
        return new (annotationCls.bind.apply(annotationCls, [void 0].concat(annotationArgs)))();
    });
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Provides read-only access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 */
var ReflectorReader = (function () {
    function ReflectorReader() {
    }
    return ReflectorReader;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$2 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Reflective information about a symbol, including annotations, interfaces, and other metadata.
 */

/**
 * Provides access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 */
var Reflector = (function (_super) {
    __extends$2(Reflector, _super);
    function Reflector(reflectionCapabilities) {
        _super.call(this);
        /** @internal */
        this._injectableInfo = new Map$1();
        /** @internal */
        this._getters = new Map$1();
        /** @internal */
        this._setters = new Map$1();
        /** @internal */
        this._methods = new Map$1();
        this._usedKeys = null;
        this.reflectionCapabilities = reflectionCapabilities;
    }
    Reflector.prototype.updateCapabilities = function (caps) { this.reflectionCapabilities = caps; };
    Reflector.prototype.isReflectionEnabled = function () { return this.reflectionCapabilities.isReflectionEnabled(); };
    /**
     * Causes `this` reflector to track keys used to access
     * {@link ReflectionInfo} objects.
     */
    Reflector.prototype.trackUsage = function () { this._usedKeys = new Set$1(); };
    /**
     * Lists types for which reflection information was not requested since
     * {@link #trackUsage} was called. This list could later be audited as
     * potential dead code.
     */
    Reflector.prototype.listUnusedKeys = function () {
        var _this = this;
        if (this._usedKeys == null) {
            throw new Error('Usage tracking is disabled');
        }
        var allTypes = MapWrapper.keys(this._injectableInfo);
        return allTypes.filter(function (key) { return !SetWrapper.has(_this._usedKeys, key); });
    };
    Reflector.prototype.registerFunction = function (func, funcInfo) {
        this._injectableInfo.set(func, funcInfo);
    };
    Reflector.prototype.registerType = function (type, typeInfo) {
        this._injectableInfo.set(type, typeInfo);
    };
    Reflector.prototype.registerGetters = function (getters) { _mergeMaps(this._getters, getters); };
    Reflector.prototype.registerSetters = function (setters) { _mergeMaps(this._setters, setters); };
    Reflector.prototype.registerMethods = function (methods) { _mergeMaps(this._methods, methods); };
    Reflector.prototype.factory = function (type) {
        if (this._containsReflectionInfo(type)) {
            var res = this._getReflectionInfo(type).factory;
            return isPresent(res) ? res : null;
        }
        else {
            return this.reflectionCapabilities.factory(type);
        }
    };
    Reflector.prototype.parameters = function (typeOrFunc) {
        if (this._injectableInfo.has(typeOrFunc)) {
            var res = this._getReflectionInfo(typeOrFunc).parameters;
            return isPresent(res) ? res : [];
        }
        else {
            return this.reflectionCapabilities.parameters(typeOrFunc);
        }
    };
    Reflector.prototype.annotations = function (typeOrFunc) {
        if (this._injectableInfo.has(typeOrFunc)) {
            var res = this._getReflectionInfo(typeOrFunc).annotations;
            return isPresent(res) ? res : [];
        }
        else {
            return this.reflectionCapabilities.annotations(typeOrFunc);
        }
    };
    Reflector.prototype.propMetadata = function (typeOrFunc) {
        if (this._injectableInfo.has(typeOrFunc)) {
            var res = this._getReflectionInfo(typeOrFunc).propMetadata;
            return isPresent(res) ? res : {};
        }
        else {
            return this.reflectionCapabilities.propMetadata(typeOrFunc);
        }
    };
    Reflector.prototype.interfaces = function (type) {
        if (this._injectableInfo.has(type)) {
            var res = this._getReflectionInfo(type).interfaces;
            return isPresent(res) ? res : [];
        }
        else {
            return this.reflectionCapabilities.interfaces(type);
        }
    };
    Reflector.prototype.hasLifecycleHook = function (type, lcInterface, lcProperty) {
        var interfaces = this.interfaces(type);
        if (interfaces.indexOf(lcInterface) !== -1) {
            return true;
        }
        else {
            return this.reflectionCapabilities.hasLifecycleHook(type, lcInterface, lcProperty);
        }
    };
    Reflector.prototype.getter = function (name) {
        if (this._getters.has(name)) {
            return this._getters.get(name);
        }
        else {
            return this.reflectionCapabilities.getter(name);
        }
    };
    Reflector.prototype.setter = function (name) {
        if (this._setters.has(name)) {
            return this._setters.get(name);
        }
        else {
            return this.reflectionCapabilities.setter(name);
        }
    };
    Reflector.prototype.method = function (name) {
        if (this._methods.has(name)) {
            return this._methods.get(name);
        }
        else {
            return this.reflectionCapabilities.method(name);
        }
    };
    /** @internal */
    Reflector.prototype._getReflectionInfo = function (typeOrFunc) {
        if (isPresent(this._usedKeys)) {
            this._usedKeys.add(typeOrFunc);
        }
        return this._injectableInfo.get(typeOrFunc);
    };
    /** @internal */
    Reflector.prototype._containsReflectionInfo = function (typeOrFunc) { return this._injectableInfo.has(typeOrFunc); };
    Reflector.prototype.importUri = function (type) { return this.reflectionCapabilities.importUri(type); };
    Reflector.prototype.resolveIdentifier = function (name, moduleUrl, runtime) {
        return this.reflectionCapabilities.resolveIdentifier(name, moduleUrl, runtime);
    };
    Reflector.prototype.resolveEnum = function (identifier, name) {
        return this.reflectionCapabilities.resolveEnum(identifier, name);
    };
    return Reflector;
}(ReflectorReader));
function _mergeMaps(target, config) {
    StringMapWrapper.forEach(config, function (v, k) { return target.set(k, v); });
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * The {@link Reflector} used internally in Angular to access metadata
 * about symbols.
 */
var reflector = new Reflector(new ReflectionCapabilities());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * `Dependency` is used by the framework to extend DI.
 * This is internal to Angular and should not be used directly.
 */
var ReflectiveDependency = (function () {
    function ReflectiveDependency(key, optional, lowerBoundVisibility, upperBoundVisibility, properties) {
        this.key = key;
        this.optional = optional;
        this.lowerBoundVisibility = lowerBoundVisibility;
        this.upperBoundVisibility = upperBoundVisibility;
        this.properties = properties;
    }
    ReflectiveDependency.fromKey = function (key) {
        return new ReflectiveDependency(key, false, null, null, []);
    };
    return ReflectiveDependency;
}());
var _EMPTY_LIST = [];
var ResolvedReflectiveProvider_ = (function () {
    function ResolvedReflectiveProvider_(key, resolvedFactories, multiProvider) {
        this.key = key;
        this.resolvedFactories = resolvedFactories;
        this.multiProvider = multiProvider;
    }
    Object.defineProperty(ResolvedReflectiveProvider_.prototype, "resolvedFactory", {
        get: function () { return this.resolvedFactories[0]; },
        enumerable: true,
        configurable: true
    });
    return ResolvedReflectiveProvider_;
}());
/**
 * An internal resolved representation of a factory function created by resolving {@link
 * Provider}.
 * @experimental
 */
var ResolvedReflectiveFactory = (function () {
    function ResolvedReflectiveFactory(
        /**
         * Factory function which can return an instance of an object represented by a key.
         */
        factory, 
        /**
         * Arguments (dependencies) to the `factory` function.
         */
        dependencies) {
        this.factory = factory;
        this.dependencies = dependencies;
    }
    return ResolvedReflectiveFactory;
}());
/**
 * Resolve a single provider.
 */
function resolveReflectiveFactory(provider) {
    var factoryFn;
    var resolvedDeps;
    if (isPresent(provider.useClass)) {
        var useClass = resolveForwardRef(provider.useClass);
        factoryFn = reflector.factory(useClass);
        resolvedDeps = _dependenciesFor(useClass);
    }
    else if (isPresent(provider.useExisting)) {
        factoryFn = function (aliasInstance) { return aliasInstance; };
        resolvedDeps = [ReflectiveDependency.fromKey(ReflectiveKey.get(provider.useExisting))];
    }
    else if (isPresent(provider.useFactory)) {
        factoryFn = provider.useFactory;
        resolvedDeps = constructDependencies(provider.useFactory, provider.deps);
    }
    else {
        factoryFn = function () { return provider.useValue; };
        resolvedDeps = _EMPTY_LIST;
    }
    return new ResolvedReflectiveFactory(factoryFn, resolvedDeps);
}
/**
 * Converts the {@link Provider} into {@link ResolvedProvider}.
 *
 * {@link Injector} internally only uses {@link ResolvedProvider}, {@link Provider} contains
 * convenience provider syntax.
 */
function resolveReflectiveProvider(provider) {
    return new ResolvedReflectiveProvider_(ReflectiveKey.get(provider.provide), [resolveReflectiveFactory(provider)], provider.multi);
}
/**
 * Resolve a list of Providers.
 */
function resolveReflectiveProviders(providers) {
    var normalized = _normalizeProviders(providers, []);
    var resolved = normalized.map(resolveReflectiveProvider);
    return MapWrapper.values(mergeResolvedReflectiveProviders(resolved, new Map()));
}
/**
 * Merges a list of ResolvedProviders into a list where
 * each key is contained exactly once and multi providers
 * have been merged.
 */
function mergeResolvedReflectiveProviders(providers, normalizedProvidersMap) {
    for (var i = 0; i < providers.length; i++) {
        var provider = providers[i];
        var existing = normalizedProvidersMap.get(provider.key.id);
        if (isPresent(existing)) {
            if (provider.multiProvider !== existing.multiProvider) {
                throw new MixingMultiProvidersWithRegularProvidersError(existing, provider);
            }
            if (provider.multiProvider) {
                for (var j = 0; j < provider.resolvedFactories.length; j++) {
                    existing.resolvedFactories.push(provider.resolvedFactories[j]);
                }
            }
            else {
                normalizedProvidersMap.set(provider.key.id, provider);
            }
        }
        else {
            var resolvedProvider;
            if (provider.multiProvider) {
                resolvedProvider = new ResolvedReflectiveProvider_(provider.key, ListWrapper.clone(provider.resolvedFactories), provider.multiProvider);
            }
            else {
                resolvedProvider = provider;
            }
            normalizedProvidersMap.set(provider.key.id, resolvedProvider);
        }
    }
    return normalizedProvidersMap;
}
function _normalizeProviders(providers, res) {
    providers.forEach(function (b) {
        if (b instanceof Type) {
            res.push({ provide: b, useClass: b });
        }
        else if (b && typeof b == 'object' && b.provide !== undefined) {
            res.push(b);
        }
        else if (b instanceof Array) {
            _normalizeProviders(b, res);
        }
        else {
            throw new InvalidProviderError(b);
        }
    });
    return res;
}
function constructDependencies(typeOrFunc, dependencies) {
    if (isBlank(dependencies)) {
        return _dependenciesFor(typeOrFunc);
    }
    else {
        var params = dependencies.map(function (t) { return [t]; });
        return dependencies.map(function (t) { return _extractToken(typeOrFunc, t, params); });
    }
}
function _dependenciesFor(typeOrFunc) {
    var params = reflector.parameters(typeOrFunc);
    if (isBlank(params))
        return [];
    if (params.some(isBlank)) {
        throw new NoAnnotationError(typeOrFunc, params);
    }
    return params.map(function (p) { return _extractToken(typeOrFunc, p, params); });
}
function _extractToken(typeOrFunc /** TODO #9100 */, metadata /** TODO #9100 */ /*any[] | any*/, params) {
    var depProps = [];
    var token = null;
    var optional = false;
    if (!isArray(metadata)) {
        if (metadata instanceof Inject) {
            return _createDependency(metadata.token, optional, null, null, depProps);
        }
        else {
            return _createDependency(metadata, optional, null, null, depProps);
        }
    }
    var lowerBoundVisibility = null;
    var upperBoundVisibility = null;
    for (var i = 0; i < metadata.length; ++i) {
        var paramMetadata = metadata[i];
        if (paramMetadata instanceof Type) {
            token = paramMetadata;
        }
        else if (paramMetadata instanceof Inject) {
            token = paramMetadata.token;
        }
        else if (paramMetadata instanceof Optional) {
            optional = true;
        }
        else if (paramMetadata instanceof Self) {
            upperBoundVisibility = paramMetadata;
        }
        else if (paramMetadata instanceof Host) {
            upperBoundVisibility = paramMetadata;
        }
        else if (paramMetadata instanceof SkipSelf) {
            lowerBoundVisibility = paramMetadata;
        }
    }
    token = resolveForwardRef(token);
    if (isPresent(token)) {
        return _createDependency(token, optional, lowerBoundVisibility, upperBoundVisibility, depProps);
    }
    else {
        throw new NoAnnotationError(typeOrFunc, params);
    }
}
function _createDependency(token /** TODO #9100 */, optional /** TODO #9100 */, lowerBoundVisibility /** TODO #9100 */, upperBoundVisibility /** TODO #9100 */, depProps /** TODO #9100 */) {
    return new ReflectiveDependency(ReflectiveKey.get(token), optional, lowerBoundVisibility, upperBoundVisibility, depProps);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Threshold for the dynamic version
var _MAX_CONSTRUCTION_COUNTER = 10;
var UNDEFINED = new Object();
var ReflectiveProtoInjectorInlineStrategy = (function () {
    function ReflectiveProtoInjectorInlineStrategy(protoEI, providers) {
        this.provider0 = null;
        this.provider1 = null;
        this.provider2 = null;
        this.provider3 = null;
        this.provider4 = null;
        this.provider5 = null;
        this.provider6 = null;
        this.provider7 = null;
        this.provider8 = null;
        this.provider9 = null;
        this.keyId0 = null;
        this.keyId1 = null;
        this.keyId2 = null;
        this.keyId3 = null;
        this.keyId4 = null;
        this.keyId5 = null;
        this.keyId6 = null;
        this.keyId7 = null;
        this.keyId8 = null;
        this.keyId9 = null;
        var length = providers.length;
        if (length > 0) {
            this.provider0 = providers[0];
            this.keyId0 = providers[0].key.id;
        }
        if (length > 1) {
            this.provider1 = providers[1];
            this.keyId1 = providers[1].key.id;
        }
        if (length > 2) {
            this.provider2 = providers[2];
            this.keyId2 = providers[2].key.id;
        }
        if (length > 3) {
            this.provider3 = providers[3];
            this.keyId3 = providers[3].key.id;
        }
        if (length > 4) {
            this.provider4 = providers[4];
            this.keyId4 = providers[4].key.id;
        }
        if (length > 5) {
            this.provider5 = providers[5];
            this.keyId5 = providers[5].key.id;
        }
        if (length > 6) {
            this.provider6 = providers[6];
            this.keyId6 = providers[6].key.id;
        }
        if (length > 7) {
            this.provider7 = providers[7];
            this.keyId7 = providers[7].key.id;
        }
        if (length > 8) {
            this.provider8 = providers[8];
            this.keyId8 = providers[8].key.id;
        }
        if (length > 9) {
            this.provider9 = providers[9];
            this.keyId9 = providers[9].key.id;
        }
    }
    ReflectiveProtoInjectorInlineStrategy.prototype.getProviderAtIndex = function (index) {
        if (index == 0)
            return this.provider0;
        if (index == 1)
            return this.provider1;
        if (index == 2)
            return this.provider2;
        if (index == 3)
            return this.provider3;
        if (index == 4)
            return this.provider4;
        if (index == 5)
            return this.provider5;
        if (index == 6)
            return this.provider6;
        if (index == 7)
            return this.provider7;
        if (index == 8)
            return this.provider8;
        if (index == 9)
            return this.provider9;
        throw new OutOfBoundsError(index);
    };
    ReflectiveProtoInjectorInlineStrategy.prototype.createInjectorStrategy = function (injector) {
        return new ReflectiveInjectorInlineStrategy(injector, this);
    };
    return ReflectiveProtoInjectorInlineStrategy;
}());
var ReflectiveProtoInjectorDynamicStrategy = (function () {
    function ReflectiveProtoInjectorDynamicStrategy(protoInj, providers) {
        this.providers = providers;
        var len = providers.length;
        this.keyIds = ListWrapper.createFixedSize(len);
        for (var i = 0; i < len; i++) {
            this.keyIds[i] = providers[i].key.id;
        }
    }
    ReflectiveProtoInjectorDynamicStrategy.prototype.getProviderAtIndex = function (index) {
        if (index < 0 || index >= this.providers.length) {
            throw new OutOfBoundsError(index);
        }
        return this.providers[index];
    };
    ReflectiveProtoInjectorDynamicStrategy.prototype.createInjectorStrategy = function (ei) {
        return new ReflectiveInjectorDynamicStrategy(this, ei);
    };
    return ReflectiveProtoInjectorDynamicStrategy;
}());
var ReflectiveProtoInjector = (function () {
    function ReflectiveProtoInjector(providers) {
        this.numberOfProviders = providers.length;
        this._strategy = providers.length > _MAX_CONSTRUCTION_COUNTER ?
            new ReflectiveProtoInjectorDynamicStrategy(this, providers) :
            new ReflectiveProtoInjectorInlineStrategy(this, providers);
    }
    ReflectiveProtoInjector.fromResolvedProviders = function (providers) {
        return new ReflectiveProtoInjector(providers);
    };
    ReflectiveProtoInjector.prototype.getProviderAtIndex = function (index) {
        return this._strategy.getProviderAtIndex(index);
    };
    return ReflectiveProtoInjector;
}());
var ReflectiveInjectorInlineStrategy = (function () {
    function ReflectiveInjectorInlineStrategy(injector, protoStrategy) {
        this.injector = injector;
        this.protoStrategy = protoStrategy;
        this.obj0 = UNDEFINED;
        this.obj1 = UNDEFINED;
        this.obj2 = UNDEFINED;
        this.obj3 = UNDEFINED;
        this.obj4 = UNDEFINED;
        this.obj5 = UNDEFINED;
        this.obj6 = UNDEFINED;
        this.obj7 = UNDEFINED;
        this.obj8 = UNDEFINED;
        this.obj9 = UNDEFINED;
    }
    ReflectiveInjectorInlineStrategy.prototype.resetConstructionCounter = function () { this.injector._constructionCounter = 0; };
    ReflectiveInjectorInlineStrategy.prototype.instantiateProvider = function (provider) {
        return this.injector._new(provider);
    };
    ReflectiveInjectorInlineStrategy.prototype.getObjByKeyId = function (keyId) {
        var p = this.protoStrategy;
        var inj = this.injector;
        if (p.keyId0 === keyId) {
            if (this.obj0 === UNDEFINED) {
                this.obj0 = inj._new(p.provider0);
            }
            return this.obj0;
        }
        if (p.keyId1 === keyId) {
            if (this.obj1 === UNDEFINED) {
                this.obj1 = inj._new(p.provider1);
            }
            return this.obj1;
        }
        if (p.keyId2 === keyId) {
            if (this.obj2 === UNDEFINED) {
                this.obj2 = inj._new(p.provider2);
            }
            return this.obj2;
        }
        if (p.keyId3 === keyId) {
            if (this.obj3 === UNDEFINED) {
                this.obj3 = inj._new(p.provider3);
            }
            return this.obj3;
        }
        if (p.keyId4 === keyId) {
            if (this.obj4 === UNDEFINED) {
                this.obj4 = inj._new(p.provider4);
            }
            return this.obj4;
        }
        if (p.keyId5 === keyId) {
            if (this.obj5 === UNDEFINED) {
                this.obj5 = inj._new(p.provider5);
            }
            return this.obj5;
        }
        if (p.keyId6 === keyId) {
            if (this.obj6 === UNDEFINED) {
                this.obj6 = inj._new(p.provider6);
            }
            return this.obj6;
        }
        if (p.keyId7 === keyId) {
            if (this.obj7 === UNDEFINED) {
                this.obj7 = inj._new(p.provider7);
            }
            return this.obj7;
        }
        if (p.keyId8 === keyId) {
            if (this.obj8 === UNDEFINED) {
                this.obj8 = inj._new(p.provider8);
            }
            return this.obj8;
        }
        if (p.keyId9 === keyId) {
            if (this.obj9 === UNDEFINED) {
                this.obj9 = inj._new(p.provider9);
            }
            return this.obj9;
        }
        return UNDEFINED;
    };
    ReflectiveInjectorInlineStrategy.prototype.getObjAtIndex = function (index) {
        if (index == 0)
            return this.obj0;
        if (index == 1)
            return this.obj1;
        if (index == 2)
            return this.obj2;
        if (index == 3)
            return this.obj3;
        if (index == 4)
            return this.obj4;
        if (index == 5)
            return this.obj5;
        if (index == 6)
            return this.obj6;
        if (index == 7)
            return this.obj7;
        if (index == 8)
            return this.obj8;
        if (index == 9)
            return this.obj9;
        throw new OutOfBoundsError(index);
    };
    ReflectiveInjectorInlineStrategy.prototype.getMaxNumberOfObjects = function () { return _MAX_CONSTRUCTION_COUNTER; };
    return ReflectiveInjectorInlineStrategy;
}());
var ReflectiveInjectorDynamicStrategy = (function () {
    function ReflectiveInjectorDynamicStrategy(protoStrategy, injector) {
        this.protoStrategy = protoStrategy;
        this.injector = injector;
        this.objs = ListWrapper.createFixedSize(protoStrategy.providers.length);
        ListWrapper.fill(this.objs, UNDEFINED);
    }
    ReflectiveInjectorDynamicStrategy.prototype.resetConstructionCounter = function () { this.injector._constructionCounter = 0; };
    ReflectiveInjectorDynamicStrategy.prototype.instantiateProvider = function (provider) {
        return this.injector._new(provider);
    };
    ReflectiveInjectorDynamicStrategy.prototype.getObjByKeyId = function (keyId) {
        var p = this.protoStrategy;
        for (var i = 0; i < p.keyIds.length; i++) {
            if (p.keyIds[i] === keyId) {
                if (this.objs[i] === UNDEFINED) {
                    this.objs[i] = this.injector._new(p.providers[i]);
                }
                return this.objs[i];
            }
        }
        return UNDEFINED;
    };
    ReflectiveInjectorDynamicStrategy.prototype.getObjAtIndex = function (index) {
        if (index < 0 || index >= this.objs.length) {
            throw new OutOfBoundsError(index);
        }
        return this.objs[index];
    };
    ReflectiveInjectorDynamicStrategy.prototype.getMaxNumberOfObjects = function () { return this.objs.length; };
    return ReflectiveInjectorDynamicStrategy;
}());
/**
 * A ReflectiveDependency injection container used for instantiating objects and resolving
 * dependencies.
 *
 * An `Injector` is a replacement for a `new` operator, which can automatically resolve the
 * constructor dependencies.
 *
 * In typical use, application code asks for the dependencies in the constructor and they are
 * resolved by the `Injector`.
 *
 * ### Example ([live demo](http://plnkr.co/edit/jzjec0?p=preview))
 *
 * The following example creates an `Injector` configured to create `Engine` and `Car`.
 *
 * ```typescript
 * @Injectable()
 * class Engine {
 * }
 *
 * @Injectable()
 * class Car {
 *   constructor(public engine:Engine) {}
 * }
 *
 * var injector = ReflectiveInjector.resolveAndCreate([Car, Engine]);
 * var car = injector.get(Car);
 * expect(car instanceof Car).toBe(true);
 * expect(car.engine instanceof Engine).toBe(true);
 * ```
 *
 * Notice, we don't use the `new` operator because we explicitly want to have the `Injector`
 * resolve all of the object's dependencies automatically.
 *
 * @stable
 */
var ReflectiveInjector = (function () {
    function ReflectiveInjector() {
    }
    /**
     * Turns an array of provider definitions into an array of resolved providers.
     *
     * A resolution is a process of flattening multiple nested arrays and converting individual
     * providers into an array of {@link ResolvedReflectiveProvider}s.
     *
     * ### Example ([live demo](http://plnkr.co/edit/AiXTHi?p=preview))
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var providers = ReflectiveInjector.resolve([Car, [[Engine]]]);
     *
     * expect(providers.length).toEqual(2);
     *
     * expect(providers[0] instanceof ResolvedReflectiveProvider).toBe(true);
     * expect(providers[0].key.displayName).toBe("Car");
     * expect(providers[0].dependencies.length).toEqual(1);
     * expect(providers[0].factory).toBeDefined();
     *
     * expect(providers[1].key.displayName).toBe("Engine");
     * });
     * ```
     *
     * See {@link ReflectiveInjector#fromResolvedProviders} for more info.
     */
    ReflectiveInjector.resolve = function (providers) {
        return resolveReflectiveProviders(providers);
    };
    /**
     * Resolves an array of providers and creates an injector from those providers.
     *
     * The passed-in providers can be an array of `Type`, {@link Provider},
     * or a recursive array of more providers.
     *
     * ### Example ([live demo](http://plnkr.co/edit/ePOccA?p=preview))
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = ReflectiveInjector.resolveAndCreate([Car, Engine]);
     * expect(injector.get(Car) instanceof Car).toBe(true);
     * ```
     *
     * This function is slower than the corresponding `fromResolvedProviders`
     * because it needs to resolve the passed-in providers first.
     * See {@link Injector#resolve} and {@link Injector#fromResolvedProviders}.
     */
    ReflectiveInjector.resolveAndCreate = function (providers, parent) {
        if (parent === void 0) { parent = null; }
        var ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
        return ReflectiveInjector.fromResolvedProviders(ResolvedReflectiveProviders, parent);
    };
    /**
     * Creates an injector from previously resolved providers.
     *
     * This API is the recommended way to construct injectors in performance-sensitive parts.
     *
     * ### Example ([live demo](http://plnkr.co/edit/KrSMci?p=preview))
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var providers = ReflectiveInjector.resolve([Car, Engine]);
     * var injector = ReflectiveInjector.fromResolvedProviders(providers);
     * expect(injector.get(Car) instanceof Car).toBe(true);
     * ```
     * @experimental
     */
    ReflectiveInjector.fromResolvedProviders = function (providers, parent) {
        if (parent === void 0) { parent = null; }
        return new ReflectiveInjector_(ReflectiveProtoInjector.fromResolvedProviders(providers), parent);
    };
    Object.defineProperty(ReflectiveInjector.prototype, "parent", {
        /**
         * Parent of this injector.
         *
         * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
         * -->
         *
         * ### Example ([live demo](http://plnkr.co/edit/eosMGo?p=preview))
         *
         * ```typescript
         * var parent = ReflectiveInjector.resolveAndCreate([]);
         * var child = parent.resolveAndCreateChild([]);
         * expect(child.parent).toBe(parent);
         * ```
         */
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    /**
     * Resolves an array of providers and creates a child injector from those providers.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * The passed-in providers can be an array of `Type`, {@link Provider},
     * or a recursive array of more providers.
     *
     * ### Example ([live demo](http://plnkr.co/edit/opB3T4?p=preview))
     *
     * ```typescript
     * class ParentProvider {}
     * class ChildProvider {}
     *
     * var parent = ReflectiveInjector.resolveAndCreate([ParentProvider]);
     * var child = parent.resolveAndCreateChild([ChildProvider]);
     *
     * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
     * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
     * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
     * ```
     *
     * This function is slower than the corresponding `createChildFromResolved`
     * because it needs to resolve the passed-in providers first.
     * See {@link Injector#resolve} and {@link Injector#createChildFromResolved}.
     */
    ReflectiveInjector.prototype.resolveAndCreateChild = function (providers) { return unimplemented(); };
    /**
     * Creates a child injector from previously resolved providers.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * This API is the recommended way to construct injectors in performance-sensitive parts.
     *
     * ### Example ([live demo](http://plnkr.co/edit/VhyfjN?p=preview))
     *
     * ```typescript
     * class ParentProvider {}
     * class ChildProvider {}
     *
     * var parentProviders = ReflectiveInjector.resolve([ParentProvider]);
     * var childProviders = ReflectiveInjector.resolve([ChildProvider]);
     *
     * var parent = ReflectiveInjector.fromResolvedProviders(parentProviders);
     * var child = parent.createChildFromResolved(childProviders);
     *
     * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
     * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
     * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
     * ```
     */
    ReflectiveInjector.prototype.createChildFromResolved = function (providers) {
        return unimplemented();
    };
    /**
     * Resolves a provider and instantiates an object in the context of the injector.
     *
     * The created object does not get cached by the injector.
     *
     * ### Example ([live demo](http://plnkr.co/edit/yvVXoB?p=preview))
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = ReflectiveInjector.resolveAndCreate([Engine]);
     *
     * var car = injector.resolveAndInstantiate(Car);
     * expect(car.engine).toBe(injector.get(Engine));
     * expect(car).not.toBe(injector.resolveAndInstantiate(Car));
     * ```
     */
    ReflectiveInjector.prototype.resolveAndInstantiate = function (provider) { return unimplemented(); };
    /**
     * Instantiates an object using a resolved provider in the context of the injector.
     *
     * The created object does not get cached by the injector.
     *
     * ### Example ([live demo](http://plnkr.co/edit/ptCImQ?p=preview))
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = ReflectiveInjector.resolveAndCreate([Engine]);
     * var carProvider = ReflectiveInjector.resolve([Car])[0];
     * var car = injector.instantiateResolved(carProvider);
     * expect(car.engine).toBe(injector.get(Engine));
     * expect(car).not.toBe(injector.instantiateResolved(carProvider));
     * ```
     */
    ReflectiveInjector.prototype.instantiateResolved = function (provider) { return unimplemented(); };
    return ReflectiveInjector;
}());
var ReflectiveInjector_ = (function () {
    /**
     * Private
     */
    function ReflectiveInjector_(_proto /* ProtoInjector */, _parent) {
        if (_parent === void 0) { _parent = null; }
        /** @internal */
        this._constructionCounter = 0;
        this._proto = _proto;
        this._parent = _parent;
        this._strategy = _proto._strategy.createInjectorStrategy(this);
    }
    ReflectiveInjector_.prototype.get = function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = THROW_IF_NOT_FOUND; }
        return this._getByKey(ReflectiveKey.get(token), null, null, notFoundValue);
    };
    ReflectiveInjector_.prototype.getAt = function (index) { return this._strategy.getObjAtIndex(index); };
    Object.defineProperty(ReflectiveInjector_.prototype, "parent", {
        get: function () { return this._parent; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReflectiveInjector_.prototype, "internalStrategy", {
        /**
         * @internal
         * Internal. Do not use.
         * We return `any` not to export the InjectorStrategy type.
         */
        get: function () { return this._strategy; },
        enumerable: true,
        configurable: true
    });
    ReflectiveInjector_.prototype.resolveAndCreateChild = function (providers) {
        var ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
        return this.createChildFromResolved(ResolvedReflectiveProviders);
    };
    ReflectiveInjector_.prototype.createChildFromResolved = function (providers) {
        var proto = new ReflectiveProtoInjector(providers);
        var inj = new ReflectiveInjector_(proto);
        inj._parent = this;
        return inj;
    };
    ReflectiveInjector_.prototype.resolveAndInstantiate = function (provider) {
        return this.instantiateResolved(ReflectiveInjector.resolve([provider])[0]);
    };
    ReflectiveInjector_.prototype.instantiateResolved = function (provider) {
        return this._instantiateProvider(provider);
    };
    /** @internal */
    ReflectiveInjector_.prototype._new = function (provider) {
        if (this._constructionCounter++ > this._strategy.getMaxNumberOfObjects()) {
            throw new CyclicDependencyError(this, provider.key);
        }
        return this._instantiateProvider(provider);
    };
    ReflectiveInjector_.prototype._instantiateProvider = function (provider) {
        if (provider.multiProvider) {
            var res = ListWrapper.createFixedSize(provider.resolvedFactories.length);
            for (var i = 0; i < provider.resolvedFactories.length; ++i) {
                res[i] = this._instantiate(provider, provider.resolvedFactories[i]);
            }
            return res;
        }
        else {
            return this._instantiate(provider, provider.resolvedFactories[0]);
        }
    };
    ReflectiveInjector_.prototype._instantiate = function (provider, ResolvedReflectiveFactory$$1) {
        var factory = ResolvedReflectiveFactory$$1.factory;
        var deps = ResolvedReflectiveFactory$$1.dependencies;
        var length = deps.length;
        var d0;
        var d1;
        var d2;
        var d3;
        var d4;
        var d5;
        var d6;
        var d7;
        var d8;
        var d9;
        var d10;
        var d11;
        var d12;
        var d13;
        var d14;
        var d15;
        var d16;
        var d17;
        var d18;
        var d19;
        try {
            d0 = length > 0 ? this._getByReflectiveDependency(provider, deps[0]) : null;
            d1 = length > 1 ? this._getByReflectiveDependency(provider, deps[1]) : null;
            d2 = length > 2 ? this._getByReflectiveDependency(provider, deps[2]) : null;
            d3 = length > 3 ? this._getByReflectiveDependency(provider, deps[3]) : null;
            d4 = length > 4 ? this._getByReflectiveDependency(provider, deps[4]) : null;
            d5 = length > 5 ? this._getByReflectiveDependency(provider, deps[5]) : null;
            d6 = length > 6 ? this._getByReflectiveDependency(provider, deps[6]) : null;
            d7 = length > 7 ? this._getByReflectiveDependency(provider, deps[7]) : null;
            d8 = length > 8 ? this._getByReflectiveDependency(provider, deps[8]) : null;
            d9 = length > 9 ? this._getByReflectiveDependency(provider, deps[9]) : null;
            d10 = length > 10 ? this._getByReflectiveDependency(provider, deps[10]) : null;
            d11 = length > 11 ? this._getByReflectiveDependency(provider, deps[11]) : null;
            d12 = length > 12 ? this._getByReflectiveDependency(provider, deps[12]) : null;
            d13 = length > 13 ? this._getByReflectiveDependency(provider, deps[13]) : null;
            d14 = length > 14 ? this._getByReflectiveDependency(provider, deps[14]) : null;
            d15 = length > 15 ? this._getByReflectiveDependency(provider, deps[15]) : null;
            d16 = length > 16 ? this._getByReflectiveDependency(provider, deps[16]) : null;
            d17 = length > 17 ? this._getByReflectiveDependency(provider, deps[17]) : null;
            d18 = length > 18 ? this._getByReflectiveDependency(provider, deps[18]) : null;
            d19 = length > 19 ? this._getByReflectiveDependency(provider, deps[19]) : null;
        }
        catch (e) {
            if (e instanceof AbstractProviderError || e instanceof InstantiationError) {
                e.addKey(this, provider.key);
            }
            throw e;
        }
        var obj;
        try {
            switch (length) {
                case 0:
                    obj = factory();
                    break;
                case 1:
                    obj = factory(d0);
                    break;
                case 2:
                    obj = factory(d0, d1);
                    break;
                case 3:
                    obj = factory(d0, d1, d2);
                    break;
                case 4:
                    obj = factory(d0, d1, d2, d3);
                    break;
                case 5:
                    obj = factory(d0, d1, d2, d3, d4);
                    break;
                case 6:
                    obj = factory(d0, d1, d2, d3, d4, d5);
                    break;
                case 7:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6);
                    break;
                case 8:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7);
                    break;
                case 9:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8);
                    break;
                case 10:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9);
                    break;
                case 11:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10);
                    break;
                case 12:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11);
                    break;
                case 13:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12);
                    break;
                case 14:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13);
                    break;
                case 15:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14);
                    break;
                case 16:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15);
                    break;
                case 17:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16);
                    break;
                case 18:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17);
                    break;
                case 19:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18);
                    break;
                case 20:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18, d19);
                    break;
                default:
                    throw new Error("Cannot instantiate '" + provider.key.displayName + "' because it has more than 20 dependencies");
            }
        }
        catch (e) {
            throw new InstantiationError(this, e, e.stack, provider.key);
        }
        return obj;
    };
    ReflectiveInjector_.prototype._getByReflectiveDependency = function (provider, dep) {
        return this._getByKey(dep.key, dep.lowerBoundVisibility, dep.upperBoundVisibility, dep.optional ? null : THROW_IF_NOT_FOUND);
    };
    ReflectiveInjector_.prototype._getByKey = function (key, lowerBoundVisibility, upperBoundVisibility, notFoundValue) {
        if (key === INJECTOR_KEY) {
            return this;
        }
        if (upperBoundVisibility instanceof Self) {
            return this._getByKeySelf(key, notFoundValue);
        }
        else {
            return this._getByKeyDefault(key, notFoundValue, lowerBoundVisibility);
        }
    };
    /** @internal */
    ReflectiveInjector_.prototype._throwOrNull = function (key, notFoundValue) {
        if (notFoundValue !== THROW_IF_NOT_FOUND) {
            return notFoundValue;
        }
        else {
            throw new NoProviderError(this, key);
        }
    };
    /** @internal */
    ReflectiveInjector_.prototype._getByKeySelf = function (key, notFoundValue) {
        var obj = this._strategy.getObjByKeyId(key.id);
        return (obj !== UNDEFINED) ? obj : this._throwOrNull(key, notFoundValue);
    };
    /** @internal */
    ReflectiveInjector_.prototype._getByKeyDefault = function (key, notFoundValue, lowerBoundVisibility) {
        var inj;
        if (lowerBoundVisibility instanceof SkipSelf) {
            inj = this._parent;
        }
        else {
            inj = this;
        }
        while (inj instanceof ReflectiveInjector_) {
            var inj_ = inj;
            var obj = inj_._strategy.getObjByKeyId(key.id);
            if (obj !== UNDEFINED)
                return obj;
            inj = inj_._parent;
        }
        if (inj !== null) {
            return inj.get(key.token, notFoundValue);
        }
        else {
            return this._throwOrNull(key, notFoundValue);
        }
    };
    Object.defineProperty(ReflectiveInjector_.prototype, "displayName", {
        get: function () {
            var providers = _mapProviders(this, function (b) { return ' "' + b.key.displayName + '" '; })
                .join(', ');
            return "ReflectiveInjector(providers: [" + providers + "])";
        },
        enumerable: true,
        configurable: true
    });
    ReflectiveInjector_.prototype.toString = function () { return this.displayName; };
    return ReflectiveInjector_;
}());
var INJECTOR_KEY = ReflectiveKey.get(Injector);
function _mapProviders(injector, fn) {
    var res = new Array(injector._proto.numberOfProviders);
    for (var i = 0; i < injector._proto.numberOfProviders; ++i) {
        res[i] = fn(injector._proto.getProviderAtIndex(i));
    }
    return res;
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * The `di` module provides dependency injection container services.
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Provides a hook for centralized exception handling.
 *
 * The default implementation of `ErrorHandler` prints error messages to the `Console`. To
 * intercept error handling,
 * write a custom exception handler that replaces this default as appropriate for your app.
 *
 * ### Example
 *
 * ```javascript
 *
 * class MyErrorHandler implements ErrorHandler {
 *   call(error, stackTrace = null, reason = null) {
 *     // do something with the exception
 *   }
 * }
 *
 * @NgModule({
 *   providers: [{provide: ErrorHandler, useClass: MyErrorHandler}]
 * })
 * class MyModule {}
 * ```
 * @stable
 */
var ErrorHandler = (function () {
    function ErrorHandler(rethrowError) {
        if (rethrowError === void 0) { rethrowError = true; }
        /**
         * @internal
         */
        this._console = console;
        this.rethrowError = rethrowError;
    }
    ErrorHandler.prototype.handleError = function (error) {
        var originalError = this._findOriginalError(error);
        var originalStack = this._findOriginalStack(error);
        var context = this._findContext(error);
        this._console.error("EXCEPTION: " + this._extractMessage(error));
        if (originalError) {
            this._console.error("ORIGINAL EXCEPTION: " + this._extractMessage(originalError));
        }
        if (originalStack) {
            this._console.error('ORIGINAL STACKTRACE:');
            this._console.error(originalStack);
        }
        if (context) {
            this._console.error('ERROR CONTEXT:');
            this._console.error(context);
        }
        // We rethrow exceptions, so operations like 'bootstrap' will result in an error
        // when an error happens. If we do not rethrow, bootstrap will always succeed.
        if (this.rethrowError)
            throw error;
    };
    /** @internal */
    ErrorHandler.prototype._extractMessage = function (error) {
        return error instanceof Error ? error.message : error.toString();
    };
    /** @internal */
    ErrorHandler.prototype._findContext = function (error) {
        if (error) {
            return error.context ? error.context :
                this._findContext(error.originalError);
        }
        else {
            return null;
        }
    };
    /** @internal */
    ErrorHandler.prototype._findOriginalError = function (error) {
        var e = error.originalError;
        while (e && e.originalError) {
            e = e.originalError;
        }
        return e;
    };
    /** @internal */
    ErrorHandler.prototype._findOriginalStack = function (error) {
        if (!(error instanceof Error))
            return null;
        var e = error;
        var stack = e.stack;
        while (e instanceof Error && e.originalError) {
            e = e.originalError;
            if (e instanceof Error && e.stack) {
                stack = e.stack;
            }
        }
        return stack;
    };
    return ErrorHandler;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A function that will be executed when an application is initialized.
 * @experimental
 */
var APP_INITIALIZER = new OpaqueToken('Application Initializer');
/**
 * A class that reflects the state of running {@link APP_INITIALIZER}s.
 *
 * @experimental
 */
var ApplicationInitStatus = (function () {
    function ApplicationInitStatus(appInits) {
        var _this = this;
        this._done = false;
        var asyncInitPromises = [];
        if (appInits) {
            for (var i = 0; i < appInits.length; i++) {
                var initResult = appInits[i]();
                if (isPromise(initResult)) {
                    asyncInitPromises.push(initResult);
                }
            }
        }
        this._donePromise = Promise.all(asyncInitPromises).then(function () { _this._done = true; });
        if (asyncInitPromises.length === 0) {
            this._done = true;
        }
    }
    Object.defineProperty(ApplicationInitStatus.prototype, "done", {
        get: function () { return this._done; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationInitStatus.prototype, "donePromise", {
        get: function () { return this._donePromise; },
        enumerable: true,
        configurable: true
    });
    ApplicationInitStatus.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ApplicationInitStatus.ctorParameters = [
        { type: Array, decorators: [{ type: Inject, args: [APP_INITIALIZER,] }, { type: Optional },] },
    ];
    return ApplicationInitStatus;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A DI Token representing a unique string id assigned to the application by Angular and used
 * primarily for prefixing application attributes and CSS styles when
 * {@link ViewEncapsulation#Emulated} is being used.
 *
 * If you need to avoid randomly generated value to be used as an application id, you can provide
 * a custom value via a DI provider <!-- TODO: provider --> configuring the root {@link Injector}
 * using this token.
 * @experimental
 */
var APP_ID = new OpaqueToken('AppId');
function _appIdRandomProviderFactory() {
    return "" + _randomChar() + _randomChar() + _randomChar();
}
/**
 * Providers that will generate a random APP_ID_TOKEN.
 * @experimental
 */
var APP_ID_RANDOM_PROVIDER = {
    provide: APP_ID,
    useFactory: _appIdRandomProviderFactory,
    deps: []
};
function _randomChar() {
    return StringWrapper.fromCharCode(97 + Math$1.floor(Math$1.random() * 25));
}
/**
 * A function that will be executed when a platform is initialized.
 * @experimental
 */
var PLATFORM_INITIALIZER = new OpaqueToken('Platform Initializer');
/**
 * All callbacks provided via this token will be called for every component that is bootstrapped.
 * Signature of the callback:
 *
 * `(componentRef: ComponentRef) => void`.
 *
 * @experimental
 */
var APP_BOOTSTRAP_LISTENER = new OpaqueToken('appBootstrapListener');
/**
 * A token which indicates the root directory of the application
 * @experimental
 */
var PACKAGE_ROOT_URL = new OpaqueToken('Application Packages Root URL');

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var Console = (function () {
    function Console() {
    }
    Console.prototype.log = function (message) { print(message); };
    // Note: for reporting errors use `DOM.logError()` as it is platform specific
    Console.prototype.warn = function (message) { warn(message); };
    Console.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Console.ctorParameters = [];
    return Console;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$4 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Indicates that a component is still being loaded in a synchronous compile.
 *
 * @stable
 */
var ComponentStillLoadingError = (function (_super) {
    __extends$4(ComponentStillLoadingError, _super);
    function ComponentStillLoadingError(compType) {
        _super.call(this, "Can't compile synchronously as " + stringify(compType) + " is still being loaded!");
        this.compType = compType;
    }
    return ComponentStillLoadingError;
}(BaseError));
/**
 * Combination of NgModuleFactory and ComponentFactorys.
 *
 * @experimental
 */
var ModuleWithComponentFactories = (function () {
    function ModuleWithComponentFactories(ngModuleFactory, componentFactories) {
        this.ngModuleFactory = ngModuleFactory;
        this.componentFactories = componentFactories;
    }
    return ModuleWithComponentFactories;
}());
function _throwError() {
    throw new Error("Runtime compiler is not loaded");
}
/**
 * Low-level service for running the angular compiler during runtime
 * to create {@link ComponentFactory}s, which
 * can later be used to create and render a Component instance.
 *
 * Each `@NgModule` provides an own `Compiler` to its injector,
 * that will use the directives/pipes of the ng module for compilation
 * of components.
 * @stable
 */
var Compiler = (function () {
    function Compiler() {
    }
    /**
     * Compiles the given NgModule and all of its components. All templates of the components listed
     * in `entryComponents`
     * have to be inlined. Otherwise throws a {@link ComponentStillLoadingError}.
     */
    Compiler.prototype.compileModuleSync = function (moduleType) { throw _throwError(); };
    /**
     * Compiles the given NgModule and all of its components
     */
    Compiler.prototype.compileModuleAsync = function (moduleType) { throw _throwError(); };
    /**
     * Same as {@link compileModuleSync} but also creates ComponentFactories for all components.
     */
    Compiler.prototype.compileModuleAndAllComponentsSync = function (moduleType) {
        throw _throwError();
    };
    /**
     * Same as {@link compileModuleAsync} but also creates ComponentFactories for all components.
     */
    Compiler.prototype.compileModuleAndAllComponentsAsync = function (moduleType) {
        throw _throwError();
    };
    /**
     * Clears all caches.
     */
    Compiler.prototype.clearCache = function () { };
    /**
     * Clears the cache for the given component/ngModule.
     */
    Compiler.prototype.clearCacheFor = function (type) { };
    return Compiler;
}());
/**
 * Token to provide CompilerOptions in the platform injector.
 *
 * @experimental
 */
var COMPILER_OPTIONS = new OpaqueToken('compilerOptions');
/**
 * A factory for creating a Compiler
 *
 * @experimental
 */
var CompilerFactory = (function () {
    function CompilerFactory() {
    }
    return CompilerFactory;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var DefaultIterableDifferFactory = (function () {
    function DefaultIterableDifferFactory() {
    }
    DefaultIterableDifferFactory.prototype.supports = function (obj) { return isListLikeIterable(obj); };
    DefaultIterableDifferFactory.prototype.create = function (cdRef, trackByFn) {
        return new DefaultIterableDiffer(trackByFn);
    };
    return DefaultIterableDifferFactory;
}());
var trackByIdentity = function (index, item) { return item; };
/**
 * @stable
 */
var DefaultIterableDiffer = (function () {
    function DefaultIterableDiffer(_trackByFn) {
        this._trackByFn = _trackByFn;
        this._length = null;
        this._collection = null;
        // Keeps track of the used records at any point in time (during & across `_check()` calls)
        this._linkedRecords = null;
        // Keeps track of the removed records at any point in time during `_check()` calls.
        this._unlinkedRecords = null;
        this._previousItHead = null;
        this._itHead = null;
        this._itTail = null;
        this._additionsHead = null;
        this._additionsTail = null;
        this._movesHead = null;
        this._movesTail = null;
        this._removalsHead = null;
        this._removalsTail = null;
        // Keeps track of records where custom track by is the same, but item identity has changed
        this._identityChangesHead = null;
        this._identityChangesTail = null;
        this._trackByFn = isPresent(this._trackByFn) ? this._trackByFn : trackByIdentity;
    }
    Object.defineProperty(DefaultIterableDiffer.prototype, "collection", {
        get: function () { return this._collection; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefaultIterableDiffer.prototype, "length", {
        get: function () { return this._length; },
        enumerable: true,
        configurable: true
    });
    DefaultIterableDiffer.prototype.forEachItem = function (fn) {
        var record;
        for (record = this._itHead; record !== null; record = record._next) {
            fn(record);
        }
    };
    DefaultIterableDiffer.prototype.forEachOperation = function (fn) {
        var nextIt = this._itHead;
        var nextRemove = this._removalsHead;
        var addRemoveOffset = 0;
        var moveOffsets = null;
        while (nextIt || nextRemove) {
            // Figure out which is the next record to process
            // Order: remove, add, move
            var record = !nextRemove ||
                nextIt &&
                    nextIt.currentIndex < getPreviousIndex(nextRemove, addRemoveOffset, moveOffsets) ?
                nextIt :
                nextRemove;
            var adjPreviousIndex = getPreviousIndex(record, addRemoveOffset, moveOffsets);
            var currentIndex = record.currentIndex;
            // consume the item, and adjust the addRemoveOffset and update moveDistance if necessary
            if (record === nextRemove) {
                addRemoveOffset--;
                nextRemove = nextRemove._nextRemoved;
            }
            else {
                nextIt = nextIt._next;
                if (record.previousIndex == null) {
                    addRemoveOffset++;
                }
                else {
                    // INVARIANT:  currentIndex < previousIndex
                    if (!moveOffsets)
                        moveOffsets = [];
                    var localMovePreviousIndex = adjPreviousIndex - addRemoveOffset;
                    var localCurrentIndex = currentIndex - addRemoveOffset;
                    if (localMovePreviousIndex != localCurrentIndex) {
                        for (var i = 0; i < localMovePreviousIndex; i++) {
                            var offset = i < moveOffsets.length ? moveOffsets[i] : (moveOffsets[i] = 0);
                            var index = offset + i;
                            if (localCurrentIndex <= index && index < localMovePreviousIndex) {
                                moveOffsets[i] = offset + 1;
                            }
                        }
                        var previousIndex = record.previousIndex;
                        moveOffsets[previousIndex] = localCurrentIndex - localMovePreviousIndex;
                    }
                }
            }
            if (adjPreviousIndex !== currentIndex) {
                fn(record, adjPreviousIndex, currentIndex);
            }
        }
    };
    DefaultIterableDiffer.prototype.forEachPreviousItem = function (fn) {
        var record;
        for (record = this._previousItHead; record !== null; record = record._nextPrevious) {
            fn(record);
        }
    };
    DefaultIterableDiffer.prototype.forEachAddedItem = function (fn) {
        var record;
        for (record = this._additionsHead; record !== null; record = record._nextAdded) {
            fn(record);
        }
    };
    DefaultIterableDiffer.prototype.forEachMovedItem = function (fn) {
        var record;
        for (record = this._movesHead; record !== null; record = record._nextMoved) {
            fn(record);
        }
    };
    DefaultIterableDiffer.prototype.forEachRemovedItem = function (fn) {
        var record;
        for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
            fn(record);
        }
    };
    DefaultIterableDiffer.prototype.forEachIdentityChange = function (fn) {
        var record;
        for (record = this._identityChangesHead; record !== null; record = record._nextIdentityChange) {
            fn(record);
        }
    };
    DefaultIterableDiffer.prototype.diff = function (collection) {
        if (isBlank(collection))
            collection = [];
        if (!isListLikeIterable(collection)) {
            throw new Error("Error trying to diff '" + collection + "'");
        }
        if (this.check(collection)) {
            return this;
        }
        else {
            return null;
        }
    };
    DefaultIterableDiffer.prototype.onDestroy = function () { };
    // todo(vicb): optim for UnmodifiableListView (frozen arrays)
    DefaultIterableDiffer.prototype.check = function (collection) {
        var _this = this;
        this._reset();
        var record = this._itHead;
        var mayBeDirty = false;
        var index;
        var item;
        var itemTrackBy;
        if (isArray(collection)) {
            var list = collection;
            this._length = collection.length;
            for (index = 0; index < this._length; index++) {
                item = list[index];
                itemTrackBy = this._trackByFn(index, item);
                if (record === null || !looseIdentical(record.trackById, itemTrackBy)) {
                    record = this._mismatch(record, item, itemTrackBy, index);
                    mayBeDirty = true;
                }
                else {
                    if (mayBeDirty) {
                        // TODO(misko): can we limit this to duplicates only?
                        record = this._verifyReinsertion(record, item, itemTrackBy, index);
                    }
                    if (!looseIdentical(record.item, item))
                        this._addIdentityChange(record, item);
                }
                record = record._next;
            }
        }
        else {
            index = 0;
            iterateListLike(collection, function (item /** TODO #9100 */) {
                itemTrackBy = _this._trackByFn(index, item);
                if (record === null || !looseIdentical(record.trackById, itemTrackBy)) {
                    record = _this._mismatch(record, item, itemTrackBy, index);
                    mayBeDirty = true;
                }
                else {
                    if (mayBeDirty) {
                        // TODO(misko): can we limit this to duplicates only?
                        record = _this._verifyReinsertion(record, item, itemTrackBy, index);
                    }
                    if (!looseIdentical(record.item, item))
                        _this._addIdentityChange(record, item);
                }
                record = record._next;
                index++;
            });
            this._length = index;
        }
        this._truncate(record);
        this._collection = collection;
        return this.isDirty;
    };
    Object.defineProperty(DefaultIterableDiffer.prototype, "isDirty", {
        /* CollectionChanges is considered dirty if it has any additions, moves, removals, or identity
         * changes.
         */
        get: function () {
            return this._additionsHead !== null || this._movesHead !== null ||
                this._removalsHead !== null || this._identityChangesHead !== null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Reset the state of the change objects to show no changes. This means set previousKey to
     * currentKey, and clear all of the queues (additions, moves, removals).
     * Set the previousIndexes of moved and added items to their currentIndexes
     * Reset the list of additions, moves and removals
     *
     * @internal
     */
    DefaultIterableDiffer.prototype._reset = function () {
        if (this.isDirty) {
            var record;
            var nextRecord;
            for (record = this._previousItHead = this._itHead; record !== null; record = record._next) {
                record._nextPrevious = record._next;
            }
            for (record = this._additionsHead; record !== null; record = record._nextAdded) {
                record.previousIndex = record.currentIndex;
            }
            this._additionsHead = this._additionsTail = null;
            for (record = this._movesHead; record !== null; record = nextRecord) {
                record.previousIndex = record.currentIndex;
                nextRecord = record._nextMoved;
            }
            this._movesHead = this._movesTail = null;
            this._removalsHead = this._removalsTail = null;
            this._identityChangesHead = this._identityChangesTail = null;
        }
    };
    /**
     * This is the core function which handles differences between collections.
     *
     * - `record` is the record which we saw at this position last time. If null then it is a new
     *   item.
     * - `item` is the current item in the collection
     * - `index` is the position of the item in the collection
     *
     * @internal
     */
    DefaultIterableDiffer.prototype._mismatch = function (record, item, itemTrackBy, index) {
        // The previous record after which we will append the current one.
        var previousRecord;
        if (record === null) {
            previousRecord = this._itTail;
        }
        else {
            previousRecord = record._prev;
            // Remove the record from the collection since we know it does not match the item.
            this._remove(record);
        }
        // Attempt to see if we have seen the item before.
        record = this._linkedRecords === null ? null : this._linkedRecords.get(itemTrackBy, index);
        if (record !== null) {
            // We have seen this before, we need to move it forward in the collection.
            // But first we need to check if identity changed, so we can update in view if necessary
            if (!looseIdentical(record.item, item))
                this._addIdentityChange(record, item);
            this._moveAfter(record, previousRecord, index);
        }
        else {
            // Never seen it, check evicted list.
            record = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy);
            if (record !== null) {
                // It is an item which we have evicted earlier: reinsert it back into the list.
                // But first we need to check if identity changed, so we can update in view if necessary
                if (!looseIdentical(record.item, item))
                    this._addIdentityChange(record, item);
                this._reinsertAfter(record, previousRecord, index);
            }
            else {
                // It is a new item: add it.
                record =
                    this._addAfter(new CollectionChangeRecord(item, itemTrackBy), previousRecord, index);
            }
        }
        return record;
    };
    /**
     * This check is only needed if an array contains duplicates. (Short circuit of nothing dirty)
     *
     * Use case: `[a, a]` => `[b, a, a]`
     *
     * If we did not have this check then the insertion of `b` would:
     *   1) evict first `a`
     *   2) insert `b` at `0` index.
     *   3) leave `a` at index `1` as is. <-- this is wrong!
     *   3) reinsert `a` at index 2. <-- this is wrong!
     *
     * The correct behavior is:
     *   1) evict first `a`
     *   2) insert `b` at `0` index.
     *   3) reinsert `a` at index 1.
     *   3) move `a` at from `1` to `2`.
     *
     *
     * Double check that we have not evicted a duplicate item. We need to check if the item type may
     * have already been removed:
     * The insertion of b will evict the first 'a'. If we don't reinsert it now it will be reinserted
     * at the end. Which will show up as the two 'a's switching position. This is incorrect, since a
     * better way to think of it is as insert of 'b' rather then switch 'a' with 'b' and then add 'a'
     * at the end.
     *
     * @internal
     */
    DefaultIterableDiffer.prototype._verifyReinsertion = function (record, item, itemTrackBy, index) {
        var reinsertRecord = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy);
        if (reinsertRecord !== null) {
            record = this._reinsertAfter(reinsertRecord, record._prev, index);
        }
        else if (record.currentIndex != index) {
            record.currentIndex = index;
            this._addToMoves(record, index);
        }
        return record;
    };
    /**
     * Get rid of any excess {@link CollectionChangeRecord}s from the previous collection
     *
     * - `record` The first excess {@link CollectionChangeRecord}.
     *
     * @internal
     */
    DefaultIterableDiffer.prototype._truncate = function (record) {
        // Anything after that needs to be removed;
        while (record !== null) {
            var nextRecord = record._next;
            this._addToRemovals(this._unlink(record));
            record = nextRecord;
        }
        if (this._unlinkedRecords !== null) {
            this._unlinkedRecords.clear();
        }
        if (this._additionsTail !== null) {
            this._additionsTail._nextAdded = null;
        }
        if (this._movesTail !== null) {
            this._movesTail._nextMoved = null;
        }
        if (this._itTail !== null) {
            this._itTail._next = null;
        }
        if (this._removalsTail !== null) {
            this._removalsTail._nextRemoved = null;
        }
        if (this._identityChangesTail !== null) {
            this._identityChangesTail._nextIdentityChange = null;
        }
    };
    /** @internal */
    DefaultIterableDiffer.prototype._reinsertAfter = function (record, prevRecord, index) {
        if (this._unlinkedRecords !== null) {
            this._unlinkedRecords.remove(record);
        }
        var prev = record._prevRemoved;
        var next = record._nextRemoved;
        if (prev === null) {
            this._removalsHead = next;
        }
        else {
            prev._nextRemoved = next;
        }
        if (next === null) {
            this._removalsTail = prev;
        }
        else {
            next._prevRemoved = prev;
        }
        this._insertAfter(record, prevRecord, index);
        this._addToMoves(record, index);
        return record;
    };
    /** @internal */
    DefaultIterableDiffer.prototype._moveAfter = function (record, prevRecord, index) {
        this._unlink(record);
        this._insertAfter(record, prevRecord, index);
        this._addToMoves(record, index);
        return record;
    };
    /** @internal */
    DefaultIterableDiffer.prototype._addAfter = function (record, prevRecord, index) {
        this._insertAfter(record, prevRecord, index);
        if (this._additionsTail === null) {
            // todo(vicb)
            // assert(this._additionsHead === null);
            this._additionsTail = this._additionsHead = record;
        }
        else {
            // todo(vicb)
            // assert(_additionsTail._nextAdded === null);
            // assert(record._nextAdded === null);
            this._additionsTail = this._additionsTail._nextAdded = record;
        }
        return record;
    };
    /** @internal */
    DefaultIterableDiffer.prototype._insertAfter = function (record, prevRecord, index) {
        // todo(vicb)
        // assert(record != prevRecord);
        // assert(record._next === null);
        // assert(record._prev === null);
        var next = prevRecord === null ? this._itHead : prevRecord._next;
        // todo(vicb)
        // assert(next != record);
        // assert(prevRecord != record);
        record._next = next;
        record._prev = prevRecord;
        if (next === null) {
            this._itTail = record;
        }
        else {
            next._prev = record;
        }
        if (prevRecord === null) {
            this._itHead = record;
        }
        else {
            prevRecord._next = record;
        }
        if (this._linkedRecords === null) {
            this._linkedRecords = new _DuplicateMap();
        }
        this._linkedRecords.put(record);
        record.currentIndex = index;
        return record;
    };
    /** @internal */
    DefaultIterableDiffer.prototype._remove = function (record) {
        return this._addToRemovals(this._unlink(record));
    };
    /** @internal */
    DefaultIterableDiffer.prototype._unlink = function (record) {
        if (this._linkedRecords !== null) {
            this._linkedRecords.remove(record);
        }
        var prev = record._prev;
        var next = record._next;
        // todo(vicb)
        // assert((record._prev = null) === null);
        // assert((record._next = null) === null);
        if (prev === null) {
            this._itHead = next;
        }
        else {
            prev._next = next;
        }
        if (next === null) {
            this._itTail = prev;
        }
        else {
            next._prev = prev;
        }
        return record;
    };
    /** @internal */
    DefaultIterableDiffer.prototype._addToMoves = function (record, toIndex) {
        // todo(vicb)
        // assert(record._nextMoved === null);
        if (record.previousIndex === toIndex) {
            return record;
        }
        if (this._movesTail === null) {
            // todo(vicb)
            // assert(_movesHead === null);
            this._movesTail = this._movesHead = record;
        }
        else {
            // todo(vicb)
            // assert(_movesTail._nextMoved === null);
            this._movesTail = this._movesTail._nextMoved = record;
        }
        return record;
    };
    /** @internal */
    DefaultIterableDiffer.prototype._addToRemovals = function (record) {
        if (this._unlinkedRecords === null) {
            this._unlinkedRecords = new _DuplicateMap();
        }
        this._unlinkedRecords.put(record);
        record.currentIndex = null;
        record._nextRemoved = null;
        if (this._removalsTail === null) {
            // todo(vicb)
            // assert(_removalsHead === null);
            this._removalsTail = this._removalsHead = record;
            record._prevRemoved = null;
        }
        else {
            // todo(vicb)
            // assert(_removalsTail._nextRemoved === null);
            // assert(record._nextRemoved === null);
            record._prevRemoved = this._removalsTail;
            this._removalsTail = this._removalsTail._nextRemoved = record;
        }
        return record;
    };
    /** @internal */
    DefaultIterableDiffer.prototype._addIdentityChange = function (record, item) {
        record.item = item;
        if (this._identityChangesTail === null) {
            this._identityChangesTail = this._identityChangesHead = record;
        }
        else {
            this._identityChangesTail = this._identityChangesTail._nextIdentityChange = record;
        }
        return record;
    };
    DefaultIterableDiffer.prototype.toString = function () {
        var list = [];
        this.forEachItem(function (record /** TODO #9100 */) { return list.push(record); });
        var previous = [];
        this.forEachPreviousItem(function (record /** TODO #9100 */) { return previous.push(record); });
        var additions = [];
        this.forEachAddedItem(function (record /** TODO #9100 */) { return additions.push(record); });
        var moves = [];
        this.forEachMovedItem(function (record /** TODO #9100 */) { return moves.push(record); });
        var removals = [];
        this.forEachRemovedItem(function (record /** TODO #9100 */) { return removals.push(record); });
        var identityChanges = [];
        this.forEachIdentityChange(function (record /** TODO #9100 */) { return identityChanges.push(record); });
        return 'collection: ' + list.join(', ') + '\n' +
            'previous: ' + previous.join(', ') + '\n' +
            'additions: ' + additions.join(', ') + '\n' +
            'moves: ' + moves.join(', ') + '\n' +
            'removals: ' + removals.join(', ') + '\n' +
            'identityChanges: ' + identityChanges.join(', ') + '\n';
    };
    return DefaultIterableDiffer;
}());
/**
 * @stable
 */
var CollectionChangeRecord = (function () {
    function CollectionChangeRecord(item, trackById) {
        this.item = item;
        this.trackById = trackById;
        this.currentIndex = null;
        this.previousIndex = null;
        /** @internal */
        this._nextPrevious = null;
        /** @internal */
        this._prev = null;
        /** @internal */
        this._next = null;
        /** @internal */
        this._prevDup = null;
        /** @internal */
        this._nextDup = null;
        /** @internal */
        this._prevRemoved = null;
        /** @internal */
        this._nextRemoved = null;
        /** @internal */
        this._nextAdded = null;
        /** @internal */
        this._nextMoved = null;
        /** @internal */
        this._nextIdentityChange = null;
    }
    CollectionChangeRecord.prototype.toString = function () {
        return this.previousIndex === this.currentIndex ? stringify(this.item) :
            stringify(this.item) + '[' +
                stringify(this.previousIndex) + '->' + stringify(this.currentIndex) + ']';
    };
    return CollectionChangeRecord;
}());
// A linked list of CollectionChangeRecords with the same CollectionChangeRecord.item
var _DuplicateItemRecordList = (function () {
    function _DuplicateItemRecordList() {
        /** @internal */
        this._head = null;
        /** @internal */
        this._tail = null;
    }
    /**
     * Append the record to the list of duplicates.
     *
     * Note: by design all records in the list of duplicates hold the same value in record.item.
     */
    _DuplicateItemRecordList.prototype.add = function (record) {
        if (this._head === null) {
            this._head = this._tail = record;
            record._nextDup = null;
            record._prevDup = null;
        }
        else {
            // todo(vicb)
            // assert(record.item ==  _head.item ||
            //       record.item is num && record.item.isNaN && _head.item is num && _head.item.isNaN);
            this._tail._nextDup = record;
            record._prevDup = this._tail;
            record._nextDup = null;
            this._tail = record;
        }
    };
    // Returns a CollectionChangeRecord having CollectionChangeRecord.trackById == trackById and
    // CollectionChangeRecord.currentIndex >= afterIndex
    _DuplicateItemRecordList.prototype.get = function (trackById, afterIndex) {
        var record;
        for (record = this._head; record !== null; record = record._nextDup) {
            if ((afterIndex === null || afterIndex < record.currentIndex) &&
                looseIdentical(record.trackById, trackById)) {
                return record;
            }
        }
        return null;
    };
    /**
     * Remove one {@link CollectionChangeRecord} from the list of duplicates.
     *
     * Returns whether the list of duplicates is empty.
     */
    _DuplicateItemRecordList.prototype.remove = function (record) {
        // todo(vicb)
        // assert(() {
        //  // verify that the record being removed is in the list.
        //  for (CollectionChangeRecord cursor = _head; cursor != null; cursor = cursor._nextDup) {
        //    if (identical(cursor, record)) return true;
        //  }
        //  return false;
        //});
        var prev = record._prevDup;
        var next = record._nextDup;
        if (prev === null) {
            this._head = next;
        }
        else {
            prev._nextDup = next;
        }
        if (next === null) {
            this._tail = prev;
        }
        else {
            next._prevDup = prev;
        }
        return this._head === null;
    };
    return _DuplicateItemRecordList;
}());
var _DuplicateMap = (function () {
    function _DuplicateMap() {
        this.map = new Map();
    }
    _DuplicateMap.prototype.put = function (record) {
        // todo(vicb) handle corner cases
        var key = getMapKey(record.trackById);
        var duplicates = this.map.get(key);
        if (!isPresent(duplicates)) {
            duplicates = new _DuplicateItemRecordList();
            this.map.set(key, duplicates);
        }
        duplicates.add(record);
    };
    /**
     * Retrieve the `value` using key. Because the CollectionChangeRecord value may be one which we
     * have already iterated over, we use the afterIndex to pretend it is not there.
     *
     * Use case: `[a, b, c, a, a]` if we are at index `3` which is the second `a` then asking if we
     * have any more `a`s needs to return the last `a` not the first or second.
     */
    _DuplicateMap.prototype.get = function (trackById, afterIndex) {
        if (afterIndex === void 0) { afterIndex = null; }
        var key = getMapKey(trackById);
        var recordList = this.map.get(key);
        return isBlank(recordList) ? null : recordList.get(trackById, afterIndex);
    };
    /**
     * Removes a {@link CollectionChangeRecord} from the list of duplicates.
     *
     * The list of duplicates also is removed from the map if it gets empty.
     */
    _DuplicateMap.prototype.remove = function (record) {
        var key = getMapKey(record.trackById);
        // todo(vicb)
        // assert(this.map.containsKey(key));
        var recordList = this.map.get(key);
        // Remove the list of duplicates when it gets empty
        if (recordList.remove(record)) {
            this.map.delete(key);
        }
        return record;
    };
    Object.defineProperty(_DuplicateMap.prototype, "isEmpty", {
        get: function () { return this.map.size === 0; },
        enumerable: true,
        configurable: true
    });
    _DuplicateMap.prototype.clear = function () { this.map.clear(); };
    _DuplicateMap.prototype.toString = function () { return '_DuplicateMap(' + stringify(this.map) + ')'; };
    return _DuplicateMap;
}());
function getPreviousIndex(item, addRemoveOffset, moveOffsets) {
    var previousIndex = item.previousIndex;
    if (previousIndex === null)
        return previousIndex;
    var moveOffset = 0;
    if (moveOffsets && previousIndex < moveOffsets.length) {
        moveOffset = moveOffsets[previousIndex];
    }
    return previousIndex + addRemoveOffset + moveOffset;
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var DefaultKeyValueDifferFactory = (function () {
    function DefaultKeyValueDifferFactory() {
    }
    DefaultKeyValueDifferFactory.prototype.supports = function (obj) { return obj instanceof Map || isJsObject(obj); };
    DefaultKeyValueDifferFactory.prototype.create = function (cdRef) { return new DefaultKeyValueDiffer(); };
    return DefaultKeyValueDifferFactory;
}());
var DefaultKeyValueDiffer = (function () {
    function DefaultKeyValueDiffer() {
        this._records = new Map();
        this._mapHead = null;
        this._previousMapHead = null;
        this._changesHead = null;
        this._changesTail = null;
        this._additionsHead = null;
        this._additionsTail = null;
        this._removalsHead = null;
        this._removalsTail = null;
    }
    Object.defineProperty(DefaultKeyValueDiffer.prototype, "isDirty", {
        get: function () {
            return this._additionsHead !== null || this._changesHead !== null ||
                this._removalsHead !== null;
        },
        enumerable: true,
        configurable: true
    });
    DefaultKeyValueDiffer.prototype.forEachItem = function (fn) {
        var record;
        for (record = this._mapHead; record !== null; record = record._next) {
            fn(record);
        }
    };
    DefaultKeyValueDiffer.prototype.forEachPreviousItem = function (fn) {
        var record;
        for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
            fn(record);
        }
    };
    DefaultKeyValueDiffer.prototype.forEachChangedItem = function (fn) {
        var record;
        for (record = this._changesHead; record !== null; record = record._nextChanged) {
            fn(record);
        }
    };
    DefaultKeyValueDiffer.prototype.forEachAddedItem = function (fn) {
        var record;
        for (record = this._additionsHead; record !== null; record = record._nextAdded) {
            fn(record);
        }
    };
    DefaultKeyValueDiffer.prototype.forEachRemovedItem = function (fn) {
        var record;
        for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
            fn(record);
        }
    };
    DefaultKeyValueDiffer.prototype.diff = function (map) {
        if (!map) {
            map = new Map();
        }
        else if (!(map instanceof Map || isJsObject(map))) {
            throw new Error("Error trying to diff '" + map + "'");
        }
        return this.check(map) ? this : null;
    };
    DefaultKeyValueDiffer.prototype.onDestroy = function () { };
    DefaultKeyValueDiffer.prototype.check = function (map) {
        var _this = this;
        this._reset();
        var records = this._records;
        var oldSeqRecord = this._mapHead;
        var lastOldSeqRecord = null;
        var lastNewSeqRecord = null;
        var seqChanged = false;
        this._forEach(map, function (value, key) {
            var newSeqRecord;
            if (oldSeqRecord && key === oldSeqRecord.key) {
                newSeqRecord = oldSeqRecord;
                _this._maybeAddToChanges(newSeqRecord, value);
            }
            else {
                seqChanged = true;
                if (oldSeqRecord !== null) {
                    _this._removeFromSeq(lastOldSeqRecord, oldSeqRecord);
                    _this._addToRemovals(oldSeqRecord);
                }
                if (records.has(key)) {
                    newSeqRecord = records.get(key);
                    _this._maybeAddToChanges(newSeqRecord, value);
                }
                else {
                    newSeqRecord = new KeyValueChangeRecord(key);
                    records.set(key, newSeqRecord);
                    newSeqRecord.currentValue = value;
                    _this._addToAdditions(newSeqRecord);
                }
            }
            if (seqChanged) {
                if (_this._isInRemovals(newSeqRecord)) {
                    _this._removeFromRemovals(newSeqRecord);
                }
                if (lastNewSeqRecord == null) {
                    _this._mapHead = newSeqRecord;
                }
                else {
                    lastNewSeqRecord._next = newSeqRecord;
                }
            }
            lastOldSeqRecord = oldSeqRecord;
            lastNewSeqRecord = newSeqRecord;
            oldSeqRecord = oldSeqRecord && oldSeqRecord._next;
        });
        this._truncate(lastOldSeqRecord, oldSeqRecord);
        return this.isDirty;
    };
    /** @internal */
    DefaultKeyValueDiffer.prototype._reset = function () {
        if (this.isDirty) {
            var record = void 0;
            // Record the state of the mapping
            for (record = this._previousMapHead = this._mapHead; record !== null; record = record._next) {
                record._nextPrevious = record._next;
            }
            for (record = this._changesHead; record !== null; record = record._nextChanged) {
                record.previousValue = record.currentValue;
            }
            for (record = this._additionsHead; record != null; record = record._nextAdded) {
                record.previousValue = record.currentValue;
            }
            this._changesHead = this._changesTail = null;
            this._additionsHead = this._additionsTail = null;
            this._removalsHead = this._removalsTail = null;
        }
    };
    /** @internal */
    DefaultKeyValueDiffer.prototype._truncate = function (lastRecord, record) {
        while (record !== null) {
            if (lastRecord === null) {
                this._mapHead = null;
            }
            else {
                lastRecord._next = null;
            }
            var nextRecord = record._next;
            this._addToRemovals(record);
            lastRecord = record;
            record = nextRecord;
        }
        for (var rec = this._removalsHead; rec !== null; rec = rec._nextRemoved) {
            rec.previousValue = rec.currentValue;
            rec.currentValue = null;
            this._records.delete(rec.key);
        }
    };
    DefaultKeyValueDiffer.prototype._maybeAddToChanges = function (record, newValue) {
        if (!looseIdentical(newValue, record.currentValue)) {
            record.previousValue = record.currentValue;
            record.currentValue = newValue;
            this._addToChanges(record);
        }
    };
    /** @internal */
    DefaultKeyValueDiffer.prototype._isInRemovals = function (record) {
        return record === this._removalsHead || record._nextRemoved !== null ||
            record._prevRemoved !== null;
    };
    /** @internal */
    DefaultKeyValueDiffer.prototype._addToRemovals = function (record) {
        if (this._removalsHead === null) {
            this._removalsHead = this._removalsTail = record;
        }
        else {
            this._removalsTail._nextRemoved = record;
            record._prevRemoved = this._removalsTail;
            this._removalsTail = record;
        }
    };
    /** @internal */
    DefaultKeyValueDiffer.prototype._removeFromSeq = function (prev, record) {
        var next = record._next;
        if (prev === null) {
            this._mapHead = next;
        }
        else {
            prev._next = next;
        }
        record._next = null;
    };
    /** @internal */
    DefaultKeyValueDiffer.prototype._removeFromRemovals = function (record) {
        var prev = record._prevRemoved;
        var next = record._nextRemoved;
        if (prev === null) {
            this._removalsHead = next;
        }
        else {
            prev._nextRemoved = next;
        }
        if (next === null) {
            this._removalsTail = prev;
        }
        else {
            next._prevRemoved = prev;
        }
        record._prevRemoved = record._nextRemoved = null;
    };
    /** @internal */
    DefaultKeyValueDiffer.prototype._addToAdditions = function (record) {
        if (this._additionsHead === null) {
            this._additionsHead = this._additionsTail = record;
        }
        else {
            this._additionsTail._nextAdded = record;
            this._additionsTail = record;
        }
    };
    /** @internal */
    DefaultKeyValueDiffer.prototype._addToChanges = function (record) {
        if (this._changesHead === null) {
            this._changesHead = this._changesTail = record;
        }
        else {
            this._changesTail._nextChanged = record;
            this._changesTail = record;
        }
    };
    DefaultKeyValueDiffer.prototype.toString = function () {
        var items = [];
        var previous = [];
        var changes = [];
        var additions = [];
        var removals = [];
        var record;
        for (record = this._mapHead; record !== null; record = record._next) {
            items.push(stringify(record));
        }
        for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
            previous.push(stringify(record));
        }
        for (record = this._changesHead; record !== null; record = record._nextChanged) {
            changes.push(stringify(record));
        }
        for (record = this._additionsHead; record !== null; record = record._nextAdded) {
            additions.push(stringify(record));
        }
        for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
            removals.push(stringify(record));
        }
        return 'map: ' + items.join(', ') + '\n' +
            'previous: ' + previous.join(', ') + '\n' +
            'additions: ' + additions.join(', ') + '\n' +
            'changes: ' + changes.join(', ') + '\n' +
            'removals: ' + removals.join(', ') + '\n';
    };
    /** @internal */
    DefaultKeyValueDiffer.prototype._forEach = function (obj, fn) {
        if (obj instanceof Map) {
            obj.forEach(fn);
        }
        else {
            StringMapWrapper.forEach(obj, fn);
        }
    };
    return DefaultKeyValueDiffer;
}());
/**
 * @stable
 */
var KeyValueChangeRecord = (function () {
    function KeyValueChangeRecord(key) {
        this.key = key;
        this.previousValue = null;
        this.currentValue = null;
        /** @internal */
        this._nextPrevious = null;
        /** @internal */
        this._next = null;
        /** @internal */
        this._nextAdded = null;
        /** @internal */
        this._nextRemoved = null;
        /** @internal */
        this._prevRemoved = null;
        /** @internal */
        this._nextChanged = null;
    }
    KeyValueChangeRecord.prototype.toString = function () {
        return looseIdentical(this.previousValue, this.currentValue) ?
            stringify(this.key) :
            (stringify(this.key) + '[' + stringify(this.previousValue) + '->' +
                stringify(this.currentValue) + ']');
    };
    return KeyValueChangeRecord;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A repository of different iterable diffing strategies used by NgFor, NgClass, and others.
 * @stable
 */
var IterableDiffers = (function () {
    function IterableDiffers(factories) {
        this.factories = factories;
    }
    IterableDiffers.create = function (factories, parent) {
        if (isPresent(parent)) {
            var copied = ListWrapper.clone(parent.factories);
            factories = factories.concat(copied);
            return new IterableDiffers(factories);
        }
        else {
            return new IterableDiffers(factories);
        }
    };
    /**
     * Takes an array of {@link IterableDifferFactory} and returns a provider used to extend the
     * inherited {@link IterableDiffers} instance with the provided factories and return a new
     * {@link IterableDiffers} instance.
     *
     * The following example shows how to extend an existing list of factories,
           * which will only be applied to the injector for this component and its children.
           * This step is all that's required to make a new {@link IterableDiffer} available.
     *
     * ### Example
     *
     * ```
     * @Component({
     *   viewProviders: [
     *     IterableDiffers.extend([new ImmutableListDiffer()])
     *   ]
     * })
     * ```
     */
    IterableDiffers.extend = function (factories) {
        return {
            provide: IterableDiffers,
            useFactory: function (parent) {
                if (isBlank(parent)) {
                    // Typically would occur when calling IterableDiffers.extend inside of dependencies passed
                    // to
                    // bootstrap(), which would override default pipes instead of extending them.
                    throw new Error('Cannot extend IterableDiffers without a parent injector');
                }
                return IterableDiffers.create(factories, parent);
            },
            // Dependency technically isn't optional, but we can provide a better error message this way.
            deps: [[IterableDiffers, new SkipSelf(), new Optional()]]
        };
    };
    IterableDiffers.prototype.find = function (iterable) {
        var factory = this.factories.find(function (f) { return f.supports(iterable); });
        if (isPresent(factory)) {
            return factory;
        }
        else {
            throw new Error("Cannot find a differ supporting object '" + iterable + "' of type '" + getTypeNameForDebugging(iterable) + "'");
        }
    };
    return IterableDiffers;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A repository of different Map diffing strategies used by NgClass, NgStyle, and others.
 * @stable
 */
var KeyValueDiffers = (function () {
    function KeyValueDiffers(factories) {
        this.factories = factories;
    }
    KeyValueDiffers.create = function (factories, parent) {
        if (isPresent(parent)) {
            var copied = ListWrapper.clone(parent.factories);
            factories = factories.concat(copied);
            return new KeyValueDiffers(factories);
        }
        else {
            return new KeyValueDiffers(factories);
        }
    };
    /**
     * Takes an array of {@link KeyValueDifferFactory} and returns a provider used to extend the
     * inherited {@link KeyValueDiffers} instance with the provided factories and return a new
     * {@link KeyValueDiffers} instance.
     *
     * The following example shows how to extend an existing list of factories,
           * which will only be applied to the injector for this component and its children.
           * This step is all that's required to make a new {@link KeyValueDiffer} available.
     *
     * ### Example
     *
     * ```
     * @Component({
     *   viewProviders: [
     *     KeyValueDiffers.extend([new ImmutableMapDiffer()])
     *   ]
     * })
     * ```
     */
    KeyValueDiffers.extend = function (factories) {
        return {
            provide: KeyValueDiffers,
            useFactory: function (parent) {
                if (isBlank(parent)) {
                    // Typically would occur when calling KeyValueDiffers.extend inside of dependencies passed
                    // to
                    // bootstrap(), which would override default pipes instead of extending them.
                    throw new Error('Cannot extend KeyValueDiffers without a parent injector');
                }
                return KeyValueDiffers.create(factories, parent);
            },
            // Dependency technically isn't optional, but we can provide a better error message this way.
            deps: [[KeyValueDiffers, new SkipSelf(), new Optional()]]
        };
    };
    KeyValueDiffers.prototype.find = function (kv) {
        var factory = this.factories.find(function (f) { return f.supports(kv); });
        if (isPresent(factory)) {
            return factory;
        }
        else {
            throw new Error("Cannot find a differ supporting object '" + kv + "'");
        }
    };
    return KeyValueDiffers;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var UNINITIALIZED = {
    toString: function () { return 'CD_INIT_VALUE'; }
};
function devModeEqual(a, b) {
    if (isListLikeIterable(a) && isListLikeIterable(b)) {
        return areIterablesEqual(a, b, devModeEqual);
    }
    else if (!isListLikeIterable(a) && !isPrimitive(a) && !isListLikeIterable(b) && !isPrimitive(b)) {
        return true;
    }
    else {
        return looseIdentical(a, b);
    }
}
/**
 * Indicates that the result of a {@link Pipe} transformation has changed even though the
 * reference
 * has not changed.
 *
 * The wrapped value will be unwrapped by change detection, and the unwrapped value will be stored.
 *
 * Example:
 *
 * ```
 * if (this._latestValue === this._latestReturnedValue) {
 *    return this._latestReturnedValue;
 *  } else {
 *    this._latestReturnedValue = this._latestValue;
 *    return WrappedValue.wrap(this._latestValue); // this will force update
 *  }
 * ```
 * @stable
 */
var WrappedValue = (function () {
    function WrappedValue(wrapped) {
        this.wrapped = wrapped;
    }
    WrappedValue.wrap = function (value) { return new WrappedValue(value); };
    return WrappedValue;
}());
/**
 * Helper class for unwrapping WrappedValue s
 */
var ValueUnwrapper = (function () {
    function ValueUnwrapper() {
        this.hasWrappedValue = false;
    }
    ValueUnwrapper.prototype.unwrap = function (value) {
        if (value instanceof WrappedValue) {
            this.hasWrappedValue = true;
            return value.wrapped;
        }
        return value;
    };
    ValueUnwrapper.prototype.reset = function () { this.hasWrappedValue = false; };
    return ValueUnwrapper;
}());
/**
 * Represents a basic change from a previous to a new value.
 * @stable
 */
var SimpleChange = (function () {
    function SimpleChange(previousValue, currentValue) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
    }
    /**
     * Check whether the new value is the first value assigned.
     */
    SimpleChange.prototype.isFirstChange = function () { return this.previousValue === UNINITIALIZED; };
    return SimpleChange;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @stable
 */
var ChangeDetectorRef = (function () {
    function ChangeDetectorRef() {
    }
    return ChangeDetectorRef;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Structural diffing for `Object`s and `Map`s.
 */
var keyValDiff = [new DefaultKeyValueDifferFactory()];
/**
 * Structural diffing for `Iterable` types such as `Array`s.
 */
var iterableDiff = [new DefaultIterableDifferFactory()];
var defaultIterableDiffers = new IterableDiffers(iterableDiff);
var defaultKeyValueDiffers = new KeyValueDiffers(keyValDiff);

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @experimental
 */
// TODO (matsko): add typing for the animation function
var RenderComponentType = (function () {
    function RenderComponentType(id, templateUrl, slotCount, encapsulation, styles, animations) {
        this.id = id;
        this.templateUrl = templateUrl;
        this.slotCount = slotCount;
        this.encapsulation = encapsulation;
        this.styles = styles;
        this.animations = animations;
    }
    return RenderComponentType;
}());
var RenderDebugInfo = (function () {
    function RenderDebugInfo() {
    }
    Object.defineProperty(RenderDebugInfo.prototype, "injector", {
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderDebugInfo.prototype, "component", {
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderDebugInfo.prototype, "providerTokens", {
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderDebugInfo.prototype, "references", {
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderDebugInfo.prototype, "context", {
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderDebugInfo.prototype, "source", {
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    return RenderDebugInfo;
}());
/**
 * @experimental
 */
var Renderer = (function () {
    function Renderer() {
    }
    return Renderer;
}());
/**
 * Injectable service that provides a low-level interface for modifying the UI.
 *
 * Use this service to bypass Angular's templating and make custom UI changes that can't be
 * expressed declaratively. For example if you need to set a property or an attribute whose name is
 * not statically known, use {@link #setElementProperty} or {@link #setElementAttribute}
 * respectively.
 *
 * If you are implementing a custom renderer, you must implement this interface.
 *
 * The default Renderer implementation is `DomRenderer`. Also available is `WebWorkerRenderer`.
 * @experimental
 */
var RootRenderer = (function () {
    function RootRenderer() {
    }
    return RootRenderer;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A SecurityContext marks a location that has dangerous security implications, e.g. a DOM property
 * like `innerHTML` that could cause Cross Site Scripting (XSS) security bugs when improperly
 * handled.
 *
 * See DomSanitizer for more details on security in Angular applications.
 *
 * @stable
 */
var SecurityContext;
(function (SecurityContext) {
    SecurityContext[SecurityContext["NONE"] = 0] = "NONE";
    SecurityContext[SecurityContext["HTML"] = 1] = "HTML";
    SecurityContext[SecurityContext["STYLE"] = 2] = "STYLE";
    SecurityContext[SecurityContext["SCRIPT"] = 3] = "SCRIPT";
    SecurityContext[SecurityContext["URL"] = 4] = "URL";
    SecurityContext[SecurityContext["RESOURCE_URL"] = 5] = "RESOURCE_URL";
})(SecurityContext || (SecurityContext = {}));
/**
 * Sanitizer is used by the views to sanitize potentially dangerous values.
 *
 * @stable
 */
var Sanitizer = (function () {
    function Sanitizer() {
    }
    return Sanitizer;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A wrapper around a native element inside of a View.
 *
 * An `ElementRef` is backed by a render-specific element. In the browser, this is usually a DOM
 * element.
 *
 * @security Permitting direct access to the DOM can make your application more vulnerable to
 * XSS attacks. Carefully review any use of `ElementRef` in your code. For more detail, see the
 * [Security Guide](http://g.co/ng/security).
 *
 * @stable
 */
// Note: We don't expose things like `Injector`, `ViewContainer`, ... here,
// i.e. users have to ask for what they need. With that, we can build better analysis tools
// and could do better codegen in the future.
var ElementRef = (function () {
    function ElementRef(nativeElement) {
        this.nativeElement = nativeElement;
    }
    return ElementRef;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var trace;
var events;
function detectWTF() {
    var wtf = _global['wtf'];
    if (wtf) {
        trace = wtf['trace'];
        if (trace) {
            events = trace['events'];
            return true;
        }
    }
    return false;
}
function createScope$1(signature, flags) {
    if (flags === void 0) { flags = null; }
    return events.createScope(signature, flags);
}
function leave(scope, returnValue) {
    trace.leaveScope(scope, returnValue);
    return returnValue;
}
function startTimeRange(rangeType, action) {
    return trace.beginTimeRange(rangeType, action);
}
function endTimeRange(range) {
    trace.endTimeRange(range);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * True if WTF is enabled.
 */
var wtfEnabled = detectWTF();
function noopScope(arg0, arg1) {
    return null;
}
/**
 * Create trace scope.
 *
 * Scopes must be strictly nested and are analogous to stack frames, but
 * do not have to follow the stack frames. Instead it is recommended that they follow logical
 * nesting. You may want to use
 * [Event
 * Signatures](http://google.github.io/tracing-framework/instrumenting-code.html#custom-events)
 * as they are defined in WTF.
 *
 * Used to mark scope entry. The return value is used to leave the scope.
 *
 *     var myScope = wtfCreateScope('MyClass#myMethod(ascii someVal)');
 *
 *     someMethod() {
 *        var s = myScope('Foo'); // 'Foo' gets stored in tracing UI
 *        // DO SOME WORK HERE
 *        return wtfLeave(s, 123); // Return value 123
 *     }
 *
 * Note, adding try-finally block around the work to ensure that `wtfLeave` gets called can
 * negatively impact the performance of your application. For this reason we recommend that
 * you don't add them to ensure that `wtfLeave` gets called. In production `wtfLeave` is a noop and
 * so try-finally block has no value. When debugging perf issues, skipping `wtfLeave`, do to
 * exception, will produce incorrect trace, but presence of exception signifies logic error which
 * needs to be fixed before the app should be profiled. Add try-finally only when you expect that
 * an exception is expected during normal execution while profiling.
 *
 * @experimental
 */
var wtfCreateScope = wtfEnabled ? createScope$1 : function (signature, flags) { return noopScope; };
/**
 * Used to mark end of Scope.
 *
 * - `scope` to end.
 * - `returnValue` (optional) to be passed to the WTF.
 *
 * Returns the `returnValue for easy chaining.
 * @experimental
 */
var wtfLeave = wtfEnabled ? leave : function (s, r) { return r; };
/**
 * Used to mark Async start. Async are similar to scope but they don't have to be strictly nested.
 * The return value is used in the call to [endAsync]. Async ranges only work if WTF has been
 * enabled.
 *
 *     someMethod() {
 *        var s = wtfStartTimeRange('HTTP:GET', 'some.url');
 *        var future = new Future.delay(5).then((_) {
 *          wtfEndTimeRange(s);
 *        });
 *     }
 * @experimental
 */
var wtfStartTimeRange = wtfEnabled ? startTimeRange : function (rangeType, action) { return null; };
/**
 * Ends a async time range operation.
 * [range] is the return value from [wtfStartTimeRange] Async ranges only work if WTF has been
 * enabled.
 * @experimental
 */
var wtfEndTimeRange = wtfEnabled ? endTimeRange : function (r) { return null; };

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Represents a container where one or more Views can be attached.
 *
 * The container can contain two kinds of Views. Host Views, created by instantiating a
 * {@link Component} via {@link #createComponent}, and Embedded Views, created by instantiating an
 * {@link TemplateRef Embedded Template} via {@link #createEmbeddedView}.
 *
 * The location of the View Container within the containing View is specified by the Anchor
 * `element`. Each View Container can have only one Anchor Element and each Anchor Element can only
 * have a single View Container.
 *
 * Root elements of Views attached to this container become siblings of the Anchor Element in
 * the Rendered View.
 *
 * To access a `ViewContainerRef` of an Element, you can either place a {@link Directive} injected
 * with `ViewContainerRef` on the Element, or you obtain it via a {@link ViewChild} query.
 * @stable
 */
var ViewContainerRef = (function () {
    function ViewContainerRef() {
    }
    Object.defineProperty(ViewContainerRef.prototype, "element", {
        /**
         * Anchor element that specifies the location of this container in the containing View.
         * <!-- TODO: rename to anchorElement -->
         */
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewContainerRef.prototype, "injector", {
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewContainerRef.prototype, "parentInjector", {
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewContainerRef.prototype, "length", {
        /**
         * Returns the number of Views currently attached to this container.
         */
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    
    return ViewContainerRef;
}());
var ViewContainerRef_ = (function () {
    function ViewContainerRef_(_element) {
        this._element = _element;
        /** @internal */
        this._createComponentInContainerScope = wtfCreateScope('ViewContainerRef#createComponent()');
        /** @internal */
        this._insertScope = wtfCreateScope('ViewContainerRef#insert()');
        /** @internal */
        this._removeScope = wtfCreateScope('ViewContainerRef#remove()');
        /** @internal */
        this._detachScope = wtfCreateScope('ViewContainerRef#detach()');
    }
    ViewContainerRef_.prototype.get = function (index) { return this._element.nestedViews[index].ref; };
    Object.defineProperty(ViewContainerRef_.prototype, "length", {
        get: function () {
            var views = this._element.nestedViews;
            return isPresent(views) ? views.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewContainerRef_.prototype, "element", {
        get: function () { return this._element.elementRef; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewContainerRef_.prototype, "injector", {
        get: function () { return this._element.injector; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewContainerRef_.prototype, "parentInjector", {
        get: function () { return this._element.parentInjector; },
        enumerable: true,
        configurable: true
    });
    // TODO(rado): profile and decide whether bounds checks should be added
    // to the methods below.
    ViewContainerRef_.prototype.createEmbeddedView = function (templateRef, context, index) {
        if (context === void 0) { context = null; }
        if (index === void 0) { index = -1; }
        var viewRef = templateRef.createEmbeddedView(context);
        this.insert(viewRef, index);
        return viewRef;
    };
    ViewContainerRef_.prototype.createComponent = function (componentFactory, index, injector, projectableNodes) {
        if (index === void 0) { index = -1; }
        if (injector === void 0) { injector = null; }
        if (projectableNodes === void 0) { projectableNodes = null; }
        var s = this._createComponentInContainerScope();
        var contextInjector = isPresent(injector) ? injector : this._element.parentInjector;
        var componentRef = componentFactory.create(contextInjector, projectableNodes);
        this.insert(componentRef.hostView, index);
        return wtfLeave(s, componentRef);
    };
    // TODO(i): refactor insert+remove into move
    ViewContainerRef_.prototype.insert = function (viewRef, index) {
        if (index === void 0) { index = -1; }
        var s = this._insertScope();
        if (index == -1)
            index = this.length;
        var viewRef_ = viewRef;
        this._element.attachView(viewRef_.internalView, index);
        return wtfLeave(s, viewRef_);
    };
    ViewContainerRef_.prototype.move = function (viewRef, currentIndex) {
        var s = this._insertScope();
        if (currentIndex == -1)
            return;
        var viewRef_ = viewRef;
        this._element.moveView(viewRef_.internalView, currentIndex);
        return wtfLeave(s, viewRef_);
    };
    ViewContainerRef_.prototype.indexOf = function (viewRef) {
        return ListWrapper.indexOf(this._element.nestedViews, viewRef.internalView);
    };
    // TODO(i): rename to destroy
    ViewContainerRef_.prototype.remove = function (index) {
        if (index === void 0) { index = -1; }
        var s = this._removeScope();
        if (index == -1)
            index = this.length - 1;
        var view = this._element.detachView(index);
        view.destroy();
        // view is intentionally not returned to the client.
        wtfLeave(s);
    };
    // TODO(i): refactor insert+remove into move
    ViewContainerRef_.prototype.detach = function (index) {
        if (index === void 0) { index = -1; }
        var s = this._detachScope();
        if (index == -1)
            index = this.length - 1;
        var view = this._element.detachView(index);
        return wtfLeave(s, view.ref);
    };
    ViewContainerRef_.prototype.clear = function () {
        for (var i = this.length - 1; i >= 0; i--) {
            this.remove(i);
        }
    };
    return ViewContainerRef_;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ViewType;
(function (ViewType) {
    // A view that contains the host element with bound component directive.
    // Contains a COMPONENT view
    ViewType[ViewType["HOST"] = 0] = "HOST";
    // The view of the component
    // Can contain 0 to n EMBEDDED views
    ViewType[ViewType["COMPONENT"] = 1] = "COMPONENT";
    // A view that is embedded into another View via a <template> element
    // inside of a COMPONENT view
    ViewType[ViewType["EMBEDDED"] = 2] = "EMBEDDED";
})(ViewType || (ViewType = {}));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * An AppElement is created for elements that have a ViewContainerRef,
 * a nested component or a <template> element to keep data around
 * that is needed for later instantiations.
 */
var AppElement = (function () {
    function AppElement(index, parentIndex, parentView, nativeElement) {
        this.index = index;
        this.parentIndex = parentIndex;
        this.parentView = parentView;
        this.nativeElement = nativeElement;
        this.nestedViews = null;
        this.componentView = null;
    }
    Object.defineProperty(AppElement.prototype, "elementRef", {
        get: function () { return new ElementRef(this.nativeElement); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppElement.prototype, "vcRef", {
        get: function () { return new ViewContainerRef_(this); },
        enumerable: true,
        configurable: true
    });
    AppElement.prototype.initComponent = function (component, componentConstructorViewQueries, view) {
        this.component = component;
        this.componentConstructorViewQueries = componentConstructorViewQueries;
        this.componentView = view;
    };
    Object.defineProperty(AppElement.prototype, "parentInjector", {
        get: function () { return this.parentView.injector(this.parentIndex); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppElement.prototype, "injector", {
        get: function () { return this.parentView.injector(this.index); },
        enumerable: true,
        configurable: true
    });
    AppElement.prototype.mapNestedViews = function (nestedViewClass, callback) {
        var result = [];
        if (isPresent(this.nestedViews)) {
            this.nestedViews.forEach(function (nestedView) {
                if (nestedView.clazz === nestedViewClass) {
                    result.push(callback(nestedView));
                }
            });
        }
        return result;
    };
    AppElement.prototype.moveView = function (view, currentIndex) {
        var previousIndex = this.nestedViews.indexOf(view);
        if (view.type === ViewType.COMPONENT) {
            throw new Error("Component views can't be moved!");
        }
        var nestedViews = this.nestedViews;
        if (nestedViews == null) {
            nestedViews = [];
            this.nestedViews = nestedViews;
        }
        ListWrapper.removeAt(nestedViews, previousIndex);
        ListWrapper.insert(nestedViews, currentIndex, view);
        var refRenderNode;
        if (currentIndex > 0) {
            var prevView = nestedViews[currentIndex - 1];
            refRenderNode = prevView.lastRootNode;
        }
        else {
            refRenderNode = this.nativeElement;
        }
        if (isPresent(refRenderNode)) {
            view.renderer.attachViewAfter(refRenderNode, view.flatRootNodes);
        }
        view.markContentChildAsMoved(this);
    };
    AppElement.prototype.attachView = function (view, viewIndex) {
        if (view.type === ViewType.COMPONENT) {
            throw new Error("Component views can't be moved!");
        }
        var nestedViews = this.nestedViews;
        if (nestedViews == null) {
            nestedViews = [];
            this.nestedViews = nestedViews;
        }
        ListWrapper.insert(nestedViews, viewIndex, view);
        var refRenderNode;
        if (viewIndex > 0) {
            var prevView = nestedViews[viewIndex - 1];
            refRenderNode = prevView.lastRootNode;
        }
        else {
            refRenderNode = this.nativeElement;
        }
        if (isPresent(refRenderNode)) {
            view.renderer.attachViewAfter(refRenderNode, view.flatRootNodes);
        }
        view.addToContentChildren(this);
    };
    AppElement.prototype.detachView = function (viewIndex) {
        var view = ListWrapper.removeAt(this.nestedViews, viewIndex);
        if (view.type === ViewType.COMPONENT) {
            throw new Error("Component views can't be moved!");
        }
        view.detach();
        view.removeFromContentChildren(this);
        return view;
    };
    return AppElement;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$6 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown if application changes model breaking the top-down data flow.
 *
 * This exception is only thrown in dev mode.
 *
 * <!-- TODO: Add a link once the dev mode option is configurable -->
 *
 * ### Example
 *
 * ```typescript
 * @Component({
 *   selector: 'parent',
 *   template: `
 *     <child [prop]="parentProp"></child>
 *   `,
 *   directives: [forwardRef(() => Child)]
 * })
 * class Parent {
 *   parentProp = "init";
 * }
 *
 * @Directive({selector: 'child', inputs: ['prop']})
 * class Child {
 *   constructor(public parent: Parent) {}
 *
 *   set prop(v) {
 *     // this updates the parent property, which is disallowed during change detection
 *     // this will result in ExpressionChangedAfterItHasBeenCheckedError
 *     this.parent.parentProp = "updated";
 *   }
 * }
 * ```
 * @stable
 */
var ExpressionChangedAfterItHasBeenCheckedError = (function (_super) {
    __extends$6(ExpressionChangedAfterItHasBeenCheckedError, _super);
    function ExpressionChangedAfterItHasBeenCheckedError(oldValue, currValue) {
        var msg = "Expression has changed after it was checked. Previous value: '" + oldValue + "'. Current value: '" + currValue + "'.";
        if (oldValue === UNINITIALIZED) {
            msg +=
                " It seems like the view has been created after its parent and its children have been dirty checked." +
                    " Has it been created in a change detection hook ?";
        }
        _super.call(this, msg);
    }
    return ExpressionChangedAfterItHasBeenCheckedError;
}(BaseError));
/**
 * Thrown when an exception was raised during view creation, change detection or destruction.
 *
 * This error wraps the original exception to attach additional contextual information that can
 * be useful for debugging.
 * @stable
 */
var ViewWrappedError = (function (_super) {
    __extends$6(ViewWrappedError, _super);
    function ViewWrappedError(originalError, context) {
        _super.call(this, "Error in " + context.source, originalError);
        this.context = context;
    }
    return ViewWrappedError;
}(WrappedError));
/**
 * Thrown when a destroyed view is used.
 *
 * This error indicates a bug in the framework.
 *
 * This is an internal Angular error.
 * @stable
 */
var ViewDestroyedError = (function (_super) {
    __extends$6(ViewDestroyedError, _super);
    function ViewDestroyedError(details) {
        _super.call(this, "Attempt to use a destroyed view: " + details);
    }
    return ViewDestroyedError;
}(BaseError));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ViewUtils = (function () {
    function ViewUtils(_renderer, _appId, sanitizer) {
        this._renderer = _renderer;
        this._appId = _appId;
        this._nextCompTypeId = 0;
        this.sanitizer = sanitizer;
    }
    /**
     * Used by the generated code
     */
    // TODO (matsko): add typing for the animation function
    ViewUtils.prototype.createRenderComponentType = function (templateUrl, slotCount, encapsulation, styles, animations) {
        return new RenderComponentType(this._appId + "-" + this._nextCompTypeId++, templateUrl, slotCount, encapsulation, styles, animations);
    };
    /** @internal */
    ViewUtils.prototype.renderComponent = function (renderComponentType) {
        return this._renderer.renderComponent(renderComponentType);
    };
    ViewUtils.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ViewUtils.ctorParameters = [
        { type: RootRenderer, },
        { type: undefined, decorators: [{ type: Inject, args: [APP_ID,] },] },
        { type: Sanitizer, },
    ];
    return ViewUtils;
}());
function flattenNestedViewRenderNodes(nodes) {
    return _flattenNestedViewRenderNodes(nodes, []);
}
function _flattenNestedViewRenderNodes(nodes, renderNodes) {
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (node instanceof AppElement) {
            var appEl = node;
            renderNodes.push(appEl.nativeElement);
            if (isPresent(appEl.nestedViews)) {
                for (var k = 0; k < appEl.nestedViews.length; k++) {
                    _flattenNestedViewRenderNodes(appEl.nestedViews[k].rootNodesOrAppElements, renderNodes);
                }
            }
        }
        else {
            renderNodes.push(node);
        }
    }
    return renderNodes;
}
var EMPTY_ARR = [];
function ensureSlotCount(projectableNodes, expectedSlotCount) {
    var res;
    if (isBlank(projectableNodes)) {
        res = EMPTY_ARR;
    }
    else if (projectableNodes.length < expectedSlotCount) {
        var givenSlotCount = projectableNodes.length;
        res = ListWrapper.createFixedSize(expectedSlotCount);
        for (var i = 0; i < expectedSlotCount; i++) {
            res[i] = (i < givenSlotCount) ? projectableNodes[i] : EMPTY_ARR;
        }
    }
    else {
        res = projectableNodes;
    }
    return res;
}
var MAX_INTERPOLATION_VALUES = 9;
function interpolate(valueCount, c0, a1, c1, a2, c2, a3, c3, a4, c4, a5, c5, a6, c6, a7, c7, a8, c8, a9, c9) {
    switch (valueCount) {
        case 1:
            return c0 + _toStringWithNull(a1) + c1;
        case 2:
            return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2;
        case 3:
            return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                c3;
        case 4:
            return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                c3 + _toStringWithNull(a4) + c4;
        case 5:
            return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5;
        case 6:
            return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) + c6;
        case 7:
            return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) +
                c6 + _toStringWithNull(a7) + c7;
        case 8:
            return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) +
                c6 + _toStringWithNull(a7) + c7 + _toStringWithNull(a8) + c8;
        case 9:
            return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
                c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) +
                c6 + _toStringWithNull(a7) + c7 + _toStringWithNull(a8) + c8 + _toStringWithNull(a9) + c9;
        default:
            throw new Error("Does not support more than 9 expressions");
    }
}
function _toStringWithNull(v) {
    return v != null ? v.toString() : '';
}
function checkBinding(throwOnChange, oldValue, newValue) {
    if (throwOnChange) {
        if (!devModeEqual(oldValue, newValue)) {
            throw new ExpressionChangedAfterItHasBeenCheckedError(oldValue, newValue);
        }
        return false;
    }
    else {
        return !looseIdentical(oldValue, newValue);
    }
}
function castByValue(input, value) {
    return input;
}
var EMPTY_ARRAY = [];
var EMPTY_MAP = {};
function pureProxy1(fn) {
    var result;
    var v0 = UNINITIALIZED;
    return function (p0) {
        if (!looseIdentical(v0, p0)) {
            v0 = p0;
            result = fn(p0);
        }
        return result;
    };
}
function pureProxy2(fn) {
    var result;
    var v0 = UNINITIALIZED;
    var v1 = UNINITIALIZED;
    return function (p0, p1) {
        if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1)) {
            v0 = p0;
            v1 = p1;
            result = fn(p0, p1);
        }
        return result;
    };
}
function pureProxy3(fn) {
    var result;
    var v0 = UNINITIALIZED;
    var v1 = UNINITIALIZED;
    var v2 = UNINITIALIZED;
    return function (p0, p1, p2) {
        if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2)) {
            v0 = p0;
            v1 = p1;
            v2 = p2;
            result = fn(p0, p1, p2);
        }
        return result;
    };
}
function pureProxy4(fn) {
    var result;
    var v0, v1, v2, v3;
    v0 = v1 = v2 = v3 = UNINITIALIZED;
    return function (p0, p1, p2, p3) {
        if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) ||
            !looseIdentical(v3, p3)) {
            v0 = p0;
            v1 = p1;
            v2 = p2;
            v3 = p3;
            result = fn(p0, p1, p2, p3);
        }
        return result;
    };
}
function pureProxy5(fn) {
    var result;
    var v0, v1, v2, v3, v4;
    v0 = v1 = v2 = v3 = v4 = UNINITIALIZED;
    return function (p0, p1, p2, p3, p4) {
        if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) ||
            !looseIdentical(v3, p3) || !looseIdentical(v4, p4)) {
            v0 = p0;
            v1 = p1;
            v2 = p2;
            v3 = p3;
            v4 = p4;
            result = fn(p0, p1, p2, p3, p4);
        }
        return result;
    };
}
function pureProxy6(fn) {
    var result;
    var v0, v1, v2, v3, v4, v5;
    v0 = v1 = v2 = v3 = v4 = v5 = UNINITIALIZED;
    return function (p0, p1, p2, p3, p4, p5) {
        if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) ||
            !looseIdentical(v3, p3) || !looseIdentical(v4, p4) || !looseIdentical(v5, p5)) {
            v0 = p0;
            v1 = p1;
            v2 = p2;
            v3 = p3;
            v4 = p4;
            v5 = p5;
            result = fn(p0, p1, p2, p3, p4, p5);
        }
        return result;
    };
}
function pureProxy7(fn) {
    var result;
    var v0, v1, v2, v3, v4, v5, v6;
    v0 = v1 = v2 = v3 = v4 = v5 = v6 = UNINITIALIZED;
    return function (p0, p1, p2, p3, p4, p5, p6) {
        if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) ||
            !looseIdentical(v3, p3) || !looseIdentical(v4, p4) || !looseIdentical(v5, p5) ||
            !looseIdentical(v6, p6)) {
            v0 = p0;
            v1 = p1;
            v2 = p2;
            v3 = p3;
            v4 = p4;
            v5 = p5;
            v6 = p6;
            result = fn(p0, p1, p2, p3, p4, p5, p6);
        }
        return result;
    };
}
function pureProxy8(fn) {
    var result;
    var v0, v1, v2, v3, v4, v5, v6, v7;
    v0 = v1 = v2 = v3 = v4 = v5 = v6 = v7 = UNINITIALIZED;
    return function (p0, p1, p2, p3, p4, p5, p6, p7) {
        if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) ||
            !looseIdentical(v3, p3) || !looseIdentical(v4, p4) || !looseIdentical(v5, p5) ||
            !looseIdentical(v6, p6) || !looseIdentical(v7, p7)) {
            v0 = p0;
            v1 = p1;
            v2 = p2;
            v3 = p3;
            v4 = p4;
            v5 = p5;
            v6 = p6;
            v7 = p7;
            result = fn(p0, p1, p2, p3, p4, p5, p6, p7);
        }
        return result;
    };
}
function pureProxy9(fn) {
    var result;
    var v0, v1, v2, v3, v4, v5, v6, v7, v8;
    v0 = v1 = v2 = v3 = v4 = v5 = v6 = v7 = v8 = UNINITIALIZED;
    return function (p0, p1, p2, p3, p4, p5, p6, p7, p8) {
        if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) ||
            !looseIdentical(v3, p3) || !looseIdentical(v4, p4) || !looseIdentical(v5, p5) ||
            !looseIdentical(v6, p6) || !looseIdentical(v7, p7) || !looseIdentical(v8, p8)) {
            v0 = p0;
            v1 = p1;
            v2 = p2;
            v3 = p3;
            v4 = p4;
            v5 = p5;
            v6 = p6;
            v7 = p7;
            v8 = p8;
            result = fn(p0, p1, p2, p3, p4, p5, p6, p7, p8);
        }
        return result;
    };
}
function pureProxy10(fn) {
    var result;
    var v0, v1, v2, v3, v4, v5, v6, v7, v8, v9;
    v0 = v1 = v2 = v3 = v4 = v5 = v6 = v7 = v8 = v9 = UNINITIALIZED;
    return function (p0, p1, p2, p3, p4, p5, p6, p7, p8, p9) {
        if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) ||
            !looseIdentical(v3, p3) || !looseIdentical(v4, p4) || !looseIdentical(v5, p5) ||
            !looseIdentical(v6, p6) || !looseIdentical(v7, p7) || !looseIdentical(v8, p8) ||
            !looseIdentical(v9, p9)) {
            v0 = p0;
            v1 = p1;
            v2 = p2;
            v3 = p3;
            v4 = p4;
            v5 = p5;
            v6 = p6;
            v7 = p7;
            v8 = p8;
            v9 = p9;
            result = fn(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
        }
        return result;
    };
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$5 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Represents an instance of a Component created via a {@link ComponentFactory}.
 *
 * `ComponentRef` provides access to the Component Instance as well other objects related to this
 * Component Instance and allows you to destroy the Component Instance via the {@link #destroy}
 * method.
 * @stable
 */
var ComponentRef = (function () {
    function ComponentRef() {
    }
    Object.defineProperty(ComponentRef.prototype, "location", {
        /**
         * Location of the Host Element of this Component Instance.
         */
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentRef.prototype, "injector", {
        /**
         * The injector on which the component instance exists.
         */
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentRef.prototype, "instance", {
        /**
         * The instance of the Component.
         */
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(ComponentRef.prototype, "hostView", {
        /**
         * The {@link ViewRef} of the Host View of this Component instance.
         */
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(ComponentRef.prototype, "changeDetectorRef", {
        /**
         * The {@link ChangeDetectorRef} of the Component instance.
         */
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentRef.prototype, "componentType", {
        /**
         * The component type.
         */
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    return ComponentRef;
}());
var ComponentRef_ = (function (_super) {
    __extends$5(ComponentRef_, _super);
    function ComponentRef_(_hostElement, _componentType) {
        _super.call(this);
        this._hostElement = _hostElement;
        this._componentType = _componentType;
    }
    Object.defineProperty(ComponentRef_.prototype, "location", {
        get: function () { return this._hostElement.elementRef; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentRef_.prototype, "injector", {
        get: function () { return this._hostElement.injector; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentRef_.prototype, "instance", {
        get: function () { return this._hostElement.component; },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(ComponentRef_.prototype, "hostView", {
        get: function () { return this._hostElement.parentView.ref; },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(ComponentRef_.prototype, "changeDetectorRef", {
        get: function () { return this._hostElement.parentView.ref; },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(ComponentRef_.prototype, "componentType", {
        get: function () { return this._componentType; },
        enumerable: true,
        configurable: true
    });
    ComponentRef_.prototype.destroy = function () { this._hostElement.parentView.destroy(); };
    ComponentRef_.prototype.onDestroy = function (callback) { this.hostView.onDestroy(callback); };
    return ComponentRef_;
}(ComponentRef));
/**
 * @experimental
 */
var EMPTY_CONTEXT = new Object();
/**
 * @stable
 */
var ComponentFactory = (function () {
    function ComponentFactory(selector, _viewFactory, _componentType) {
        this.selector = selector;
        this._viewFactory = _viewFactory;
        this._componentType = _componentType;
    }
    Object.defineProperty(ComponentFactory.prototype, "componentType", {
        get: function () { return this._componentType; },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a new component.
     */
    ComponentFactory.prototype.create = function (injector, projectableNodes, rootSelectorOrNode) {
        if (projectableNodes === void 0) { projectableNodes = null; }
        if (rootSelectorOrNode === void 0) { rootSelectorOrNode = null; }
        var vu = injector.get(ViewUtils);
        if (isBlank(projectableNodes)) {
            projectableNodes = [];
        }
        // Note: Host views don't need a declarationAppElement!
        var hostView = this._viewFactory(vu, injector, null);
        var hostElement = hostView.create(EMPTY_CONTEXT, projectableNodes, rootSelectorOrNode);
        return new ComponentRef_(hostElement, this._componentType);
    };
    return ComponentFactory;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$7 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @stable
 */
var NoComponentFactoryError = (function (_super) {
    __extends$7(NoComponentFactoryError, _super);
    function NoComponentFactoryError(component) {
        _super.call(this, "No component factory found for " + stringify(component));
        this.component = component;
    }
    return NoComponentFactoryError;
}(BaseError));
var _NullComponentFactoryResolver = (function () {
    function _NullComponentFactoryResolver() {
    }
    _NullComponentFactoryResolver.prototype.resolveComponentFactory = function (component) {
        throw new NoComponentFactoryError(component);
    };
    return _NullComponentFactoryResolver;
}());
/**
 * @stable
 */
var ComponentFactoryResolver = (function () {
    function ComponentFactoryResolver() {
    }
    ComponentFactoryResolver.NULL = new _NullComponentFactoryResolver();
    return ComponentFactoryResolver;
}());
var CodegenComponentFactoryResolver = (function () {
    function CodegenComponentFactoryResolver(factories, _parent) {
        this._parent = _parent;
        this._factories = new Map();
        for (var i = 0; i < factories.length; i++) {
            var factory = factories[i];
            this._factories.set(factory.componentType, factory);
        }
    }
    CodegenComponentFactoryResolver.prototype.resolveComponentFactory = function (component) {
        var result = this._factories.get(component);
        if (!result) {
            result = this._parent.resolveComponentFactory(component);
        }
        return result;
    };
    return CodegenComponentFactoryResolver;
}());

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var root = createCommonjsModule(function (module, exports) {
"use strict";
var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
};
exports.root = (objectTypes[typeof self] && self) || (objectTypes[typeof window] && window);
var freeGlobal = objectTypes[typeof commonjsGlobal] && commonjsGlobal;
if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    exports.root = freeGlobal;
}
});

function isFunction$1(x) {
    return typeof x === 'function';
}
var isFunction_2 = isFunction$1;

var isFunction_1$1 = {
	isFunction: isFunction_2
};

var isArray_1$1 = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });

var isArray$1 = {
	isArray: isArray_1$1
};

function isObject(x) {
    return x != null && typeof x === 'object';
}
var isObject_2 = isObject;

var isObject_1$1 = {
	isObject: isObject_2
};

// typeof any so that it we don't have to cast when comparing a result to the error object
var errorObject_1$2 = { e: {} };

var errorObject = {
	errorObject: errorObject_1$2
};

var errorObject_1$1 = errorObject;
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject_1$1.errorObject.e = e;
        return errorObject_1$1.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
var tryCatch_2 = tryCatch;


var tryCatch_1$1 = {
	tryCatch: tryCatch_2
};

var __extends$11 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends$11(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
var UnsubscriptionError_2 = UnsubscriptionError;

var UnsubscriptionError_1$1 = {
	UnsubscriptionError: UnsubscriptionError_2
};

var isArray_1 = isArray$1;
var isObject_1 = isObject_1$1;
var isFunction_1$3 = isFunction_1$1;
var tryCatch_1 = tryCatch_1$1;
var errorObject_1 = errorObject;
var UnsubscriptionError_1 = UnsubscriptionError_1$1;
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        this.closed = true;
        var _a = this, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this._subscriptions = null;
        if (isFunction_1$3.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                (errors = errors || []).push(errorObject_1.errorObject.e);
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            var index = -1;
            var len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject_1.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(err.errors);
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var sub = teardown;
        switch (typeof teardown) {
            case 'function':
                sub = new Subscription(teardown);
            case 'object':
                if (sub.closed || typeof sub.unsubscribe !== 'function') {
                    break;
                }
                else if (this.closed) {
                    sub.unsubscribe();
                }
                else {
                    (this._subscriptions || (this._subscriptions = [])).push(sub);
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        return sub;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        // HACK: This might be redundant because of the logic in `add()`
        if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
            return;
        }
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
var Subscription_2 = Subscription;

var Subscription_1$2 = {
	Subscription: Subscription_2
};

var empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};

var Observer = {
	empty: empty
};

var root_1$2 = root;
var Symbol$1 = root_1$2.root.Symbol;
var $$rxSubscriber = (typeof Symbol$1 === 'function' && typeof Symbol$1.for === 'function') ?
    Symbol$1.for('rxSubscriber') : '@@rxSubscriber';

var rxSubscriber = {
	$$rxSubscriber: $$rxSubscriber
};

var __extends$10 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isFunction_1 = isFunction_1$1;
var Subscription_1$1 = Subscription_1$2;
var Observer_1 = Observer;
var rxSubscriber_1$2 = rxSubscriber;
/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = (function (_super) {
    __extends$10(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = Observer_1.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = Observer_1.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[rxSubscriber_1$2.$$rxSubscriber] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    return Subscriber;
}(Subscription_1$1.Subscription));
var Subscriber_2 = Subscriber;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = (function (_super) {
    __extends$10(SafeSubscriber, _super);
    function SafeSubscriber(_parent, observerOrNext, error, complete) {
        _super.call(this);
        this._parent = _parent;
        var next;
        var context = this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            context = observerOrNext;
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (isFunction_1.isFunction(context.unsubscribe)) {
                this.add(context.unsubscribe.bind(context));
            }
            context.unsubscribe = this.unsubscribe.bind(this);
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parent = this._parent;
            if (!_parent.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parent, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parent = this._parent;
            if (this._error) {
                if (!_parent.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parent, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parent.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parent.syncErrorValue = err;
                _parent.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        if (!this.isStopped) {
            var _parent = this._parent;
            if (this._complete) {
                if (!_parent.syncErrorThrowable) {
                    this.__tryOrUnsub(this._complete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parent, this._complete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parent = this._parent;
        this._context = null;
        this._parent = null;
        _parent.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));

var Subscriber_1$2 = {
	Subscriber: Subscriber_2
};

var Subscriber_1$1 = Subscriber_1$2;
var rxSubscriber_1$1 = rxSubscriber;
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1$1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_1$1.$$rxSubscriber]) {
            return nextOrObserver[rxSubscriber_1$1.$$rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1$1.Subscriber();
    }
    return new Subscriber_1$1.Subscriber(nextOrObserver, error, complete);
}
var toSubscriber_2 = toSubscriber;

var toSubscriber_1$1 = {
	toSubscriber: toSubscriber_2
};

var root_1$3 = root;
function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
var getSymbolObservable_1 = getSymbolObservable;
var $$observable = getSymbolObservable(root_1$3.root);

var observable = {
	getSymbolObservable: getSymbolObservable_1,
	$$observable: $$observable
};

var root_1 = root;
var toSubscriber_1 = toSubscriber_1$1;
var observable_1 = observable;
/**
 * A representation of any set of values over any amount of time. This the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is  called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable.prototype.lift = function (operator) {
        var observable$$1 = new Observable();
        observable$$1.source = this;
        observable$$1.operator = operator;
        return observable$$1;
    };
    /**
     * Registers handlers for handling emitted values, error and completions from the observable, and
     *  executes the observable's subscriber function, which will take action to set up the underlying data stream
     * @method subscribe
     * @param {PartialObserver|Function} observerOrNext (optional) either an observer defining all functions to be called,
     *  or the first of three possible handlers, which is the handler for each value emitted from the observable.
     * @param {Function} error (optional) a handler for a terminal event resulting from an error. If no error handler is provided,
     *  the error will be thrown as unhandled
     * @param {Function} complete (optional) a handler for a terminal event resulting from successful completion.
     * @return {ISubscription} a subscription reference to the registered handlers
     */
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this);
        }
        else {
            sink.add(this._subscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            var subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable.prototype[observable_1.$$observable] = function () {
        return this;
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
var Observable_2 = Observable;

var Observable_1$1 = {
	Observable: Observable_2
};

var __extends$12 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an action is invalid because the object has been
 * unsubscribed.
 *
 * @see {@link Subject}
 * @see {@link BehaviorSubject}
 *
 * @class ObjectUnsubscribedError
 */
var ObjectUnsubscribedError = (function (_super) {
    __extends$12(ObjectUnsubscribedError, _super);
    function ObjectUnsubscribedError() {
        var err = _super.call(this, 'object unsubscribed');
        this.name = err.name = 'ObjectUnsubscribedError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return ObjectUnsubscribedError;
}(Error));
var ObjectUnsubscribedError_2 = ObjectUnsubscribedError;

var ObjectUnsubscribedError_1$1 = {
	ObjectUnsubscribedError: ObjectUnsubscribedError_2
};

var __extends$13 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1$4 = Subscription_1$2;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SubjectSubscription = (function (_super) {
    __extends$13(SubjectSubscription, _super);
    function SubjectSubscription(subject, subscriber) {
        _super.call(this);
        this.subject = subject;
        this.subscriber = subscriber;
        this.closed = false;
    }
    SubjectSubscription.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
        }
        var subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };
    return SubjectSubscription;
}(Subscription_1$4.Subscription));
var SubjectSubscription_2 = SubjectSubscription;

var SubjectSubscription_1$1 = {
	SubjectSubscription: SubjectSubscription_2
};

var __extends$9 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = Observable_1$1;
var Subscriber_1 = Subscriber_1$2;
var Subscription_1 = Subscription_1$2;
var ObjectUnsubscribedError_1 = ObjectUnsubscribedError_1$1;
var SubjectSubscription_1 = SubjectSubscription_1$1;
var rxSubscriber_1 = rxSubscriber;
/**
 * @class SubjectSubscriber<T>
 */
var SubjectSubscriber = (function (_super) {
    __extends$9(SubjectSubscriber, _super);
    function SubjectSubscriber(destination) {
        _super.call(this, destination);
        this.destination = destination;
    }
    return SubjectSubscriber;
}(Subscriber_1.Subscriber));
/**
 * @class Subject<T>
 */
var Subject = (function (_super) {
    __extends$9(Subject, _super);
    function Subject() {
        _super.call(this);
        this.observers = [];
        this.closed = false;
        this.isStopped = false;
        this.hasError = false;
        this.thrownError = null;
    }
    Subject.prototype[rxSubscriber_1.$$rxSubscriber] = function () {
        return new SubjectSubscriber(this);
    };
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype.next = function (value) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        if (!this.isStopped) {
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].next(value);
            }
        }
    };
    Subject.prototype.error = function (err) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].error(err);
        }
        this.observers.length = 0;
    };
    Subject.prototype.complete = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].complete();
        }
        this.observers.length = 0;
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
    };
    Subject.prototype._subscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription_1.Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscriber.complete();
            return Subscription_1.Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable_1.Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable_1.Observable));
var Subject_2 = Subject;
/**
 * @class AnonymousSubject<T>
 */
var AnonymousSubject = (function (_super) {
    __extends$9(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        _super.call(this);
        this.destination = destination;
        this.source = source;
    }
    AnonymousSubject.prototype.next = function (value) {
        var destination = this.destination;
        if (destination && destination.next) {
            destination.next(value);
        }
    };
    AnonymousSubject.prototype.error = function (err) {
        var destination = this.destination;
        if (destination && destination.error) {
            this.destination.error(err);
        }
    };
    AnonymousSubject.prototype.complete = function () {
        var destination = this.destination;
        if (destination && destination.complete) {
            this.destination.complete();
        }
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var source = this.source;
        if (source) {
            return this.source.subscribe(subscriber);
        }
        else {
            return Subscription_1.Subscription.EMPTY;
        }
    };
    return AnonymousSubject;
}(Subject));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$8 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Use by directives and components to emit custom Events.
 *
 * ### Examples
 *
 * In the following example, `Zippy` alternatively emits `open` and `close` events when its
 * title gets clicked:
 *
 * ```
 * @Component({
 *   selector: 'zippy',
 *   template: `
 *   <div class="zippy">
 *     <div (click)="toggle()">Toggle</div>
 *     <div [hidden]="!visible">
 *       <ng-content></ng-content>
 *     </div>
 *  </div>`})
 * export class Zippy {
 *   visible: boolean = true;
 *   @Output() open: EventEmitter<any> = new EventEmitter();
 *   @Output() close: EventEmitter<any> = new EventEmitter();
 *
 *   toggle() {
 *     this.visible = !this.visible;
 *     if (this.visible) {
 *       this.open.emit(null);
 *     } else {
 *       this.close.emit(null);
 *     }
 *   }
 * }
 * ```
 *
 * The events payload can be accessed by the parameter `$event` on the components output event
 * handler:
 *
 * ```
 * <zippy (open)="onOpen($event)" (close)="onClose($event)"></zippy>
 * ```
 *
 * Uses Rx.Observable but provides an adapter to make it work as specified here:
 * https://github.com/jhusain/observable-spec
 *
 * Once a reference implementation of the spec is available, switch to it.
 * @stable
 */
var EventEmitter = (function (_super) {
    __extends$8(EventEmitter, _super);
    /**
     * Creates an instance of [EventEmitter], which depending on [isAsync],
     * delivers events synchronously or asynchronously.
     */
    function EventEmitter(isAsync) {
        if (isAsync === void 0) { isAsync = false; }
        _super.call(this);
        this.__isAsync = isAsync;
    }
    EventEmitter.prototype.emit = function (value) { _super.prototype.next.call(this, value); };
    EventEmitter.prototype.subscribe = function (generatorOrNext, error, complete) {
        var schedulerFn;
        var errorFn = function (err) { return null; };
        var completeFn = function () { return null; };
        if (generatorOrNext && typeof generatorOrNext === 'object') {
            schedulerFn = this.__isAsync ? function (value /** TODO #9100 */) {
                setTimeout(function () { return generatorOrNext.next(value); });
            } : function (value /** TODO #9100 */) { generatorOrNext.next(value); };
            if (generatorOrNext.error) {
                errorFn = this.__isAsync ? function (err) { setTimeout(function () { return generatorOrNext.error(err); }); } :
                    function (err) { generatorOrNext.error(err); };
            }
            if (generatorOrNext.complete) {
                completeFn = this.__isAsync ? function () { setTimeout(function () { return generatorOrNext.complete(); }); } :
                    function () { generatorOrNext.complete(); };
            }
        }
        else {
            schedulerFn = this.__isAsync ? function (value /** TODO #9100 */) {
                setTimeout(function () { return generatorOrNext(value); });
            } : function (value /** TODO #9100 */) { generatorOrNext(value); };
            if (error) {
                errorFn =
                    this.__isAsync ? function (err) { setTimeout(function () { return error(err); }); } : function (err) { error(err); };
            }
            if (complete) {
                completeFn =
                    this.__isAsync ? function () { setTimeout(function () { return complete(); }); } : function () { complete(); };
            }
        }
        return _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
    };
    return EventEmitter;
}(Subject_2));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var NgZoneImpl = (function () {
    function NgZoneImpl(_a) {
        var _this = this;
        var trace = _a.trace, onEnter = _a.onEnter, onLeave = _a.onLeave, setMicrotask = _a.setMicrotask, setMacrotask = _a.setMacrotask, onError = _a.onError;
        this.onEnter = onEnter;
        this.onLeave = onLeave;
        this.setMicrotask = setMicrotask;
        this.setMacrotask = setMacrotask;
        this.onError = onError;
        if (typeof Zone == 'undefined') {
            throw new Error('Angular requires Zone.js prolyfill.');
        }
        Zone.assertZonePatched();
        this.outer = this.inner = Zone.current;
        if (Zone['wtfZoneSpec']) {
            this.inner = this.inner.fork(Zone['wtfZoneSpec']);
        }
        if (trace && Zone['longStackTraceZoneSpec']) {
            this.inner = this.inner.fork(Zone['longStackTraceZoneSpec']);
        }
        this.inner = this.inner.fork({
            name: 'angular',
            properties: { 'isAngularZone': true },
            onInvokeTask: function (delegate, current, target, task, applyThis, applyArgs) {
                try {
                    _this.onEnter();
                    return delegate.invokeTask(target, task, applyThis, applyArgs);
                }
                finally {
                    _this.onLeave();
                }
            },
            onInvoke: function (delegate, current, target, callback, applyThis, applyArgs, source) {
                try {
                    _this.onEnter();
                    return delegate.invoke(target, callback, applyThis, applyArgs, source);
                }
                finally {
                    _this.onLeave();
                }
            },
            onHasTask: function (delegate, current, target, hasTaskState) {
                delegate.hasTask(target, hasTaskState);
                if (current === target) {
                    // We are only interested in hasTask events which originate from our zone
                    // (A child hasTask event is not interesting to us)
                    if (hasTaskState.change == 'microTask') {
                        _this.setMicrotask(hasTaskState.microTask);
                    }
                    else if (hasTaskState.change == 'macroTask') {
                        _this.setMacrotask(hasTaskState.macroTask);
                    }
                }
            },
            onHandleError: function (delegate, current, target, error) {
                delegate.handleError(target, error);
                _this.onError(error);
                return false;
            }
        });
    }
    NgZoneImpl.isInAngularZone = function () { return Zone.current.get('isAngularZone') === true; };
    NgZoneImpl.prototype.runInner = function (fn) { return this.inner.run(fn); };
    
    NgZoneImpl.prototype.runInnerGuarded = function (fn) { return this.inner.runGuarded(fn); };
    
    NgZoneImpl.prototype.runOuter = function (fn) { return this.outer.run(fn); };
    
    return NgZoneImpl;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * An injectable service for executing work inside or outside of the Angular zone.
 *
 * The most common use of this service is to optimize performance when starting a work consisting of
 * one or more asynchronous tasks that don't require UI updates or error handling to be handled by
 * Angular. Such tasks can be kicked off via {@link #runOutsideAngular} and if needed, these tasks
 * can reenter the Angular zone via {@link #run}.
 *
 * <!-- TODO: add/fix links to:
 *   - docs explaining zones and the use of zones in Angular and change-detection
 *   - link to runOutsideAngular/run (throughout this file!)
 *   -->
 *
 * ### Example ([live demo](http://plnkr.co/edit/lY9m8HLy7z06vDoUaSN2?p=preview))
 * ```
 * import {Component, View, NgZone} from '@angular/core';
 * import {NgIf} from '@angular/common';
 *
 * @Component({
 *   selector: 'ng-zone-demo'.
 *   template: `
 *     <h2>Demo: NgZone</h2>
 *
 *     <p>Progress: {{progress}}%</p>
 *     <p *ngIf="progress >= 100">Done processing {{label}} of Angular zone!</p>
 *
 *     <button (click)="processWithinAngularZone()">Process within Angular zone</button>
 *     <button (click)="processOutsideOfAngularZone()">Process outside of Angular zone</button>
 *   `,
 *   directives: [NgIf]
 * })
 * export class NgZoneDemo {
 *   progress: number = 0;
 *   label: string;
 *
 *   constructor(private _ngZone: NgZone) {}
 *
 *   // Loop inside the Angular zone
 *   // so the UI DOES refresh after each setTimeout cycle
 *   processWithinAngularZone() {
 *     this.label = 'inside';
 *     this.progress = 0;
 *     this._increaseProgress(() => console.log('Inside Done!'));
 *   }
 *
 *   // Loop outside of the Angular zone
 *   // so the UI DOES NOT refresh after each setTimeout cycle
 *   processOutsideOfAngularZone() {
 *     this.label = 'outside';
 *     this.progress = 0;
 *     this._ngZone.runOutsideAngular(() => {
 *       this._increaseProgress(() => {
 *       // reenter the Angular zone and display done
 *       this._ngZone.run(() => {console.log('Outside Done!') });
 *     }}));
 *   }
 *
 *
 *   _increaseProgress(doneCallback: () => void) {
 *     this.progress += 1;
 *     console.log(`Current progress: ${this.progress}%`);
 *
 *     if (this.progress < 100) {
 *       window.setTimeout(() => this._increaseProgress(doneCallback)), 10)
 *     } else {
 *       doneCallback();
 *     }
 *   }
 * }
 * ```
 * @experimental
 */
var NgZone = (function () {
    function NgZone(_a) {
        var _this = this;
        var _b = _a.enableLongStackTrace, enableLongStackTrace = _b === void 0 ? false : _b;
        this._hasPendingMicrotasks = false;
        this._hasPendingMacrotasks = false;
        /** @internal */
        this._isStable = true;
        /** @internal */
        this._nesting = 0;
        /** @internal */
        this._onUnstable = new EventEmitter(false);
        /** @internal */
        this._onMicrotaskEmpty = new EventEmitter(false);
        /** @internal */
        this._onStable = new EventEmitter(false);
        /** @internal */
        this._onErrorEvents = new EventEmitter(false);
        this._zoneImpl = new NgZoneImpl({
            trace: enableLongStackTrace,
            onEnter: function () {
                // console.log('ZONE.enter', this._nesting, this._isStable);
                _this._nesting++;
                if (_this._isStable) {
                    _this._isStable = false;
                    _this._onUnstable.emit(null);
                }
            },
            onLeave: function () {
                _this._nesting--;
                // console.log('ZONE.leave', this._nesting, this._isStable);
                _this._checkStable();
            },
            setMicrotask: function (hasMicrotasks) {
                _this._hasPendingMicrotasks = hasMicrotasks;
                _this._checkStable();
            },
            setMacrotask: function (hasMacrotasks) { _this._hasPendingMacrotasks = hasMacrotasks; },
            onError: function (error) { return _this._onErrorEvents.emit(error); }
        });
    }
    NgZone.isInAngularZone = function () { return NgZoneImpl.isInAngularZone(); };
    NgZone.assertInAngularZone = function () {
        if (!NgZoneImpl.isInAngularZone()) {
            throw new Error('Expected to be in Angular Zone, but it is not!');
        }
    };
    NgZone.assertNotInAngularZone = function () {
        if (NgZoneImpl.isInAngularZone()) {
            throw new Error('Expected to not be in Angular Zone, but it is!');
        }
    };
    NgZone.prototype._checkStable = function () {
        var _this = this;
        if (this._nesting == 0) {
            if (!this._hasPendingMicrotasks && !this._isStable) {
                try {
                    // console.log('ZONE.microtaskEmpty');
                    this._nesting++;
                    this._onMicrotaskEmpty.emit(null);
                }
                finally {
                    this._nesting--;
                    if (!this._hasPendingMicrotasks) {
                        try {
                            // console.log('ZONE.stable', this._nesting, this._isStable);
                            this.runOutsideAngular(function () { return _this._onStable.emit(null); });
                        }
                        finally {
                            this._isStable = true;
                        }
                    }
                }
            }
        }
    };
    
    Object.defineProperty(NgZone.prototype, "onUnstable", {
        /**
         * Notifies when code enters Angular Zone. This gets fired first on VM Turn.
         */
        get: function () { return this._onUnstable; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgZone.prototype, "onMicrotaskEmpty", {
        /**
         * Notifies when there is no more microtasks enqueue in the current VM Turn.
         * This is a hint for Angular to do change detection, which may enqueue more microtasks.
         * For this reason this event can fire multiple times per VM Turn.
         */
        get: function () { return this._onMicrotaskEmpty; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgZone.prototype, "onStable", {
        /**
         * Notifies when the last `onMicrotaskEmpty` has run and there are no more microtasks, which
         * implies we are about to relinquish VM turn.
         * This event gets called just once.
         */
        get: function () { return this._onStable; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgZone.prototype, "onError", {
        /**
         * Notify that an error has been delivered.
         */
        get: function () { return this._onErrorEvents; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgZone.prototype, "isStable", {
        /**
         * Whether there are no outstanding microtasks or microtasks.
         */
        get: function () { return this._isStable; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgZone.prototype, "hasPendingMicrotasks", {
        /**
         * Whether there are any outstanding microtasks.
         */
        get: function () { return this._hasPendingMicrotasks; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgZone.prototype, "hasPendingMacrotasks", {
        /**
         * Whether there are any outstanding microtasks.
         */
        get: function () { return this._hasPendingMacrotasks; },
        enumerable: true,
        configurable: true
    });
    /**
     * Executes the `fn` function synchronously within the Angular zone and returns value returned by
     * the function.
     *
     * Running functions via `run` allows you to reenter Angular zone from a task that was executed
     * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * within the Angular zone.
     *
     * If a synchronous error happens it will be rethrown and not reported via `onError`.
     */
    NgZone.prototype.run = function (fn) { return this._zoneImpl.runInner(fn); };
    /**
     * Same as #run, except that synchronous errors are caught and forwarded
     * via `onError` and not rethrown.
     */
    NgZone.prototype.runGuarded = function (fn) { return this._zoneImpl.runInnerGuarded(fn); };
    /**
     * Executes the `fn` function synchronously in Angular's parent zone and returns value returned by
     * the function.
     *
     * Running functions via `runOutsideAngular` allows you to escape Angular's zone and do work that
     * doesn't trigger Angular change-detection or is subject to Angular's error handling.
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * outside of the Angular zone.
     *
     * Use {@link #run} to reenter the Angular zone and do work that updates the application model.
     */
    NgZone.prototype.runOutsideAngular = function (fn) { return this._zoneImpl.runOuter(fn); };
    return NgZone;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * The Testability service provides testing hooks that can be accessed from
 * the browser and by services such as Protractor. Each bootstrapped Angular
 * application on the page will have an instance of Testability.
 * @experimental
 */
var Testability = (function () {
    function Testability(_ngZone) {
        this._ngZone = _ngZone;
        /** @internal */
        this._pendingCount = 0;
        /** @internal */
        this._isZoneStable = true;
        /**
         * Whether any work was done since the last 'whenStable' callback. This is
         * useful to detect if this could have potentially destabilized another
         * component while it is stabilizing.
         * @internal
         */
        this._didWork = false;
        /** @internal */
        this._callbacks = [];
        this._watchAngularEvents();
    }
    /** @internal */
    Testability.prototype._watchAngularEvents = function () {
        var _this = this;
        this._ngZone.onUnstable.subscribe({
            next: function () {
                _this._didWork = true;
                _this._isZoneStable = false;
            }
        });
        this._ngZone.runOutsideAngular(function () {
            _this._ngZone.onStable.subscribe({
                next: function () {
                    NgZone.assertNotInAngularZone();
                    scheduleMicroTask(function () {
                        _this._isZoneStable = true;
                        _this._runCallbacksIfReady();
                    });
                }
            });
        });
    };
    Testability.prototype.increasePendingRequestCount = function () {
        this._pendingCount += 1;
        this._didWork = true;
        return this._pendingCount;
    };
    Testability.prototype.decreasePendingRequestCount = function () {
        this._pendingCount -= 1;
        if (this._pendingCount < 0) {
            throw new Error('pending async requests below zero');
        }
        this._runCallbacksIfReady();
        return this._pendingCount;
    };
    Testability.prototype.isStable = function () {
        return this._isZoneStable && this._pendingCount == 0 && !this._ngZone.hasPendingMacrotasks;
    };
    /** @internal */
    Testability.prototype._runCallbacksIfReady = function () {
        var _this = this;
        if (this.isStable()) {
            // Schedules the call backs in a new frame so that it is always async.
            scheduleMicroTask(function () {
                while (_this._callbacks.length !== 0) {
                    (_this._callbacks.pop())(_this._didWork);
                }
                _this._didWork = false;
            });
        }
        else {
            // Not Ready
            this._didWork = true;
        }
    };
    Testability.prototype.whenStable = function (callback) {
        this._callbacks.push(callback);
        this._runCallbacksIfReady();
    };
    Testability.prototype.getPendingRequestCount = function () { return this._pendingCount; };
    Testability.prototype.findBindings = function (using, provider, exactMatch) {
        // TODO(juliemr): implement.
        return [];
    };
    Testability.prototype.findProviders = function (using, provider, exactMatch) {
        // TODO(juliemr): implement.
        return [];
    };
    Testability.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Testability.ctorParameters = [
        { type: NgZone, },
    ];
    return Testability;
}());
/**
 * A global registry of {@link Testability} instances for specific elements.
 * @experimental
 */
var TestabilityRegistry = (function () {
    function TestabilityRegistry() {
        /** @internal */
        this._applications = new Map$1();
        _testabilityGetter.addToWindow(this);
    }
    TestabilityRegistry.prototype.registerApplication = function (token, testability) {
        this._applications.set(token, testability);
    };
    TestabilityRegistry.prototype.getTestability = function (elem) { return this._applications.get(elem); };
    TestabilityRegistry.prototype.getAllTestabilities = function () { return MapWrapper.values(this._applications); };
    TestabilityRegistry.prototype.getAllRootElements = function () { return MapWrapper.keys(this._applications); };
    TestabilityRegistry.prototype.findTestabilityInTree = function (elem, findInAncestors) {
        if (findInAncestors === void 0) { findInAncestors = true; }
        return _testabilityGetter.findTestabilityInTree(this, elem, findInAncestors);
    };
    TestabilityRegistry.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    TestabilityRegistry.ctorParameters = [];
    return TestabilityRegistry;
}());
var _NoopGetTestability = (function () {
    function _NoopGetTestability() {
    }
    _NoopGetTestability.prototype.addToWindow = function (registry) { };
    _NoopGetTestability.prototype.findTestabilityInTree = function (registry, elem, findInAncestors) {
        return null;
    };
    return _NoopGetTestability;
}());
/**
 * Set the {@link GetTestability} implementation used by the Angular testing framework.
 * @experimental
 */
function setTestabilityGetter(getter) {
    _testabilityGetter = getter;
}
var _testabilityGetter = new _NoopGetTestability();

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$3 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _devMode = true;
var _runModeLocked = false;
var _platform;
/**
 * Disable Angular's development mode, which turns off assertions and other
 * checks within the framework.
 *
 * One important assertion this disables verifies that a change detection pass
 * does not result in additional changes to any bindings (also known as
 * unidirectional data flow).
 *
 * @stable
 */
function enableProdMode() {
    if (_runModeLocked) {
        throw new Error('Cannot enable prod mode after platform setup.');
    }
    _devMode = false;
}
/**
 * Returns whether Angular is in development mode. After called once,
 * the value is locked and won't change any more.
 *
 * By default, this is true, unless a user calls `enableProdMode` before calling this.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
function isDevMode() {
    _runModeLocked = true;
    return _devMode;
}
/**
 * Creates a platform.
 * Platforms have to be eagerly created via this function.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
function createPlatform(injector) {
    if (isPresent(_platform) && !_platform.destroyed) {
        throw new Error('There can be only one platform. Destroy the previous one to create a new one.');
    }
    _platform = injector.get(PlatformRef);
    var inits = injector.get(PLATFORM_INITIALIZER, null);
    if (isPresent(inits))
        inits.forEach(function (init) { return init(); });
    return _platform;
}
/**
 * Creates a factory for a platform
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
function createPlatformFactory(parentPlaformFactory, name, providers) {
    if (providers === void 0) { providers = []; }
    var marker = new OpaqueToken("Platform: " + name);
    return function (extraProviders) {
        if (extraProviders === void 0) { extraProviders = []; }
        if (!getPlatform()) {
            if (parentPlaformFactory) {
                parentPlaformFactory(providers.concat(extraProviders).concat({ provide: marker, useValue: true }));
            }
            else {
                createPlatform(ReflectiveInjector.resolveAndCreate(providers.concat(extraProviders).concat({ provide: marker, useValue: true })));
            }
        }
        return assertPlatform(marker);
    };
}
/**
 * Checks that there currently is a platform
 * which contains the given token as a provider.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
function assertPlatform(requiredToken) {
    var platform = getPlatform();
    if (isBlank(platform)) {
        throw new Error('No platform exists!');
    }
    if (isPresent(platform) && isBlank(platform.injector.get(requiredToken, null))) {
        throw new Error('A platform with a different configuration has been created. Please destroy it first.');
    }
    return platform;
}
/**
 * Destroy the existing platform.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
function destroyPlatform() {
    if (isPresent(_platform) && !_platform.destroyed) {
        _platform.destroy();
    }
}
/**
 * Returns the current platform.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
function getPlatform() {
    return isPresent(_platform) && !_platform.destroyed ? _platform : null;
}
/**
 * The Angular platform is the entry point for Angular on a web page. Each page
 * has exactly one platform, and services (such as reflection) which are common
 * to every Angular application running on the page are bound in its scope.
 *
 * A page's platform is initialized implicitly when {@link bootstrap}() is called, or
 * explicitly by calling {@link createPlatform}().
 *
 * @stable
 */
var PlatformRef = (function () {
    function PlatformRef() {
    }
    /**
     * Creates an instance of an `@NgModule` for the given platform
     * for offline compilation.
     *
     * ## Simple Example
     *
     * ```typescript
     * my_module.ts:
     *
     * @NgModule({
     *   imports: [BrowserModule]
     * })
     * class MyModule {}
     *
     * main.ts:
     * import {MyModuleNgFactory} from './my_module.ngfactory';
     * import {platformBrowser} from '@angular/platform-browser';
     *
     * let moduleRef = platformBrowser().bootstrapModuleFactory(MyModuleNgFactory);
     * ```
     *
     * @experimental APIs related to application bootstrap are currently under review.
     */
    PlatformRef.prototype.bootstrapModuleFactory = function (moduleFactory) {
        throw unimplemented();
    };
    /**
     * Creates an instance of an `@NgModule` for a given platform using the given runtime compiler.
     *
     * ## Simple Example
     *
     * ```typescript
     * @NgModule({
     *   imports: [BrowserModule]
     * })
     * class MyModule {}
     *
     * let moduleRef = platformBrowser().bootstrapModule(MyModule);
     * ```
     * @stable
     */
    PlatformRef.prototype.bootstrapModule = function (moduleType, compilerOptions) {
        if (compilerOptions === void 0) { compilerOptions = []; }
        throw unimplemented();
    };
    Object.defineProperty(PlatformRef.prototype, "injector", {
        /**
         * Retrieve the platform {@link Injector}, which is the parent injector for
         * every Angular application on the page and provides singleton providers.
         */
        get: function () { throw unimplemented(); },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(PlatformRef.prototype, "destroyed", {
        get: function () { throw unimplemented(); },
        enumerable: true,
        configurable: true
    });
    return PlatformRef;
}());
function _callAndReportToErrorHandler(errorHandler, callback) {
    try {
        var result = callback();
        if (isPromise(result)) {
            return result.catch(function (e) {
                errorHandler.handleError(e);
                // rethrow as the exception handler might not do it
                throw e;
            });
        }
        else {
            return result;
        }
    }
    catch (e) {
        errorHandler.handleError(e);
        // rethrow as the exception handler might not do it
        throw e;
    }
}
var PlatformRef_ = (function (_super) {
    __extends$3(PlatformRef_, _super);
    function PlatformRef_(_injector) {
        _super.call(this);
        this._injector = _injector;
        this._modules = [];
        this._destroyListeners = [];
        this._destroyed = false;
    }
    PlatformRef_.prototype.onDestroy = function (callback) { this._destroyListeners.push(callback); };
    Object.defineProperty(PlatformRef_.prototype, "injector", {
        get: function () { return this._injector; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformRef_.prototype, "destroyed", {
        get: function () { return this._destroyed; },
        enumerable: true,
        configurable: true
    });
    PlatformRef_.prototype.destroy = function () {
        if (this._destroyed) {
            throw new Error('The platform has already been destroyed!');
        }
        ListWrapper.clone(this._modules).forEach(function (app) { return app.destroy(); });
        this._destroyListeners.forEach(function (dispose) { return dispose(); });
        this._destroyed = true;
    };
    PlatformRef_.prototype.bootstrapModuleFactory = function (moduleFactory) {
        return this._bootstrapModuleFactoryWithZone(moduleFactory, null);
    };
    PlatformRef_.prototype._bootstrapModuleFactoryWithZone = function (moduleFactory, ngZone) {
        var _this = this;
        // Note: We need to create the NgZone _before_ we instantiate the module,
        // as instantiating the module creates some providers eagerly.
        // So we create a mini parent injector that just contains the new NgZone and
        // pass that as parent to the NgModuleFactory.
        if (!ngZone)
            ngZone = new NgZone({ enableLongStackTrace: isDevMode() });
        // Attention: Don't use ApplicationRef.run here,
        // as we want to be sure that all possible constructor calls are inside `ngZone.run`!
        return ngZone.run(function () {
            var ngZoneInjector = ReflectiveInjector.resolveAndCreate([{ provide: NgZone, useValue: ngZone }], _this.injector);
            var moduleRef = moduleFactory.create(ngZoneInjector);
            var exceptionHandler = moduleRef.injector.get(ErrorHandler, null);
            if (!exceptionHandler) {
                throw new Error('No ErrorHandler. Is platform module (BrowserModule) included?');
            }
            moduleRef.onDestroy(function () { return ListWrapper.remove(_this._modules, moduleRef); });
            ngZone.onError.subscribe({ next: function (error) { exceptionHandler.handleError(error); } });
            return _callAndReportToErrorHandler(exceptionHandler, function () {
                var initStatus = moduleRef.injector.get(ApplicationInitStatus);
                return initStatus.donePromise.then(function () {
                    _this._moduleDoBootstrap(moduleRef);
                    return moduleRef;
                });
            });
        });
    };
    PlatformRef_.prototype.bootstrapModule = function (moduleType, compilerOptions) {
        if (compilerOptions === void 0) { compilerOptions = []; }
        return this._bootstrapModuleWithZone(moduleType, compilerOptions, null);
    };
    PlatformRef_.prototype._bootstrapModuleWithZone = function (moduleType, compilerOptions, ngZone, componentFactoryCallback) {
        var _this = this;
        if (compilerOptions === void 0) { compilerOptions = []; }
        var compilerFactory = this.injector.get(CompilerFactory);
        var compiler = compilerFactory.createCompiler(compilerOptions instanceof Array ? compilerOptions : [compilerOptions]);
        // ugly internal api hack: generate host component factories for all declared components and
        // pass the factories into the callback - this is used by UpdateAdapter to get hold of all
        // factories.
        if (componentFactoryCallback) {
            return compiler.compileModuleAndAllComponentsAsync(moduleType)
                .then(function (_a) {
                var ngModuleFactory = _a.ngModuleFactory, componentFactories = _a.componentFactories;
                componentFactoryCallback(componentFactories);
                return _this._bootstrapModuleFactoryWithZone(ngModuleFactory, ngZone);
            });
        }
        return compiler.compileModuleAsync(moduleType)
            .then(function (moduleFactory) { return _this._bootstrapModuleFactoryWithZone(moduleFactory, ngZone); });
    };
    PlatformRef_.prototype._moduleDoBootstrap = function (moduleRef) {
        var appRef = moduleRef.injector.get(ApplicationRef);
        if (moduleRef.bootstrapFactories.length > 0) {
            moduleRef.bootstrapFactories.forEach(function (compFactory) { return appRef.bootstrap(compFactory); });
        }
        else if (moduleRef.instance.ngDoBootstrap) {
            moduleRef.instance.ngDoBootstrap(appRef);
        }
        else {
            throw new Error(("The module " + stringify(moduleRef.instance.constructor) + " was bootstrapped, but it does not declare \"@NgModule.bootstrap\" components nor a \"ngDoBootstrap\" method. ") +
                "Please define one of these.");
        }
    };
    PlatformRef_.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    PlatformRef_.ctorParameters = [
        { type: Injector, },
    ];
    return PlatformRef_;
}(PlatformRef));
/**
 * A reference to an Angular application running on a page.
 *
 * For more about Angular applications, see the documentation for {@link bootstrap}.
 *
 * @stable
 */
var ApplicationRef = (function () {
    function ApplicationRef() {
    }
    Object.defineProperty(ApplicationRef.prototype, "componentTypes", {
        /**
         * Get a list of component types registered to this application.
         * This list is populated even before the component is created.
         */
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(ApplicationRef.prototype, "components", {
        /**
         * Get a list of components registered to this application.
         */
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    
    return ApplicationRef;
}());
var ApplicationRef_ = (function (_super) {
    __extends$3(ApplicationRef_, _super);
    function ApplicationRef_(_zone, _console, _injector, _exceptionHandler, _componentFactoryResolver, _initStatus, _testabilityRegistry, _testability) {
        var _this = this;
        _super.call(this);
        this._zone = _zone;
        this._console = _console;
        this._injector = _injector;
        this._exceptionHandler = _exceptionHandler;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._initStatus = _initStatus;
        this._testabilityRegistry = _testabilityRegistry;
        this._testability = _testability;
        this._bootstrapListeners = [];
        this._rootComponents = [];
        this._rootComponentTypes = [];
        this._changeDetectorRefs = [];
        this._runningTick = false;
        this._enforceNoNewChanges = false;
        this._enforceNoNewChanges = isDevMode();
        this._zone.onMicrotaskEmpty.subscribe({ next: function () { _this._zone.run(function () { _this.tick(); }); } });
    }
    ApplicationRef_.prototype.registerChangeDetector = function (changeDetector) {
        this._changeDetectorRefs.push(changeDetector);
    };
    ApplicationRef_.prototype.unregisterChangeDetector = function (changeDetector) {
        ListWrapper.remove(this._changeDetectorRefs, changeDetector);
    };
    ApplicationRef_.prototype.bootstrap = function (componentOrFactory) {
        var _this = this;
        if (!this._initStatus.done) {
            throw new Error('Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.');
        }
        var componentFactory;
        if (componentOrFactory instanceof ComponentFactory) {
            componentFactory = componentOrFactory;
        }
        else {
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentOrFactory);
        }
        this._rootComponentTypes.push(componentFactory.componentType);
        var compRef = componentFactory.create(this._injector, [], componentFactory.selector);
        compRef.onDestroy(function () { _this._unloadComponent(compRef); });
        var testability = compRef.injector.get(Testability, null);
        if (isPresent(testability)) {
            compRef.injector.get(TestabilityRegistry)
                .registerApplication(compRef.location.nativeElement, testability);
        }
        this._loadComponent(compRef);
        if (isDevMode()) {
            this._console.log("Angular 2 is running in the development mode. Call enableProdMode() to enable the production mode.");
        }
        return compRef;
    };
    /** @internal */
    ApplicationRef_.prototype._loadComponent = function (componentRef) {
        this._changeDetectorRefs.push(componentRef.changeDetectorRef);
        this.tick();
        this._rootComponents.push(componentRef);
        // Get the listeners lazily to prevent DI cycles.
        var listeners = this._injector.get(APP_BOOTSTRAP_LISTENER, [])
            .concat(this._bootstrapListeners);
        listeners.forEach(function (listener) { return listener(componentRef); });
    };
    /** @internal */
    ApplicationRef_.prototype._unloadComponent = function (componentRef) {
        if (!ListWrapper.contains(this._rootComponents, componentRef)) {
            return;
        }
        this.unregisterChangeDetector(componentRef.changeDetectorRef);
        ListWrapper.remove(this._rootComponents, componentRef);
    };
    ApplicationRef_.prototype.tick = function () {
        if (this._runningTick) {
            throw new Error('ApplicationRef.tick is called recursively');
        }
        var s = ApplicationRef_._tickScope();
        try {
            this._runningTick = true;
            this._changeDetectorRefs.forEach(function (detector) { return detector.detectChanges(); });
            if (this._enforceNoNewChanges) {
                this._changeDetectorRefs.forEach(function (detector) { return detector.checkNoChanges(); });
            }
        }
        finally {
            this._runningTick = false;
            wtfLeave(s);
        }
    };
    ApplicationRef_.prototype.ngOnDestroy = function () {
        // TODO(alxhub): Dispose of the NgZone.
        ListWrapper.clone(this._rootComponents).forEach(function (ref) { return ref.destroy(); });
    };
    Object.defineProperty(ApplicationRef_.prototype, "componentTypes", {
        get: function () { return this._rootComponentTypes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationRef_.prototype, "components", {
        get: function () { return this._rootComponents; },
        enumerable: true,
        configurable: true
    });
    /** @internal */
    ApplicationRef_._tickScope = wtfCreateScope('ApplicationRef#tick()');
    ApplicationRef_.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ApplicationRef_.ctorParameters = [
        { type: NgZone, },
        { type: Console, },
        { type: Injector, },
        { type: ErrorHandler, },
        { type: ComponentFactoryResolver, },
        { type: ApplicationInitStatus, },
        { type: TestabilityRegistry, decorators: [{ type: Optional },] },
        { type: Testability, decorators: [{ type: Optional },] },
    ];
    return ApplicationRef_;
}(ApplicationRef));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Public API for Zone

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Public API for render

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$14 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Represents an instance of an NgModule created via a {@link NgModuleFactory}.
 *
 * `NgModuleRef` provides access to the NgModule Instance as well other objects related to this
 * NgModule Instance.
 *
 * @stable
 */
var NgModuleRef = (function () {
    function NgModuleRef() {
    }
    Object.defineProperty(NgModuleRef.prototype, "injector", {
        /**
         * The injector that contains all of the providers of the NgModule.
         */
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModuleRef.prototype, "componentFactoryResolver", {
        /**
         * The ComponentFactoryResolver to get hold of the ComponentFactories
         * declared in the `entryComponents` property of the module.
         */
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModuleRef.prototype, "instance", {
        /**
         * The NgModule instance.
         */
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    return NgModuleRef;
}());
/**
 * @experimental
 */
var NgModuleFactory = (function () {
    function NgModuleFactory(_injectorClass, _moduleType) {
        this._injectorClass = _injectorClass;
        this._moduleType = _moduleType;
    }
    Object.defineProperty(NgModuleFactory.prototype, "moduleType", {
        get: function () { return this._moduleType; },
        enumerable: true,
        configurable: true
    });
    NgModuleFactory.prototype.create = function (parentInjector) {
        if (!parentInjector) {
            parentInjector = Injector.NULL;
        }
        var instance = new this._injectorClass(parentInjector);
        instance.create();
        return instance;
    };
    return NgModuleFactory;
}());
var _UNDEFINED = new Object();
var NgModuleInjector = (function (_super) {
    __extends$14(NgModuleInjector, _super);
    function NgModuleInjector(parent, factories, bootstrapFactories) {
        _super.call(this, factories, parent.get(ComponentFactoryResolver, ComponentFactoryResolver.NULL));
        this.parent = parent;
        this.bootstrapFactories = bootstrapFactories;
        this._destroyListeners = [];
        this._destroyed = false;
    }
    NgModuleInjector.prototype.create = function () { this.instance = this.createInternal(); };
    NgModuleInjector.prototype.get = function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = THROW_IF_NOT_FOUND; }
        if (token === Injector || token === ComponentFactoryResolver) {
            return this;
        }
        var result = this.getInternal(token, _UNDEFINED);
        return result === _UNDEFINED ? this.parent.get(token, notFoundValue) : result;
    };
    Object.defineProperty(NgModuleInjector.prototype, "injector", {
        get: function () { return this; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModuleInjector.prototype, "componentFactoryResolver", {
        get: function () { return this; },
        enumerable: true,
        configurable: true
    });
    NgModuleInjector.prototype.destroy = function () {
        if (this._destroyed) {
            throw new Error("The ng module " + stringify(this.instance.constructor) + " has already been destroyed.");
        }
        this._destroyed = true;
        this.destroyInternal();
        this._destroyListeners.forEach(function (listener) { return listener(); });
    };
    NgModuleInjector.prototype.onDestroy = function (callback) { this._destroyListeners.push(callback); };
    return NgModuleInjector;
}(CodegenComponentFactoryResolver));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Used to load ng module factories.
 * @stable
 */
var NgModuleFactoryLoader = (function () {
    function NgModuleFactoryLoader() {
    }
    return NgModuleFactoryLoader;
}());
var moduleFactories = new Map();
/**
 * Registers a loaded module. Should only be called from generated NgModuleFactory code.
 * @experimental
 */
function registerModuleFactory(id, factory) {
    var existing = moduleFactories.get(id);
    if (existing) {
        throw new Error("Duplicate module registered for " + id + " - " + existing.moduleType.name + " vs " + factory.moduleType.name);
    }
    moduleFactories.set(id, factory);
}

/**
 * Returns the NgModuleFactory with the given id, if it exists and has been loaded.
 * Factories for modules that do not specify an `id` cannot be retrieved. Throws if the module
 * cannot be found.
 * @experimental
 */
function getModuleFactory(id) {
    var factory = moduleFactories.get(id);
    if (!factory)
        throw new Error("No module with ID " + id + " loaded");
    return factory;
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * An unmodifiable list of items that Angular keeps up to date when the state
 * of the application changes.
 *
 * The type of object that {@link Query} and {@link ViewQueryMetadata} provide.
 *
 * Implements an iterable interface, therefore it can be used in both ES6
 * javascript `for (var i of items)` loops as well as in Angular templates with
 * `*ngFor="let i of myList"`.
 *
 * Changes can be observed by subscribing to the changes `Observable`.
 *
 * NOTE: In the future this class will implement an `Observable` interface.
 *
 * ### Example ([live demo](http://plnkr.co/edit/RX8sJnQYl9FWuSCWme5z?p=preview))
 * ```typescript
 * @Component({...})
 * class Container {
 *   @ViewChildren(Item) items:QueryList<Item>;
 * }
 * ```
 * @stable
 */
var QueryList = (function () {
    function QueryList() {
        this._dirty = true;
        this._results = [];
        this._emitter = new EventEmitter();
    }
    Object.defineProperty(QueryList.prototype, "changes", {
        get: function () { return this._emitter; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryList.prototype, "length", {
        get: function () { return this._results.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryList.prototype, "first", {
        get: function () { return this._results[0]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryList.prototype, "last", {
        get: function () { return this._results[this.length - 1]; },
        enumerable: true,
        configurable: true
    });
    /**
     * See
     * [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
     */
    QueryList.prototype.map = function (fn) { return this._results.map(fn); };
    /**
     * See
     * [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
     */
    QueryList.prototype.filter = function (fn) {
        return this._results.filter(fn);
    };
    /**
     * See
     * [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
     */
    QueryList.prototype.reduce = function (fn, init) {
        return this._results.reduce(fn, init);
    };
    /**
     * See
     * [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
     */
    QueryList.prototype.forEach = function (fn) { this._results.forEach(fn); };
    /**
     * See
     * [Array.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
     */
    QueryList.prototype.some = function (fn) {
        return this._results.some(fn);
    };
    QueryList.prototype.toArray = function () { return this._results.slice(); };
    QueryList.prototype[getSymbolIterator()] = function () { return this._results[getSymbolIterator()](); };
    QueryList.prototype.toString = function () { return this._results.toString(); };
    QueryList.prototype.reset = function (res) {
        this._results = ListWrapper.flatten(res);
        this._dirty = false;
    };
    QueryList.prototype.notifyOnChanges = function () { this._emitter.emit(this); };
    /** internal */
    QueryList.prototype.setDirty = function () { this._dirty = true; };
    Object.defineProperty(QueryList.prototype, "dirty", {
        /** internal */
        get: function () { return this._dirty; },
        enumerable: true,
        configurable: true
    });
    return QueryList;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var _SEPARATOR = '#';
var FACTORY_CLASS_SUFFIX = 'NgFactory';
/**
 * Configuration for SystemJsNgModuleLoader.
 * token.
 *
 * @experimental
 */
var SystemJsNgModuleLoaderConfig = (function () {
    function SystemJsNgModuleLoaderConfig() {
    }
    return SystemJsNgModuleLoaderConfig;
}());
var DEFAULT_CONFIG = {
    factoryPathPrefix: '',
    factoryPathSuffix: '.ngfactory',
};
/**
 * NgModuleFactoryLoader that uses SystemJS to load NgModuleFactory
 * @experimental
 */
var SystemJsNgModuleLoader = (function () {
    function SystemJsNgModuleLoader(_compiler, config) {
        this._compiler = _compiler;
        this._config = config || DEFAULT_CONFIG;
    }
    SystemJsNgModuleLoader.prototype.load = function (path) {
        var offlineMode = this._compiler instanceof Compiler;
        return offlineMode ? this.loadFactory(path) : this.loadAndCompile(path);
    };
    SystemJsNgModuleLoader.prototype.loadAndCompile = function (path) {
        var _this = this;
        var _a = path.split(_SEPARATOR), module = _a[0], exportName = _a[1];
        if (exportName === undefined)
            exportName = 'default';
        return System.import(module)
            .then(function (module) { return module[exportName]; })
            .then(function (type) { return checkNotEmpty(type, module, exportName); })
            .then(function (type) { return _this._compiler.compileModuleAsync(type); });
    };
    SystemJsNgModuleLoader.prototype.loadFactory = function (path) {
        var _a = path.split(_SEPARATOR), module = _a[0], exportName = _a[1];
        var factoryClassSuffix = FACTORY_CLASS_SUFFIX;
        if (exportName === undefined) {
            exportName = 'default';
            factoryClassSuffix = '';
        }
        return System.import(this._config.factoryPathPrefix + module + this._config.factoryPathSuffix)
            .then(function (module) { return module[exportName + factoryClassSuffix]; })
            .then(function (factory) { return checkNotEmpty(factory, module, exportName); });
    };
    SystemJsNgModuleLoader.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SystemJsNgModuleLoader.ctorParameters = [
        { type: Compiler, },
        { type: SystemJsNgModuleLoaderConfig, decorators: [{ type: Optional },] },
    ];
    return SystemJsNgModuleLoader;
}());
function checkNotEmpty(value, modulePath, exportName) {
    if (!value) {
        throw new Error("Cannot find '" + exportName + "' in '" + modulePath + "'");
    }
    return value;
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$15 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Represents an Embedded Template that can be used to instantiate Embedded Views.
 *
 * You can access a `TemplateRef`, in two ways. Via a directive placed on a `<template>` element (or
 * directive prefixed with `*`) and have the `TemplateRef` for this Embedded View injected into the
 * constructor of the directive using the `TemplateRef` Token. Alternatively you can query for the
 * `TemplateRef` from a Component or a Directive via {@link Query}.
 *
 * To instantiate Embedded Views based on a Template, use
 * {@link ViewContainerRef#createEmbeddedView}, which will create the View and attach it to the
 * View Container.
 * @stable
 */
var TemplateRef = (function () {
    function TemplateRef() {
    }
    Object.defineProperty(TemplateRef.prototype, "elementRef", {
        /**
         * The location in the View where the Embedded View logically belongs to.
         *
         * The data-binding and injection contexts of Embedded Views created from this `TemplateRef`
         * inherit from the contexts of this location.
         *
         * Typically new Embedded Views are attached to the View Container of this location, but in
         * advanced use-cases, the View can be attached to a different container while keeping the
         * data-binding and injection context from the original location.
         *
         */
        // TODO(i): rename to anchor or location
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    return TemplateRef;
}());
var TemplateRef_ = (function (_super) {
    __extends$15(TemplateRef_, _super);
    function TemplateRef_(_appElement, _viewFactory) {
        _super.call(this);
        this._appElement = _appElement;
        this._viewFactory = _viewFactory;
    }
    TemplateRef_.prototype.createEmbeddedView = function (context) {
        var view = this._viewFactory(this._appElement.parentView.viewUtils, this._appElement.parentInjector, this._appElement);
        view.create(context || {}, null, null);
        return view.ref;
    };
    Object.defineProperty(TemplateRef_.prototype, "elementRef", {
        get: function () { return this._appElement.elementRef; },
        enumerable: true,
        configurable: true
    });
    return TemplateRef_;
}(TemplateRef));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var _queuedAnimations = [];
/** @internal */
function queueAnimation(player) {
    _queuedAnimations.push(player);
}
/** @internal */
function triggerQueuedAnimations() {
    for (var i = 0; i < _queuedAnimations.length; i++) {
        var player = _queuedAnimations[i];
        player.play();
    }
    _queuedAnimations = [];
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$16 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @stable
 */
var ViewRef = (function () {
    function ViewRef() {
    }
    Object.defineProperty(ViewRef.prototype, "destroyed", {
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    return ViewRef;
}());
/**
 * Represents an Angular View.
 *
 * <!-- TODO: move the next two paragraphs to the dev guide -->
 * A View is a fundamental building block of the application UI. It is the smallest grouping of
 * Elements which are created and destroyed together.
 *
 * Properties of elements in a View can change, but the structure (number and order) of elements in
 * a View cannot. Changing the structure of Elements can only be done by inserting, moving or
 * removing nested Views via a {@link ViewContainerRef}. Each View can contain many View Containers.
 * <!-- /TODO -->
 *
 * ### Example
 *
 * Given this template...
 *
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <li *ngFor="let  item of items">{{item}}</li>
 * </ul>
 * ```
 *
 * We have two {@link TemplateRef}s:
 *
 * Outer {@link TemplateRef}:
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <template ngFor let-item [ngForOf]="items"></template>
 * </ul>
 * ```
 *
 * Inner {@link TemplateRef}:
 * ```
 *   <li>{{item}}</li>
 * ```
 *
 * Notice that the original template is broken down into two separate {@link TemplateRef}s.
 *
 * The outer/inner {@link TemplateRef}s are then assembled into views like so:
 *
 * ```
 * <!-- ViewRef: outer-0 -->
 * Count: 2
 * <ul>
 *   <template view-container-ref></template>
 *   <!-- ViewRef: inner-1 --><li>first</li><!-- /ViewRef: inner-1 -->
 *   <!-- ViewRef: inner-2 --><li>second</li><!-- /ViewRef: inner-2 -->
 * </ul>
 * <!-- /ViewRef: outer-0 -->
 * ```
 * @experimental
 */
var EmbeddedViewRef = (function (_super) {
    __extends$16(EmbeddedViewRef, _super);
    function EmbeddedViewRef() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(EmbeddedViewRef.prototype, "context", {
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmbeddedViewRef.prototype, "rootNodes", {
        get: function () { return unimplemented(); },
        enumerable: true,
        configurable: true
    });
    
    return EmbeddedViewRef;
}(ViewRef));
var ViewRef_ = (function () {
    function ViewRef_(_view) {
        this._view = _view;
        this._view = _view;
        this._originalMode = this._view.cdMode;
    }
    Object.defineProperty(ViewRef_.prototype, "internalView", {
        get: function () { return this._view; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewRef_.prototype, "rootNodes", {
        get: function () { return this._view.flatRootNodes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewRef_.prototype, "context", {
        get: function () { return this._view.context; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewRef_.prototype, "destroyed", {
        get: function () { return this._view.destroyed; },
        enumerable: true,
        configurable: true
    });
    ViewRef_.prototype.markForCheck = function () { this._view.markPathToRootAsCheckOnce(); };
    ViewRef_.prototype.detach = function () { this._view.cdMode = ChangeDetectorStatus.Detached; };
    ViewRef_.prototype.detectChanges = function () {
        this._view.detectChanges(false);
        triggerQueuedAnimations();
    };
    ViewRef_.prototype.checkNoChanges = function () { this._view.detectChanges(true); };
    ViewRef_.prototype.reattach = function () {
        this._view.cdMode = this._originalMode;
        this.markForCheck();
    };
    ViewRef_.prototype.onDestroy = function (callback) { this._view.disposables.push(callback); };
    ViewRef_.prototype.destroy = function () { this._view.destroy(); };
    return ViewRef_;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Public API for compiler

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$17 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventListener = (function () {
    function EventListener(name, callback) {
        this.name = name;
        this.callback = callback;
    }
    
    return EventListener;
}());
/**
 * @experimental All debugging apis are currently experimental.
 */
var DebugNode = (function () {
    function DebugNode(nativeNode, parent, _debugInfo) {
        this._debugInfo = _debugInfo;
        this.nativeNode = nativeNode;
        if (isPresent(parent) && parent instanceof DebugElement) {
            parent.addChild(this);
        }
        else {
            this.parent = null;
        }
        this.listeners = [];
    }
    Object.defineProperty(DebugNode.prototype, "injector", {
        get: function () { return isPresent(this._debugInfo) ? this._debugInfo.injector : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode.prototype, "componentInstance", {
        get: function () {
            return isPresent(this._debugInfo) ? this._debugInfo.component : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode.prototype, "context", {
        get: function () { return isPresent(this._debugInfo) ? this._debugInfo.context : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode.prototype, "references", {
        get: function () {
            return isPresent(this._debugInfo) ? this._debugInfo.references : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode.prototype, "providerTokens", {
        get: function () {
            return isPresent(this._debugInfo) ? this._debugInfo.providerTokens : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode.prototype, "source", {
        get: function () { return isPresent(this._debugInfo) ? this._debugInfo.source : null; },
        enumerable: true,
        configurable: true
    });
    return DebugNode;
}());
/**
 * @experimental All debugging apis are currently experimental.
 */
var DebugElement = (function (_super) {
    __extends$17(DebugElement, _super);
    function DebugElement(nativeNode, parent, _debugInfo) {
        _super.call(this, nativeNode, parent, _debugInfo);
        this.properties = {};
        this.attributes = {};
        this.classes = {};
        this.styles = {};
        this.childNodes = [];
        this.nativeElement = nativeNode;
    }
    DebugElement.prototype.addChild = function (child) {
        if (isPresent(child)) {
            this.childNodes.push(child);
            child.parent = this;
        }
    };
    DebugElement.prototype.removeChild = function (child) {
        var childIndex = this.childNodes.indexOf(child);
        if (childIndex !== -1) {
            child.parent = null;
            this.childNodes.splice(childIndex, 1);
        }
    };
    DebugElement.prototype.insertChildrenAfter = function (child, newChildren) {
        var siblingIndex = this.childNodes.indexOf(child);
        if (siblingIndex !== -1) {
            var previousChildren = this.childNodes.slice(0, siblingIndex + 1);
            var nextChildren = this.childNodes.slice(siblingIndex + 1);
            this.childNodes =
                ListWrapper.concat(ListWrapper.concat(previousChildren, newChildren), nextChildren);
            for (var i = 0; i < newChildren.length; ++i) {
                var newChild = newChildren[i];
                if (isPresent(newChild.parent)) {
                    newChild.parent.removeChild(newChild);
                }
                newChild.parent = this;
            }
        }
    };
    DebugElement.prototype.query = function (predicate) {
        var results = this.queryAll(predicate);
        return results.length > 0 ? results[0] : null;
    };
    DebugElement.prototype.queryAll = function (predicate) {
        var matches = [];
        _queryElementChildren(this, predicate, matches);
        return matches;
    };
    DebugElement.prototype.queryAllNodes = function (predicate) {
        var matches = [];
        _queryNodeChildren(this, predicate, matches);
        return matches;
    };
    Object.defineProperty(DebugElement.prototype, "children", {
        get: function () {
            var children = [];
            this.childNodes.forEach(function (node) {
                if (node instanceof DebugElement) {
                    children.push(node);
                }
            });
            return children;
        },
        enumerable: true,
        configurable: true
    });
    DebugElement.prototype.triggerEventHandler = function (eventName, eventObj) {
        this.listeners.forEach(function (listener) {
            if (listener.name == eventName) {
                listener.callback(eventObj);
            }
        });
    };
    return DebugElement;
}(DebugNode));
/**
 * @experimental
 */
function asNativeElements(debugEls) {
    return debugEls.map(function (el) { return el.nativeElement; });
}
function _queryElementChildren(element, predicate, matches) {
    element.childNodes.forEach(function (node) {
        if (node instanceof DebugElement) {
            if (predicate(node)) {
                matches.push(node);
            }
            _queryElementChildren(node, predicate, matches);
        }
    });
}
function _queryNodeChildren(parentNode, predicate, matches) {
    if (parentNode instanceof DebugElement) {
        parentNode.childNodes.forEach(function (node) {
            if (predicate(node)) {
                matches.push(node);
            }
            if (node instanceof DebugElement) {
                _queryNodeChildren(node, predicate, matches);
            }
        });
    }
}
// Need to keep the nodes in a global Map so that multiple angular apps are supported.
var _nativeNodeToDebugNode = new Map();
/**
 * @experimental
 */
function getDebugNode(nativeNode) {
    return _nativeNodeToDebugNode.get(nativeNode);
}

function indexDebugNode(node) {
    _nativeNodeToDebugNode.set(node.nativeNode, node);
}
function removeDebugNodeFromIndex(node) {
    _nativeNodeToDebugNode.delete(node.nativeNode);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Change detection enables data binding in Angular.
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function _reflector() {
    return reflector;
}
var _CORE_PLATFORM_PROVIDERS = [
    PlatformRef_, { provide: PlatformRef, useExisting: PlatformRef_ },
    { provide: Reflector, useFactory: _reflector, deps: [] },
    { provide: ReflectorReader, useExisting: Reflector }, TestabilityRegistry, Console
];
/**
 * This platform has to be included in any other platform
 *
 * @experimental
 */
var platformCore = createPlatformFactory(null, 'core', _CORE_PLATFORM_PROVIDERS);

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @experimental i18n support is experimental.
 */
var LOCALE_ID = new OpaqueToken('LocaleId');
/**
 * @experimental i18n support is experimental.
 */
var TRANSLATIONS = new OpaqueToken('Translations');
/**
 * @experimental i18n support is experimental.
 */
var TRANSLATIONS_FORMAT = new OpaqueToken('TranslationsFormat');

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function _iterableDiffersFactory() {
    return defaultIterableDiffers;
}
function _keyValueDiffersFactory() {
    return defaultKeyValueDiffers;
}
/**
 * This module includes the providers of @angular/core that are needed
 * to bootstrap components via `ApplicationRef`.
 *
 * @experimental
 */
var ApplicationModule = (function () {
    function ApplicationModule() {
    }
    ApplicationModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        ApplicationRef_,
                        { provide: ApplicationRef, useExisting: ApplicationRef_ },
                        ApplicationInitStatus,
                        Compiler,
                        APP_ID_RANDOM_PROVIDER,
                        ViewUtils,
                        { provide: IterableDiffers, useFactory: _iterableDiffersFactory },
                        { provide: KeyValueDiffers, useFactory: _keyValueDiffersFactory },
                        { provide: LOCALE_ID, useValue: 'en-US' },
                    ]
                },] },
    ];
    /** @nocollapse */
    ApplicationModule.ctorParameters = [];
    return ApplicationModule;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var FILL_STYLE_FLAG = 'true'; // TODO (matsko): change to boolean
var ANY_STATE = '*';
var DEFAULT_STATE = '*';
var EMPTY_STATE = 'void';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var Math$2 = _global.Math;

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var AnimationGroupPlayer = (function () {
    function AnimationGroupPlayer(_players) {
        var _this = this;
        this._players = _players;
        this._onDoneFns = [];
        this._onStartFns = [];
        this._finished = false;
        this._started = false;
        this.parentPlayer = null;
        var count = 0;
        var total = this._players.length;
        if (total == 0) {
            scheduleMicroTask(function () { return _this._onFinish(); });
        }
        else {
            this._players.forEach(function (player) {
                player.parentPlayer = _this;
                player.onDone(function () {
                    if (++count >= total) {
                        _this._onFinish();
                    }
                });
            });
        }
    }
    AnimationGroupPlayer.prototype._onFinish = function () {
        if (!this._finished) {
            this._finished = true;
            if (!isPresent(this.parentPlayer)) {
                this.destroy();
            }
            this._onDoneFns.forEach(function (fn) { return fn(); });
            this._onDoneFns = [];
        }
    };
    AnimationGroupPlayer.prototype.init = function () { this._players.forEach(function (player) { return player.init(); }); };
    AnimationGroupPlayer.prototype.onStart = function (fn) { this._onStartFns.push(fn); };
    AnimationGroupPlayer.prototype.onDone = function (fn) { this._onDoneFns.push(fn); };
    AnimationGroupPlayer.prototype.hasStarted = function () { return this._started; };
    AnimationGroupPlayer.prototype.play = function () {
        if (!isPresent(this.parentPlayer)) {
            this.init();
        }
        if (!this.hasStarted()) {
            this._onStartFns.forEach(function (fn) { return fn(); });
            this._onStartFns = [];
            this._started = true;
        }
        this._players.forEach(function (player) { return player.play(); });
    };
    AnimationGroupPlayer.prototype.pause = function () { this._players.forEach(function (player) { return player.pause(); }); };
    AnimationGroupPlayer.prototype.restart = function () { this._players.forEach(function (player) { return player.restart(); }); };
    AnimationGroupPlayer.prototype.finish = function () {
        this._onFinish();
        this._players.forEach(function (player) { return player.finish(); });
    };
    AnimationGroupPlayer.prototype.destroy = function () {
        this._onFinish();
        this._players.forEach(function (player) { return player.destroy(); });
    };
    AnimationGroupPlayer.prototype.reset = function () { this._players.forEach(function (player) { return player.reset(); }); };
    AnimationGroupPlayer.prototype.setPosition = function (p /** TODO #9100 */) {
        this._players.forEach(function (player) { player.setPosition(p); });
    };
    AnimationGroupPlayer.prototype.getPosition = function () {
        var min = 0;
        this._players.forEach(function (player) {
            var p = player.getPosition();
            min = Math$2.min(p, min);
        });
        return min;
    };
    return AnimationGroupPlayer;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var AnimationKeyframe = (function () {
    function AnimationKeyframe(offset, styles) {
        this.offset = offset;
        this.styles = styles;
    }
    return AnimationKeyframe;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var AnimationOutput = (function () {
    function AnimationOutput(name, phase, fullPropertyName) {
        this.name = name;
        this.phase = phase;
        this.fullPropertyName = fullPropertyName;
    }
    return AnimationOutput;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @experimental Animation support is experimental.
 */
var AnimationPlayer = (function () {
    function AnimationPlayer() {
    }
    Object.defineProperty(AnimationPlayer.prototype, "parentPlayer", {
        get: function () { throw new Error('NOT IMPLEMENTED: Base Class'); },
        set: function (player) { throw new Error('NOT IMPLEMENTED: Base Class'); },
        enumerable: true,
        configurable: true
    });
    return AnimationPlayer;
}());
var NoOpAnimationPlayer = (function () {
    function NoOpAnimationPlayer() {
        var _this = this;
        this._onDoneFns = [];
        this._onStartFns = [];
        this._started = false;
        this.parentPlayer = null;
        scheduleMicroTask(function () { return _this._onFinish(); });
    }
    /** @internal */
    NoOpAnimationPlayer.prototype._onFinish = function () {
        this._onDoneFns.forEach(function (fn) { return fn(); });
        this._onDoneFns = [];
    };
    NoOpAnimationPlayer.prototype.onStart = function (fn) { this._onStartFns.push(fn); };
    NoOpAnimationPlayer.prototype.onDone = function (fn) { this._onDoneFns.push(fn); };
    NoOpAnimationPlayer.prototype.hasStarted = function () { return this._started; };
    NoOpAnimationPlayer.prototype.init = function () { };
    NoOpAnimationPlayer.prototype.play = function () {
        if (!this.hasStarted()) {
            this._onStartFns.forEach(function (fn) { return fn(); });
            this._onStartFns = [];
        }
        this._started = true;
    };
    NoOpAnimationPlayer.prototype.pause = function () { };
    NoOpAnimationPlayer.prototype.restart = function () { };
    NoOpAnimationPlayer.prototype.finish = function () { this._onFinish(); };
    NoOpAnimationPlayer.prototype.destroy = function () { };
    NoOpAnimationPlayer.prototype.reset = function () { };
    NoOpAnimationPlayer.prototype.setPosition = function (p /** TODO #9100 */) { };
    NoOpAnimationPlayer.prototype.getPosition = function () { return 0; };
    return NoOpAnimationPlayer;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var AnimationSequencePlayer = (function () {
    function AnimationSequencePlayer(_players) {
        var _this = this;
        this._players = _players;
        this._currentIndex = 0;
        this._onDoneFns = [];
        this._onStartFns = [];
        this._finished = false;
        this._started = false;
        this.parentPlayer = null;
        this._players.forEach(function (player) { player.parentPlayer = _this; });
        this._onNext(false);
    }
    AnimationSequencePlayer.prototype._onNext = function (start) {
        var _this = this;
        if (this._finished)
            return;
        if (this._players.length == 0) {
            this._activePlayer = new NoOpAnimationPlayer();
            scheduleMicroTask(function () { return _this._onFinish(); });
        }
        else if (this._currentIndex >= this._players.length) {
            this._activePlayer = new NoOpAnimationPlayer();
            this._onFinish();
        }
        else {
            var player = this._players[this._currentIndex++];
            player.onDone(function () { return _this._onNext(true); });
            this._activePlayer = player;
            if (start) {
                player.play();
            }
        }
    };
    AnimationSequencePlayer.prototype._onFinish = function () {
        if (!this._finished) {
            this._finished = true;
            if (!isPresent(this.parentPlayer)) {
                this.destroy();
            }
            this._onDoneFns.forEach(function (fn) { return fn(); });
            this._onDoneFns = [];
        }
    };
    AnimationSequencePlayer.prototype.init = function () { this._players.forEach(function (player) { return player.init(); }); };
    AnimationSequencePlayer.prototype.onStart = function (fn) { this._onStartFns.push(fn); };
    AnimationSequencePlayer.prototype.onDone = function (fn) { this._onDoneFns.push(fn); };
    AnimationSequencePlayer.prototype.hasStarted = function () { return this._started; };
    AnimationSequencePlayer.prototype.play = function () {
        if (!isPresent(this.parentPlayer)) {
            this.init();
        }
        if (!this.hasStarted()) {
            this._onStartFns.forEach(function (fn) { return fn(); });
            this._onStartFns = [];
            this._started = true;
        }
        this._activePlayer.play();
    };
    AnimationSequencePlayer.prototype.pause = function () { this._activePlayer.pause(); };
    AnimationSequencePlayer.prototype.restart = function () {
        if (this._players.length > 0) {
            this.reset();
            this._players[0].restart();
        }
    };
    AnimationSequencePlayer.prototype.reset = function () { this._players.forEach(function (player) { return player.reset(); }); };
    AnimationSequencePlayer.prototype.finish = function () {
        this._onFinish();
        this._players.forEach(function (player) { return player.finish(); });
    };
    AnimationSequencePlayer.prototype.destroy = function () {
        this._onFinish();
        this._players.forEach(function (player) { return player.destroy(); });
    };
    AnimationSequencePlayer.prototype.setPosition = function (p /** TODO #9100 */) { this._players[0].setPosition(p); };
    AnimationSequencePlayer.prototype.getPosition = function () { return this._players[0].getPosition(); };
    return AnimationSequencePlayer;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$18 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @experimental Animation support is experimental.
 */
var AUTO_STYLE = '*';
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {@link trigger trigger
 * animation function} is called.
 *
 * @experimental Animation support is experimental.
 */
var AnimationEntryMetadata = (function () {
    function AnimationEntryMetadata(name, definitions) {
        this.name = name;
        this.definitions = definitions;
    }
    return AnimationEntryMetadata;
}());
/**
 * @experimental Animation support is experimental.
 */
var AnimationStateMetadata = (function () {
    function AnimationStateMetadata() {
    }
    return AnimationStateMetadata;
}());
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {@link state state animation
 * function} is called.
 *
 * @experimental Animation support is experimental.
 */
var AnimationStateDeclarationMetadata = (function (_super) {
    __extends$18(AnimationStateDeclarationMetadata, _super);
    function AnimationStateDeclarationMetadata(stateNameExpr, styles) {
        _super.call(this);
        this.stateNameExpr = stateNameExpr;
        this.styles = styles;
    }
    return AnimationStateDeclarationMetadata;
}(AnimationStateMetadata));
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the
 * {@link transition transition animation function} is called.
 *
 * @experimental Animation support is experimental.
 */
var AnimationStateTransitionMetadata = (function (_super) {
    __extends$18(AnimationStateTransitionMetadata, _super);
    function AnimationStateTransitionMetadata(stateChangeExpr, steps) {
        _super.call(this);
        this.stateChangeExpr = stateChangeExpr;
        this.steps = steps;
    }
    return AnimationStateTransitionMetadata;
}(AnimationStateMetadata));
/**
 * @experimental Animation support is experimental.
 */
var AnimationMetadata = (function () {
    function AnimationMetadata() {
    }
    return AnimationMetadata;
}());
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {@link keyframes keyframes
 * animation function} is called.
 *
 * @experimental Animation support is experimental.
 */
var AnimationKeyframesSequenceMetadata = (function (_super) {
    __extends$18(AnimationKeyframesSequenceMetadata, _super);
    function AnimationKeyframesSequenceMetadata(steps) {
        _super.call(this);
        this.steps = steps;
    }
    return AnimationKeyframesSequenceMetadata;
}(AnimationMetadata));
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {@link style style animation
 * function} is called.
 *
 * @experimental Animation support is experimental.
 */
var AnimationStyleMetadata = (function (_super) {
    __extends$18(AnimationStyleMetadata, _super);
    function AnimationStyleMetadata(styles, offset) {
        if (offset === void 0) { offset = null; }
        _super.call(this);
        this.styles = styles;
        this.offset = offset;
    }
    return AnimationStyleMetadata;
}(AnimationMetadata));
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {@link animate animate
 * animation function} is called.
 *
 * @experimental Animation support is experimental.
 */
var AnimationAnimateMetadata = (function (_super) {
    __extends$18(AnimationAnimateMetadata, _super);
    function AnimationAnimateMetadata(timings, styles) {
        _super.call(this);
        this.timings = timings;
        this.styles = styles;
    }
    return AnimationAnimateMetadata;
}(AnimationMetadata));
/**
 * @experimental Animation support is experimental.
 */
var AnimationWithStepsMetadata = (function (_super) {
    __extends$18(AnimationWithStepsMetadata, _super);
    function AnimationWithStepsMetadata() {
        _super.call(this);
    }
    Object.defineProperty(AnimationWithStepsMetadata.prototype, "steps", {
        get: function () { throw new Error('NOT IMPLEMENTED: Base Class'); },
        enumerable: true,
        configurable: true
    });
    return AnimationWithStepsMetadata;
}(AnimationMetadata));
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {@link sequence sequence
 * animation function} is called.
 *
 * @experimental Animation support is experimental.
 */
var AnimationSequenceMetadata = (function (_super) {
    __extends$18(AnimationSequenceMetadata, _super);
    function AnimationSequenceMetadata(_steps) {
        _super.call(this);
        this._steps = _steps;
    }
    Object.defineProperty(AnimationSequenceMetadata.prototype, "steps", {
        get: function () { return this._steps; },
        enumerable: true,
        configurable: true
    });
    return AnimationSequenceMetadata;
}(AnimationWithStepsMetadata));
/**
 * Metadata representing the entry of animations.
 * Instances of this class are provided via the animation DSL when the {@link group group animation
 * function} is called.
 *
 * @experimental Animation support is experimental.
 */
var AnimationGroupMetadata = (function (_super) {
    __extends$18(AnimationGroupMetadata, _super);
    function AnimationGroupMetadata(_steps) {
        _super.call(this);
        this._steps = _steps;
    }
    Object.defineProperty(AnimationGroupMetadata.prototype, "steps", {
        get: function () { return this._steps; },
        enumerable: true,
        configurable: true
    });
    return AnimationGroupMetadata;
}(AnimationWithStepsMetadata));
/**
 * `animate` is an animation-specific function that is designed to be used inside of Angular2's
 * animation
 * DSL language. If this information is new, please navigate to the
 * {@link Component#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `animate` specifies an animation step that will apply the provided `styles` data for a given
 * amount of
 * time based on the provided `timing` expression value. Calls to `animate` are expected to be
 * used within {@link sequence an animation sequence}, {@link group group}, or {@link transition
 * transition}.
 *
 * ### Usage
 *
 * The `animate` function accepts two input parameters: `timing` and `styles`:
 *
 * - `timing` is a string based value that can be a combination of a duration with optional
 * delay and easing values. The format for the expression breaks down to `duration delay easing`
 * (therefore a value such as `1s 100ms ease-out` will be parse itself into `duration=1000,
 * delay=100, easing=ease-out`.
 * If a numeric value is provided then that will be used as the `duration` value in millisecond
 * form.
 * - `styles` is the style input data which can either be a call to {@link style style} or {@link
 * keyframes keyframes}.
 * If left empty then the styles from the destination state will be collected and used (this is
 * useful when
 * describing an animation step that will complete an animation by {@link
 * transition#the-final-animate-call animating to the final state}).
 *
 * ```typescript
 * // various functions for specifying timing data
 * animate(500, style(...))
 * animate("1s", style(...))
 * animate("100ms 0.5s", style(...))
 * animate("5s ease", style(...))
 * animate("5s 10ms cubic-bezier(.17,.67,.88,.1)", style(...))
 *
 * // either style() of keyframes() can be used
 * animate(500, style({ background: "red" }))
 * animate(500, keyframes([
 *   style({ background: "blue" })),
 *   style({ background: "red" }))
 * ])
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {@example core/animation/ts/dsl/animation_example.ts region='Component'}
 *
 * @experimental Animation support is experimental.
 */
function animate(timing, styles) {
    if (styles === void 0) { styles = null; }
    var stylesEntry = styles;
    if (!isPresent(stylesEntry)) {
        var EMPTY_STYLE = {};
        stylesEntry = new AnimationStyleMetadata([EMPTY_STYLE], 1);
    }
    return new AnimationAnimateMetadata(timing, stylesEntry);
}
/**
 * `group` is an animation-specific function that is designed to be used inside of Angular2's
 * animation
 * DSL language. If this information is new, please navigate to the
 * {@link Component#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `group` specifies a list of animation steps that are all run in parallel. Grouped animations
 * are useful when a series of styles must be animated/closed off
 * at different statrting/ending times.
 *
 * The `group` function can either be used within a {@link sequence sequence} or a {@link transition
 * transition}
 * and it will only continue to the next instruction once all of the inner animation steps
 * have completed.
 *
 * ### Usage
 *
 * The `steps` data that is passed into the `group` animation function can either consist
 * of {@link style style} or {@link animate animate} function calls. Each call to `style()` or
 * `animate()`
 * within a group will be executed instantly (use {@link keyframes keyframes} or a
 * {@link animate#usage animate() with a delay value} to offset styles to be applied at a later
 * time).
 *
 * ```typescript
 * group([
 *   animate("1s", { background: "black" }))
 *   animate("2s", { color: "white" }))
 * ])
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {@example core/animation/ts/dsl/animation_example.ts region='Component'}
 *
 * @experimental Animation support is experimental.
 */
function group(steps) {
    return new AnimationGroupMetadata(steps);
}
/**
 * `sequence` is an animation-specific function that is designed to be used inside of Angular2's
 * animation
 * DSL language. If this information is new, please navigate to the
 * {@link Component#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `sequence` Specifies a list of animation steps that are run one by one. (`sequence` is used
 * by default when an array is passed as animation data into {@link transition transition}.)
 *
 * The `sequence` function can either be used within a {@link group group} or a {@link transition
 * transition}
 * and it will only continue to the next instruction once each of the inner animation steps
 * have completed.
 *
 * To perform animation styling in parallel with other animation steps then
 * have a look at the {@link group group} animation function.
 *
 * ### Usage
 *
 * The `steps` data that is passed into the `sequence` animation function can either consist
 * of {@link style style} or {@link animate animate} function calls. A call to `style()` will apply
 * the
 * provided styling data immediately while a call to `animate()` will apply its styling
 * data over a given time depending on its timing data.
 *
 * ```typescript
 * sequence([
 *   style({ opacity: 0 })),
 *   animate("1s", { opacity: 1 }))
 * ])
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {@example core/animation/ts/dsl/animation_example.ts region='Component'}
 *
 * @experimental Animation support is experimental.
 */
function sequence(steps) {
    return new AnimationSequenceMetadata(steps);
}
/**
 * `style` is an animation-specific function that is designed to be used inside of Angular2's
 * animation
 * DSL language. If this information is new, please navigate to the
 * {@link Component#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `style` declares a key/value object containing CSS properties/styles that can then
 * be used for {@link state animation states}, within an {@link sequence animation sequence}, or as
 * styling data for both {@link animate animate} and {@link keyframes keyframes}.
 *
 * ### Usage
 *
 * `style` takes in a key/value string map as data and expects one or more CSS property/value
 * pairs to be defined.
 *
 * ```typescript
 * // string values are used for css properties
 * style({ background: "red", color: "blue" })
 *
 * // numerical (pixel) values are also supported
 * style({ width: 100, height: 0 })
 * ```
 *
 * #### Auto-styles (using `*`)
 *
 * When an asterix (`*`) character is used as a value then it will be detected from the element
 * being animated
 * and applied as animation data when the animation starts.
 *
 * This feature proves useful for a state depending on layout and/or environment factors; in such
 * cases
 * the styles are calculated just before the animation starts.
 *
 * ```typescript
 * // the steps below will animate from 0 to the
 * // actual height of the element
 * style({ height: 0 }),
 * animate("1s", style({ height: "*" }))
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {@example core/animation/ts/dsl/animation_example.ts region='Component'}
 *
 * @experimental Animation support is experimental.
 */
function style(tokens) {
    var input;
    var offset = null;
    if (isString(tokens)) {
        input = [tokens];
    }
    else {
        if (isArray(tokens)) {
            input = tokens;
        }
        else {
            input = [tokens];
        }
        input.forEach(function (entry) {
            var entryOffset = entry['offset'];
            if (isPresent(entryOffset)) {
                offset = offset == null ? parseFloat(entryOffset) : offset;
            }
        });
    }
    return new AnimationStyleMetadata(input, offset);
}
/**
 * `state` is an animation-specific function that is designed to be used inside of Angular2's
 * animation
 * DSL language. If this information is new, please navigate to the
 * {@link Component#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `state` declares an animation state within the given trigger. When a state is
 * active within a component then its associated styles will persist on
 * the element that the trigger is attached to (even when the animation ends).
 *
 * To animate between states, have a look at the animation {@link transition transition}
 * DSL function. To register states to an animation trigger please have a look
 * at the {@link trigger trigger} function.
 *
 * #### The `void` state
 *
 * The `void` state value is a reserved word that angular uses to determine when the element is not
 * apart
 * of the application anymore (e.g. when an `ngIf` evaluates to false then the state of the
 * associated element
 * is void).
 *
 * #### The `*` (default) state
 *
 * The `*` state (when styled) is a fallback state that will be used if
 * the state that is being animated is not declared within the trigger.
 *
 * ### Usage
 *
 * `state` will declare an animation state with its associated styles
 * within the given trigger.
 *
 * - `stateNameExpr` can be one or more state names separated by commas.
 * - `styles` refers to the {@link style styling data} that will be persisted on the element once
 * the state
 * has been reached.
 *
 * ```typescript
 * // "void" is a reserved name for a state and is used to represent
 * // the state in which an element is detached from from the application.
 * state("void", style({ height: 0 }))
 *
 * // user-defined states
 * state("closed", style({ height: 0 }))
 * state("open, visible", style({ height: "*" }))
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {@example core/animation/ts/dsl/animation_example.ts region='Component'}
 *
 * @experimental Animation support is experimental.
 */
function state(stateNameExpr, styles) {
    return new AnimationStateDeclarationMetadata(stateNameExpr, styles);
}
/**
 * `keyframes` is an animation-specific function that is designed to be used inside of Angular2's
 * animation
 * DSL language. If this information is new, please navigate to the
 * {@link Component#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `keyframes` specifies a collection of {@link style style} entries each optionally characterized
 * by an `offset` value.
 *
 * ### Usage
 *
 * The `keyframes` animation function is designed to be used alongside the {@link animate animate}
 * animation function. Instead of applying animations from where they are
 * currently to their destination, keyframes can describe how each style entry is applied
 * and at what point within the animation arc (much like CSS Keyframe Animations do).
 *
 * For each `style()` entry an `offset` value can be set. Doing so allows to specifiy at
 * what percentage of the animate time the styles will be applied.
 *
 * ```typescript
 * // the provided offset values describe when each backgroundColor value is applied.
 * animate("5s", keyframes([
 *   style({ backgroundColor: "red", offset: 0 }),
 *   style({ backgroundColor: "blue", offset: 0.2 }),
 *   style({ backgroundColor: "orange", offset: 0.3 }),
 *   style({ backgroundColor: "black", offset: 1 })
 * ]))
 * ```
 *
 * Alternatively, if there are no `offset` values used within the style entries then the offsets
 * will
 * be calculated automatically.
 *
 * ```typescript
 * animate("5s", keyframes([
 *   style({ backgroundColor: "red" }) // offset = 0
 *   style({ backgroundColor: "blue" }) // offset = 0.33
 *   style({ backgroundColor: "orange" }) // offset = 0.66
 *   style({ backgroundColor: "black" }) // offset = 1
 * ]))
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {@example core/animation/ts/dsl/animation_example.ts region='Component'}
 *
 * @experimental Animation support is experimental.
 */
function keyframes(steps) {
    return new AnimationKeyframesSequenceMetadata(steps);
}
/**
 * `transition` is an animation-specific function that is designed to be used inside of Angular2's
 * animation
 * DSL language. If this information is new, please navigate to the
 * {@link Component#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `transition` declares the {@link sequence sequence of animation steps} that will be run when the
 * provided
 * `stateChangeExpr` value is satisfied. The `stateChangeExpr` consists of a `state1 => state2`
 * which consists
 * of two known states (use an asterix (`*`) to refer to a dynamic starting and/or ending state).
 *
 * Animation transitions are placed within an {@link trigger animation trigger}. For an transition
 * to animate to
 * a state value and persist its styles then one or more {@link state animation states} is expected
 * to be defined.
 *
 * ### Usage
 *
 * An animation transition is kicked off the `stateChangeExpr` predicate evaluates to true based on
 * what the
 * previous state is and what the current state has become. In other words, if a transition is
 * defined that
 * matches the old/current state criteria then the associated animation will be triggered.
 *
 * ```typescript
 * // all transition/state changes are defined within an animation trigger
 * trigger("myAnimationTrigger", [
 *   // if a state is defined then its styles will be persisted when the
 *   // animation has fully completed itself
 *   state("on", style({ background: "green" })),
 *   state("off", style({ background: "grey" })),
 *
 *   // a transition animation that will be kicked off when the state value
 *   // bound to "myAnimationTrigger" changes from "on" to "off"
 *   transition("on => off", animate(500)),
 *
 *   // it is also possible to do run the same animation for both directions
 *   transition("on <=> off", animate(500)),
 *
 *   // or to define multiple states pairs separated by commas
 *   transition("on => off, off => void", animate(500)),
 *
 *   // this is a catch-all state change for when an element is inserted into
 *   // the page and the destination state is unknown
 *   transition("void => *", [
 *     style({ opacity: 0 }),
 *     animate(500)
 *   ]),
 *
 *   // this will capture a state change between any states
 *   transition("* => *", animate("1s 0s")),
 * ])
 * ```
 *
 * The template associated with this component will make use of the `myAnimationTrigger`
 * animation trigger by binding to an element within its template code.
 *
 * ```html
 * <!-- somewhere inside of my-component-tpl.html -->
 * <div [@myAnimationTrigger]="myStatusExp">...</div>
 * ```
 *
 * #### The final `animate` call
 *
 * If the final step within the transition steps is a call to `animate()` that **only**
 * uses a timing value with **no style data** then it will be automatically used as the final
 * animation
 * arc for the element to animate itself to the final state. This involves an automatic mix of
 * adding/removing CSS styles so that the element will be in the exact state it should be for the
 * applied state to be presented correctly.
 *
 * ```
 * // start off by hiding the element, but make sure that it animates properly to whatever state
 * // is currently active for "myAnimationTrigger"
 * transition("void => *", [
 *   style({ opacity: 0 }),
 *   animate(500)
 * ])
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {@example core/animation/ts/dsl/animation_example.ts region='Component'}
 *
 * @experimental Animation support is experimental.
 */
function transition(stateChangeExpr, steps) {
    var animationData = isArray(steps) ? new AnimationSequenceMetadata(steps) :
        steps;
    return new AnimationStateTransitionMetadata(stateChangeExpr, animationData);
}
/**
 * `trigger` is an animation-specific function that is designed to be used inside of Angular2's
 * animation
 * DSL language. If this information is new, please navigate to the
 * {@link Component#animations-anchor component animations metadata
 * page} to gain a better understanding of how animations in Angular2 are used.
 *
 * `trigger` Creates an animation trigger which will a list of {@link state state} and {@link
 * transition transition}
 * entries that will be evaluated when the expression bound to the trigger changes.
 *
 * Triggers are registered within the component annotation data under the
 * {@link Component#animations-anchor animations section}. An animation trigger can
 * be placed on an element within a template by referencing the name of the
 * trigger followed by the expression value that the trigger is bound to
 * (in the form of `[@triggerName]="expression"`.
 *
 * ### Usage
 *
 * `trigger` will create an animation trigger reference based on the provided `name` value.
 * The provided `animation` value is expected to be an array consisting of {@link state state} and
 * {@link transition transition}
 * declarations.
 *
 * ```typescript
 * @Component({
 *   selector: 'my-component',
 *   templateUrl: 'my-component-tpl.html',
 *   animations: [
 *     trigger("myAnimationTrigger", [
 *       state(...),
 *       state(...),
 *       transition(...),
 *       transition(...)
 *     ])
 *   ]
 * })
 * class MyComponent {
 *   myStatusExp = "something";
 * }
 * ```
 *
 * The template associated with this component will make use of the `myAnimationTrigger`
 * animation trigger by binding to an element within its template code.
 *
 * ```html
 * <!-- somewhere inside of my-component-tpl.html -->
 * <div [@myAnimationTrigger]="myStatusExp">...</div>
 * ```
 *
 * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
 *
 * {@example core/animation/ts/dsl/animation_example.ts region='Component'}
 *
 * @experimental Animation support is experimental.
 */
function trigger(name, animation) {
    return new AnimationEntryMetadata(name, animation);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function prepareFinalAnimationStyles(previousStyles, newStyles, nullValue) {
    if (nullValue === void 0) { nullValue = null; }
    var finalStyles = {};
    StringMapWrapper.forEach(newStyles, function (value, prop) {
        finalStyles[prop] = value == AUTO_STYLE ? nullValue : value.toString();
    });
    StringMapWrapper.forEach(previousStyles, function (value, prop) {
        if (!isPresent(finalStyles[prop])) {
            finalStyles[prop] = nullValue;
        }
    });
    return finalStyles;
}
function balanceAnimationKeyframes(collectedStyles, finalStateStyles, keyframes$$1) {
    var limit = keyframes$$1.length - 1;
    var firstKeyframe = keyframes$$1[0];
    // phase 1: copy all the styles from the first keyframe into the lookup map
    var flatenedFirstKeyframeStyles = flattenStyles(firstKeyframe.styles.styles);
    var extraFirstKeyframeStyles = {};
    var hasExtraFirstStyles = false;
    StringMapWrapper.forEach(collectedStyles, function (value, prop) {
        // if the style is already defined in the first keyframe then
        // we do not replace it.
        if (!flatenedFirstKeyframeStyles[prop]) {
            flatenedFirstKeyframeStyles[prop] = value;
            extraFirstKeyframeStyles[prop] = value;
            hasExtraFirstStyles = true;
        }
    });
    var keyframeCollectedStyles = StringMapWrapper.merge({}, flatenedFirstKeyframeStyles);
    // phase 2: normalize the final keyframe
    var finalKeyframe = keyframes$$1[limit];
    ListWrapper.insert(finalKeyframe.styles.styles, 0, finalStateStyles);
    var flatenedFinalKeyframeStyles = flattenStyles(finalKeyframe.styles.styles);
    var extraFinalKeyframeStyles = {};
    var hasExtraFinalStyles = false;
    StringMapWrapper.forEach(keyframeCollectedStyles, function (value, prop) {
        if (!isPresent(flatenedFinalKeyframeStyles[prop])) {
            extraFinalKeyframeStyles[prop] = AUTO_STYLE;
            hasExtraFinalStyles = true;
        }
    });
    if (hasExtraFinalStyles) {
        finalKeyframe.styles.styles.push(extraFinalKeyframeStyles);
    }
    StringMapWrapper.forEach(flatenedFinalKeyframeStyles, function (value, prop) {
        if (!isPresent(flatenedFirstKeyframeStyles[prop])) {
            extraFirstKeyframeStyles[prop] = AUTO_STYLE;
            hasExtraFirstStyles = true;
        }
    });
    if (hasExtraFirstStyles) {
        firstKeyframe.styles.styles.push(extraFirstKeyframeStyles);
    }
    return keyframes$$1;
}
function clearStyles(styles) {
    var finalStyles = {};
    StringMapWrapper.keys(styles).forEach(function (key) { finalStyles[key] = null; });
    return finalStyles;
}
function collectAndResolveStyles(collection, styles) {
    return styles.map(function (entry) {
        var stylesObj = {};
        StringMapWrapper.forEach(entry, function (value, prop) {
            if (value == FILL_STYLE_FLAG) {
                value = collection[prop];
                if (!isPresent(value)) {
                    value = AUTO_STYLE;
                }
            }
            collection[prop] = value;
            stylesObj[prop] = value;
        });
        return stylesObj;
    });
}
function renderStyles(element, renderer, styles) {
    StringMapWrapper.forEach(styles, function (value, prop) { renderer.setElementStyle(element, prop, value); });
}
function flattenStyles(styles) {
    var finalStyles = {};
    styles.forEach(function (entry) {
        StringMapWrapper.forEach(entry, function (value, prop) { finalStyles[prop] = value; });
    });
    return finalStyles;
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var AnimationStyles = (function () {
    function AnimationStyles(styles) {
        this.styles = styles;
    }
    return AnimationStyles;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var DebugDomRootRenderer = (function () {
    function DebugDomRootRenderer(_delegate) {
        this._delegate = _delegate;
    }
    DebugDomRootRenderer.prototype.renderComponent = function (componentProto) {
        return new DebugDomRenderer(this._delegate.renderComponent(componentProto));
    };
    return DebugDomRootRenderer;
}());
var DebugDomRenderer = (function () {
    function DebugDomRenderer(_delegate) {
        this._delegate = _delegate;
    }
    DebugDomRenderer.prototype.selectRootElement = function (selectorOrNode, debugInfo) {
        var nativeEl = this._delegate.selectRootElement(selectorOrNode, debugInfo);
        var debugEl = new DebugElement(nativeEl, null, debugInfo);
        indexDebugNode(debugEl);
        return nativeEl;
    };
    DebugDomRenderer.prototype.createElement = function (parentElement, name, debugInfo) {
        var nativeEl = this._delegate.createElement(parentElement, name, debugInfo);
        var debugEl = new DebugElement(nativeEl, getDebugNode(parentElement), debugInfo);
        debugEl.name = name;
        indexDebugNode(debugEl);
        return nativeEl;
    };
    DebugDomRenderer.prototype.createViewRoot = function (hostElement) { return this._delegate.createViewRoot(hostElement); };
    DebugDomRenderer.prototype.createTemplateAnchor = function (parentElement, debugInfo) {
        var comment = this._delegate.createTemplateAnchor(parentElement, debugInfo);
        var debugEl = new DebugNode(comment, getDebugNode(parentElement), debugInfo);
        indexDebugNode(debugEl);
        return comment;
    };
    DebugDomRenderer.prototype.createText = function (parentElement, value, debugInfo) {
        var text = this._delegate.createText(parentElement, value, debugInfo);
        var debugEl = new DebugNode(text, getDebugNode(parentElement), debugInfo);
        indexDebugNode(debugEl);
        return text;
    };
    DebugDomRenderer.prototype.projectNodes = function (parentElement, nodes) {
        var debugParent = getDebugNode(parentElement);
        if (isPresent(debugParent) && debugParent instanceof DebugElement) {
            var debugElement_1 = debugParent;
            nodes.forEach(function (node) { debugElement_1.addChild(getDebugNode(node)); });
        }
        this._delegate.projectNodes(parentElement, nodes);
    };
    DebugDomRenderer.prototype.attachViewAfter = function (node, viewRootNodes) {
        var debugNode = getDebugNode(node);
        if (isPresent(debugNode)) {
            var debugParent = debugNode.parent;
            if (viewRootNodes.length > 0 && isPresent(debugParent)) {
                var debugViewRootNodes = [];
                viewRootNodes.forEach(function (rootNode) { return debugViewRootNodes.push(getDebugNode(rootNode)); });
                debugParent.insertChildrenAfter(debugNode, debugViewRootNodes);
            }
        }
        this._delegate.attachViewAfter(node, viewRootNodes);
    };
    DebugDomRenderer.prototype.detachView = function (viewRootNodes) {
        viewRootNodes.forEach(function (node) {
            var debugNode = getDebugNode(node);
            if (isPresent(debugNode) && isPresent(debugNode.parent)) {
                debugNode.parent.removeChild(debugNode);
            }
        });
        this._delegate.detachView(viewRootNodes);
    };
    DebugDomRenderer.prototype.destroyView = function (hostElement, viewAllNodes) {
        viewAllNodes.forEach(function (node) { removeDebugNodeFromIndex(getDebugNode(node)); });
        this._delegate.destroyView(hostElement, viewAllNodes);
    };
    DebugDomRenderer.prototype.listen = function (renderElement, name, callback) {
        var debugEl = getDebugNode(renderElement);
        if (isPresent(debugEl)) {
            debugEl.listeners.push(new EventListener(name, callback));
        }
        return this._delegate.listen(renderElement, name, callback);
    };
    DebugDomRenderer.prototype.listenGlobal = function (target, name, callback) {
        return this._delegate.listenGlobal(target, name, callback);
    };
    DebugDomRenderer.prototype.setElementProperty = function (renderElement, propertyName, propertyValue) {
        var debugEl = getDebugNode(renderElement);
        if (isPresent(debugEl) && debugEl instanceof DebugElement) {
            debugEl.properties[propertyName] = propertyValue;
        }
        this._delegate.setElementProperty(renderElement, propertyName, propertyValue);
    };
    DebugDomRenderer.prototype.setElementAttribute = function (renderElement, attributeName, attributeValue) {
        var debugEl = getDebugNode(renderElement);
        if (isPresent(debugEl) && debugEl instanceof DebugElement) {
            debugEl.attributes[attributeName] = attributeValue;
        }
        this._delegate.setElementAttribute(renderElement, attributeName, attributeValue);
    };
    DebugDomRenderer.prototype.setBindingDebugInfo = function (renderElement, propertyName, propertyValue) {
        this._delegate.setBindingDebugInfo(renderElement, propertyName, propertyValue);
    };
    DebugDomRenderer.prototype.setElementClass = function (renderElement, className, isAdd) {
        var debugEl = getDebugNode(renderElement);
        if (isPresent(debugEl) && debugEl instanceof DebugElement) {
            debugEl.classes[className] = isAdd;
        }
        this._delegate.setElementClass(renderElement, className, isAdd);
    };
    DebugDomRenderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) {
        var debugEl = getDebugNode(renderElement);
        if (isPresent(debugEl) && debugEl instanceof DebugElement) {
            debugEl.styles[styleName] = styleValue;
        }
        this._delegate.setElementStyle(renderElement, styleName, styleValue);
    };
    DebugDomRenderer.prototype.invokeElementMethod = function (renderElement, methodName, args) {
        this._delegate.invokeElementMethod(renderElement, methodName, args);
    };
    DebugDomRenderer.prototype.setText = function (renderNode, text) { this._delegate.setText(renderNode, text); };
    DebugDomRenderer.prototype.animate = function (element, startingStyles, keyframes, duration, delay, easing) {
        return this._delegate.animate(element, startingStyles, keyframes, duration, delay, easing);
    };
    return DebugDomRenderer;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var StaticNodeDebugInfo = (function () {
    function StaticNodeDebugInfo(providerTokens, componentToken, refTokens) {
        this.providerTokens = providerTokens;
        this.componentToken = componentToken;
        this.refTokens = refTokens;
    }
    return StaticNodeDebugInfo;
}());
var DebugContext = (function () {
    function DebugContext(_view, _nodeIndex, _tplRow, _tplCol) {
        this._view = _view;
        this._nodeIndex = _nodeIndex;
        this._tplRow = _tplRow;
        this._tplCol = _tplCol;
    }
    Object.defineProperty(DebugContext.prototype, "_staticNodeInfo", {
        get: function () {
            return isPresent(this._nodeIndex) ? this._view.staticNodeDebugInfos[this._nodeIndex] : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugContext.prototype, "context", {
        get: function () { return this._view.context; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugContext.prototype, "component", {
        get: function () {
            var staticNodeInfo = this._staticNodeInfo;
            if (isPresent(staticNodeInfo) && isPresent(staticNodeInfo.componentToken)) {
                return this.injector.get(staticNodeInfo.componentToken);
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugContext.prototype, "componentRenderElement", {
        get: function () {
            var componentView = this._view;
            while (isPresent(componentView.declarationAppElement) &&
                componentView.type !== ViewType.COMPONENT) {
                componentView = componentView.declarationAppElement.parentView;
            }
            return isPresent(componentView.declarationAppElement) ?
                componentView.declarationAppElement.nativeElement :
                null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugContext.prototype, "injector", {
        get: function () { return this._view.injector(this._nodeIndex); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugContext.prototype, "renderNode", {
        get: function () {
            if (isPresent(this._nodeIndex) && this._view.allNodes) {
                return this._view.allNodes[this._nodeIndex];
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugContext.prototype, "providerTokens", {
        get: function () {
            var staticNodeInfo = this._staticNodeInfo;
            return isPresent(staticNodeInfo) ? staticNodeInfo.providerTokens : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugContext.prototype, "source", {
        get: function () {
            return this._view.componentType.templateUrl + ":" + this._tplRow + ":" + this._tplCol;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugContext.prototype, "references", {
        get: function () {
            var _this = this;
            var varValues = {};
            var staticNodeInfo = this._staticNodeInfo;
            if (isPresent(staticNodeInfo)) {
                var refs = staticNodeInfo.refTokens;
                StringMapWrapper.forEach(refs, function (refToken, refName) {
                    var varValue;
                    if (isBlank(refToken)) {
                        varValue = _this._view.allNodes ? _this._view.allNodes[_this._nodeIndex] : null;
                    }
                    else {
                        varValue = _this._view.injectorGet(refToken, _this._nodeIndex, null);
                    }
                    varValues[refName] = varValue;
                });
            }
            return varValues;
        },
        enumerable: true,
        configurable: true
    });
    return DebugContext;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * An instance of this class is returned as an event parameter when an animation
 * callback is captured for an animation either during the start or done phase.
 *
 * ```typescript
 * @Component({
 *   host: {
 *     '[@myAnimationTrigger]': 'someExpression',
 *     '(@myAnimationTrigger.start)': 'captureStartEvent($event)',
 *     '(@myAnimationTrigger.done)': 'captureDoneEvent($event)',
 *   },
 *   animations: [
 *     trigger("myAnimationTrigger", [
 *        // ...
 *     ])
 *   ]
 * })
 * class MyComponent {
 *   someExpression: any = false;
 *   captureStartEvent(event: AnimationTransitionEvent) {
 *     // the toState, fromState and totalTime data is accessible from the event variable
 *   }
 *
 *   captureDoneEvent(event: AnimationTransitionEvent) {
 *     // the toState, fromState and totalTime data is accessible from the event variable
 *   }
 * }
 * ```
 *
 * @experimental Animation support is experimental.
 */
var AnimationTransitionEvent = (function () {
    function AnimationTransitionEvent(_a) {
        var fromState = _a.fromState, toState = _a.toState, totalTime = _a.totalTime;
        this.fromState = fromState;
        this.toState = toState;
        this.totalTime = totalTime;
    }
    return AnimationTransitionEvent;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ViewAnimationMap = (function () {
    function ViewAnimationMap() {
        this._map = new Map$1();
        this._allPlayers = [];
    }
    Object.defineProperty(ViewAnimationMap.prototype, "length", {
        get: function () { return this.getAllPlayers().length; },
        enumerable: true,
        configurable: true
    });
    ViewAnimationMap.prototype.find = function (element, animationName) {
        var playersByAnimation = this._map.get(element);
        if (isPresent(playersByAnimation)) {
            return playersByAnimation[animationName];
        }
    };
    ViewAnimationMap.prototype.findAllPlayersByElement = function (element) {
        var el = this._map.get(element);
        return el ? StringMapWrapper.values(el) : [];
    };
    ViewAnimationMap.prototype.set = function (element, animationName, player) {
        var playersByAnimation = this._map.get(element);
        if (!isPresent(playersByAnimation)) {
            playersByAnimation = {};
        }
        var existingEntry = playersByAnimation[animationName];
        if (isPresent(existingEntry)) {
            this.remove(element, animationName);
        }
        playersByAnimation[animationName] = player;
        this._allPlayers.push(player);
        this._map.set(element, playersByAnimation);
    };
    ViewAnimationMap.prototype.getAllPlayers = function () { return this._allPlayers; };
    ViewAnimationMap.prototype.remove = function (element, animationName) {
        var playersByAnimation = this._map.get(element);
        if (isPresent(playersByAnimation)) {
            var player = playersByAnimation[animationName];
            delete playersByAnimation[animationName];
            var index = this._allPlayers.indexOf(player);
            ListWrapper.removeAt(this._allPlayers, index);
            if (StringMapWrapper.isEmpty(playersByAnimation)) {
                this._map.delete(element);
            }
        }
    };
    return ViewAnimationMap;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$20 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _UNDEFINED$1 = new Object();
var ElementInjector = (function (_super) {
    __extends$20(ElementInjector, _super);
    function ElementInjector(_view, _nodeIndex) {
        _super.call(this);
        this._view = _view;
        this._nodeIndex = _nodeIndex;
    }
    ElementInjector.prototype.get = function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = THROW_IF_NOT_FOUND; }
        var result = _UNDEFINED$1;
        if (result === _UNDEFINED$1) {
            result = this._view.injectorGet(token, this._nodeIndex, _UNDEFINED$1);
        }
        if (result === _UNDEFINED$1) {
            result = this._view.parentInjector.get(token, notFoundValue);
        }
        return result;
    };
    return ElementInjector;
}(Injector));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$19 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _scope_check = wtfCreateScope("AppView#check(ascii id)");
/**
 * Cost of making objects: http://jsperf.com/instantiate-size-of-object
 *
 */
var AppView = (function () {
    function AppView(clazz, componentType, type, viewUtils, parentInjector, declarationAppElement, cdMode) {
        this.clazz = clazz;
        this.componentType = componentType;
        this.type = type;
        this.viewUtils = viewUtils;
        this.parentInjector = parentInjector;
        this.declarationAppElement = declarationAppElement;
        this.cdMode = cdMode;
        this.contentChildren = [];
        this.viewChildren = [];
        this.viewContainerElement = null;
        this.numberOfChecks = 0;
        this.animationPlayers = new ViewAnimationMap();
        this._animationListeners = new Map();
        this.ref = new ViewRef_(this);
        if (type === ViewType.COMPONENT || type === ViewType.HOST) {
            this.renderer = viewUtils.renderComponent(componentType);
        }
        else {
            this.renderer = declarationAppElement.parentView.renderer;
        }
    }
    Object.defineProperty(AppView.prototype, "destroyed", {
        get: function () { return this.cdMode === ChangeDetectorStatus.Destroyed; },
        enumerable: true,
        configurable: true
    });
    AppView.prototype.cancelActiveAnimation = function (element, animationName, removeAllAnimations) {
        if (removeAllAnimations === void 0) { removeAllAnimations = false; }
        if (removeAllAnimations) {
            this.animationPlayers.findAllPlayersByElement(element).forEach(function (player) { return player.destroy(); });
        }
        else {
            var player = this.animationPlayers.find(element, animationName);
            if (isPresent(player)) {
                player.destroy();
            }
        }
    };
    AppView.prototype.queueAnimation = function (element, animationName, player, totalTime, fromState, toState) {
        var _this = this;
        queueAnimation(player);
        var event = new AnimationTransitionEvent({ 'fromState': fromState, 'toState': toState, 'totalTime': totalTime });
        this.animationPlayers.set(element, animationName, player);
        player.onDone(function () {
            // TODO: make this into a datastructure for done|start
            _this.triggerAnimationOutput(element, animationName, 'done', event);
            _this.animationPlayers.remove(element, animationName);
        });
        player.onStart(function () { _this.triggerAnimationOutput(element, animationName, 'start', event); });
    };
    AppView.prototype.triggerAnimationOutput = function (element, animationName, phase, event) {
        var listeners = this._animationListeners.get(element);
        if (isPresent(listeners) && listeners.length) {
            for (var i = 0; i < listeners.length; i++) {
                var listener = listeners[i];
                // we check for both the name in addition to the phase in the event
                // that there may be more than one @trigger on the same element
                if (listener.output.name == animationName && listener.output.phase == phase) {
                    listener.handler(event);
                    break;
                }
            }
        }
    };
    AppView.prototype.registerAnimationOutput = function (element, outputEvent, eventHandler) {
        var entry = new _AnimationOutputWithHandler(outputEvent, eventHandler);
        var animations = this._animationListeners.get(element);
        if (!isPresent(animations)) {
            this._animationListeners.set(element, animations = []);
        }
        animations.push(entry);
    };
    AppView.prototype.create = function (context, givenProjectableNodes, rootSelectorOrNode) {
        this.context = context;
        var projectableNodes;
        switch (this.type) {
            case ViewType.COMPONENT:
                projectableNodes = ensureSlotCount(givenProjectableNodes, this.componentType.slotCount);
                break;
            case ViewType.EMBEDDED:
                projectableNodes = this.declarationAppElement.parentView.projectableNodes;
                break;
            case ViewType.HOST:
                // Note: Don't ensure the slot count for the projectableNodes as we store
                // them only for the contained component view (which will later check the slot count...)
                projectableNodes = givenProjectableNodes;
                break;
        }
        this._hasExternalHostElement = isPresent(rootSelectorOrNode);
        this.projectableNodes = projectableNodes;
        return this.createInternal(rootSelectorOrNode);
    };
    /**
     * Overwritten by implementations.
     * Returns the AppElement for the host element for ViewType.HOST.
     */
    AppView.prototype.createInternal = function (rootSelectorOrNode) { return null; };
    AppView.prototype.init = function (rootNodesOrAppElements, allNodes, disposables, subscriptions) {
        this.rootNodesOrAppElements = rootNodesOrAppElements;
        this.allNodes = allNodes;
        this.disposables = disposables;
        this.subscriptions = subscriptions;
        if (this.type === ViewType.COMPONENT) {
            // Note: the render nodes have been attached to their host element
            // in the ViewFactory already.
            this.declarationAppElement.parentView.viewChildren.push(this);
            this.dirtyParentQueriesInternal();
        }
    };
    AppView.prototype.selectOrCreateHostElement = function (elementName, rootSelectorOrNode, debugInfo) {
        var hostElement;
        if (isPresent(rootSelectorOrNode)) {
            hostElement = this.renderer.selectRootElement(rootSelectorOrNode, debugInfo);
        }
        else {
            hostElement = this.renderer.createElement(null, elementName, debugInfo);
        }
        return hostElement;
    };
    AppView.prototype.injectorGet = function (token, nodeIndex, notFoundResult) {
        return this.injectorGetInternal(token, nodeIndex, notFoundResult);
    };
    /**
     * Overwritten by implementations
     */
    AppView.prototype.injectorGetInternal = function (token, nodeIndex, notFoundResult) {
        return notFoundResult;
    };
    AppView.prototype.injector = function (nodeIndex) {
        if (isPresent(nodeIndex)) {
            return new ElementInjector(this, nodeIndex);
        }
        else {
            return this.parentInjector;
        }
    };
    AppView.prototype.destroy = function () {
        if (this._hasExternalHostElement) {
            this.renderer.detachView(this.flatRootNodes);
        }
        else if (isPresent(this.viewContainerElement)) {
            this.viewContainerElement.detachView(this.viewContainerElement.nestedViews.indexOf(this));
        }
        this._destroyRecurse();
    };
    AppView.prototype._destroyRecurse = function () {
        if (this.cdMode === ChangeDetectorStatus.Destroyed) {
            return;
        }
        var children = this.contentChildren;
        for (var i = 0; i < children.length; i++) {
            children[i]._destroyRecurse();
        }
        children = this.viewChildren;
        for (var i = 0; i < children.length; i++) {
            children[i]._destroyRecurse();
        }
        this.destroyLocal();
        this.cdMode = ChangeDetectorStatus.Destroyed;
    };
    AppView.prototype.destroyLocal = function () {
        var _this = this;
        var hostElement = this.type === ViewType.COMPONENT ? this.declarationAppElement.nativeElement : null;
        for (var i = 0; i < this.disposables.length; i++) {
            this.disposables[i]();
        }
        for (var i = 0; i < this.subscriptions.length; i++) {
            this.subscriptions[i].unsubscribe();
        }
        this.destroyInternal();
        this.dirtyParentQueriesInternal();
        if (this.animationPlayers.length == 0) {
            this.renderer.destroyView(hostElement, this.allNodes);
        }
        else {
            var player = new AnimationGroupPlayer(this.animationPlayers.getAllPlayers());
            player.onDone(function () { _this.renderer.destroyView(hostElement, _this.allNodes); });
        }
    };
    /**
     * Overwritten by implementations
     */
    AppView.prototype.destroyInternal = function () { };
    /**
     * Overwritten by implementations
     */
    AppView.prototype.detachInternal = function () { };
    AppView.prototype.detach = function () {
        var _this = this;
        this.detachInternal();
        if (this.animationPlayers.length == 0) {
            this.renderer.detachView(this.flatRootNodes);
        }
        else {
            var player = new AnimationGroupPlayer(this.animationPlayers.getAllPlayers());
            player.onDone(function () { _this.renderer.detachView(_this.flatRootNodes); });
        }
    };
    Object.defineProperty(AppView.prototype, "changeDetectorRef", {
        get: function () { return this.ref; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppView.prototype, "parent", {
        get: function () {
            return isPresent(this.declarationAppElement) ? this.declarationAppElement.parentView : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppView.prototype, "flatRootNodes", {
        get: function () { return flattenNestedViewRenderNodes(this.rootNodesOrAppElements); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppView.prototype, "lastRootNode", {
        get: function () {
            var lastNode = this.rootNodesOrAppElements.length > 0 ?
                this.rootNodesOrAppElements[this.rootNodesOrAppElements.length - 1] :
                null;
            return _findLastRenderNode(lastNode);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Overwritten by implementations
     */
    AppView.prototype.dirtyParentQueriesInternal = function () { };
    AppView.prototype.detectChanges = function (throwOnChange) {
        var s = _scope_check(this.clazz);
        if (this.cdMode === ChangeDetectorStatus.Checked ||
            this.cdMode === ChangeDetectorStatus.Errored)
            return;
        if (this.cdMode === ChangeDetectorStatus.Destroyed) {
            this.throwDestroyedError('detectChanges');
        }
        this.detectChangesInternal(throwOnChange);
        if (this.cdMode === ChangeDetectorStatus.CheckOnce)
            this.cdMode = ChangeDetectorStatus.Checked;
        this.numberOfChecks++;
        wtfLeave(s);
    };
    /**
     * Overwritten by implementations
     */
    AppView.prototype.detectChangesInternal = function (throwOnChange) {
        this.detectContentChildrenChanges(throwOnChange);
        this.detectViewChildrenChanges(throwOnChange);
    };
    AppView.prototype.detectContentChildrenChanges = function (throwOnChange) {
        for (var i = 0; i < this.contentChildren.length; ++i) {
            var child = this.contentChildren[i];
            if (child.cdMode === ChangeDetectorStatus.Detached)
                continue;
            child.detectChanges(throwOnChange);
        }
    };
    AppView.prototype.detectViewChildrenChanges = function (throwOnChange) {
        for (var i = 0; i < this.viewChildren.length; ++i) {
            var child = this.viewChildren[i];
            if (child.cdMode === ChangeDetectorStatus.Detached)
                continue;
            child.detectChanges(throwOnChange);
        }
    };
    AppView.prototype.markContentChildAsMoved = function (renderAppElement) { this.dirtyParentQueriesInternal(); };
    AppView.prototype.addToContentChildren = function (renderAppElement) {
        renderAppElement.parentView.contentChildren.push(this);
        this.viewContainerElement = renderAppElement;
        this.dirtyParentQueriesInternal();
    };
    AppView.prototype.removeFromContentChildren = function (renderAppElement) {
        ListWrapper.remove(renderAppElement.parentView.contentChildren, this);
        this.dirtyParentQueriesInternal();
        this.viewContainerElement = null;
    };
    AppView.prototype.markAsCheckOnce = function () { this.cdMode = ChangeDetectorStatus.CheckOnce; };
    AppView.prototype.markPathToRootAsCheckOnce = function () {
        var c = this;
        while (isPresent(c) && c.cdMode !== ChangeDetectorStatus.Detached) {
            if (c.cdMode === ChangeDetectorStatus.Checked) {
                c.cdMode = ChangeDetectorStatus.CheckOnce;
            }
            var parentEl = c.type === ViewType.COMPONENT ? c.declarationAppElement : c.viewContainerElement;
            c = isPresent(parentEl) ? parentEl.parentView : null;
        }
    };
    AppView.prototype.eventHandler = function (cb) { return cb; };
    AppView.prototype.throwDestroyedError = function (details) { throw new ViewDestroyedError(details); };
    return AppView;
}());
var DebugAppView = (function (_super) {
    __extends$19(DebugAppView, _super);
    function DebugAppView(clazz, componentType, type, viewUtils, parentInjector, declarationAppElement, cdMode, staticNodeDebugInfos) {
        _super.call(this, clazz, componentType, type, viewUtils, parentInjector, declarationAppElement, cdMode);
        this.staticNodeDebugInfos = staticNodeDebugInfos;
        this._currentDebugContext = null;
    }
    DebugAppView.prototype.create = function (context, givenProjectableNodes, rootSelectorOrNode) {
        this._resetDebug();
        try {
            return _super.prototype.create.call(this, context, givenProjectableNodes, rootSelectorOrNode);
        }
        catch (e) {
            this._rethrowWithContext(e);
            throw e;
        }
    };
    DebugAppView.prototype.injectorGet = function (token, nodeIndex, notFoundResult) {
        this._resetDebug();
        try {
            return _super.prototype.injectorGet.call(this, token, nodeIndex, notFoundResult);
        }
        catch (e) {
            this._rethrowWithContext(e);
            throw e;
        }
    };
    DebugAppView.prototype.detach = function () {
        this._resetDebug();
        try {
            _super.prototype.detach.call(this);
        }
        catch (e) {
            this._rethrowWithContext(e);
            throw e;
        }
    };
    DebugAppView.prototype.destroyLocal = function () {
        this._resetDebug();
        try {
            _super.prototype.destroyLocal.call(this);
        }
        catch (e) {
            this._rethrowWithContext(e);
            throw e;
        }
    };
    DebugAppView.prototype.detectChanges = function (throwOnChange) {
        this._resetDebug();
        try {
            _super.prototype.detectChanges.call(this, throwOnChange);
        }
        catch (e) {
            this._rethrowWithContext(e);
            throw e;
        }
    };
    DebugAppView.prototype._resetDebug = function () { this._currentDebugContext = null; };
    DebugAppView.prototype.debug = function (nodeIndex, rowNum, colNum) {
        return this._currentDebugContext = new DebugContext(this, nodeIndex, rowNum, colNum);
    };
    DebugAppView.prototype._rethrowWithContext = function (e) {
        if (!(e instanceof ViewWrappedError)) {
            if (!(e instanceof ExpressionChangedAfterItHasBeenCheckedError)) {
                this.cdMode = ChangeDetectorStatus.Errored;
            }
            if (isPresent(this._currentDebugContext)) {
                throw new ViewWrappedError(e, this._currentDebugContext);
            }
        }
    };
    DebugAppView.prototype.eventHandler = function (cb) {
        var _this = this;
        var superHandler = _super.prototype.eventHandler.call(this, cb);
        return function (event) {
            _this._resetDebug();
            try {
                return superHandler(event);
            }
            catch (e) {
                _this._rethrowWithContext(e);
                throw e;
            }
        };
    };
    return DebugAppView;
}(AppView));
function _findLastRenderNode(node) {
    var lastNode;
    if (node instanceof AppElement) {
        var appEl = node;
        lastNode = appEl.nativeElement;
        if (isPresent(appEl.nestedViews)) {
            // Note: Views might have no root nodes at all!
            for (var i = appEl.nestedViews.length - 1; i >= 0; i--) {
                var nestedView = appEl.nestedViews[i];
                if (nestedView.rootNodesOrAppElements.length > 0) {
                    lastNode = _findLastRenderNode(nestedView.rootNodesOrAppElements[nestedView.rootNodesOrAppElements.length - 1]);
                }
            }
        }
    }
    else {
        lastNode = node;
    }
    return lastNode;
}
var _AnimationOutputWithHandler = (function () {
    function _AnimationOutputWithHandler(output, handler) {
        this.output = output;
        this.handler = handler;
    }
    return _AnimationOutputWithHandler;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __core_private__ = {
    isDefaultChangeDetectionStrategy: isDefaultChangeDetectionStrategy,
    ChangeDetectorStatus: ChangeDetectorStatus,
    CHANGE_DETECTION_STRATEGY_VALUES: CHANGE_DETECTION_STRATEGY_VALUES,
    constructDependencies: constructDependencies,
    LifecycleHooks: LifecycleHooks,
    LIFECYCLE_HOOKS_VALUES: LIFECYCLE_HOOKS_VALUES,
    ReflectorReader: ReflectorReader,
    CodegenComponentFactoryResolver: CodegenComponentFactoryResolver,
    AppElement: AppElement,
    AppView: AppView,
    DebugAppView: DebugAppView,
    NgModuleInjector: NgModuleInjector,
    registerModuleFactory: registerModuleFactory,
    ViewType: ViewType,
    MAX_INTERPOLATION_VALUES: MAX_INTERPOLATION_VALUES,
    checkBinding: checkBinding,
    flattenNestedViewRenderNodes: flattenNestedViewRenderNodes,
    interpolate: interpolate,
    ViewUtils: ViewUtils,
    VIEW_ENCAPSULATION_VALUES: VIEW_ENCAPSULATION_VALUES,
    ViewMetadata: ViewMetadata,
    DebugContext: DebugContext,
    StaticNodeDebugInfo: StaticNodeDebugInfo,
    devModeEqual: devModeEqual,
    UNINITIALIZED: UNINITIALIZED,
    ValueUnwrapper: ValueUnwrapper,
    RenderDebugInfo: RenderDebugInfo,
    TemplateRef_: TemplateRef_,
    ReflectionCapabilities: ReflectionCapabilities,
    makeDecorator: makeDecorator,
    DebugDomRootRenderer: DebugDomRootRenderer,
    EMPTY_ARRAY: EMPTY_ARRAY,
    EMPTY_MAP: EMPTY_MAP,
    pureProxy1: pureProxy1,
    pureProxy2: pureProxy2,
    pureProxy3: pureProxy3,
    pureProxy4: pureProxy4,
    pureProxy5: pureProxy5,
    pureProxy6: pureProxy6,
    pureProxy7: pureProxy7,
    pureProxy8: pureProxy8,
    pureProxy9: pureProxy9,
    pureProxy10: pureProxy10,
    castByValue: castByValue,
    Console: Console,
    reflector: reflector,
    Reflector: Reflector,
    NoOpAnimationPlayer: NoOpAnimationPlayer,
    AnimationPlayer: AnimationPlayer,
    AnimationSequencePlayer: AnimationSequencePlayer,
    AnimationGroupPlayer: AnimationGroupPlayer,
    AnimationKeyframe: AnimationKeyframe,
    prepareFinalAnimationStyles: prepareFinalAnimationStyles,
    balanceAnimationKeyframes: balanceAnimationKeyframes,
    flattenStyles: flattenStyles,
    clearStyles: clearStyles,
    renderStyles: renderStyles,
    collectAndResolveStyles: collectAndResolveStyles,
    AnimationStyles: AnimationStyles,
    AnimationOutput: AnimationOutput,
    ANY_STATE: ANY_STATE,
    DEFAULT_STATE: DEFAULT_STATE,
    EMPTY_STATE: EMPTY_STATE,
    FILL_STYLE_FLAG: FILL_STYLE_FLAG,
    ComponentStillLoadingError: ComponentStillLoadingError
};

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point from which you should import all public core APIs.
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the core package.
 */



var index = Object.freeze({
	createPlatform: createPlatform,
	assertPlatform: assertPlatform,
	destroyPlatform: destroyPlatform,
	getPlatform: getPlatform,
	PlatformRef: PlatformRef,
	ApplicationRef: ApplicationRef,
	enableProdMode: enableProdMode,
	isDevMode: isDevMode,
	createPlatformFactory: createPlatformFactory,
	APP_ID: APP_ID,
	PACKAGE_ROOT_URL: PACKAGE_ROOT_URL,
	PLATFORM_INITIALIZER: PLATFORM_INITIALIZER,
	APP_BOOTSTRAP_LISTENER: APP_BOOTSTRAP_LISTENER,
	APP_INITIALIZER: APP_INITIALIZER,
	ApplicationInitStatus: ApplicationInitStatus,
	DebugElement: DebugElement,
	DebugNode: DebugNode,
	asNativeElements: asNativeElements,
	getDebugNode: getDebugNode,
	Testability: Testability,
	TestabilityRegistry: TestabilityRegistry,
	setTestabilityGetter: setTestabilityGetter,
	TRANSLATIONS: TRANSLATIONS,
	TRANSLATIONS_FORMAT: TRANSLATIONS_FORMAT,
	LOCALE_ID: LOCALE_ID,
	ApplicationModule: ApplicationModule,
	wtfCreateScope: wtfCreateScope,
	wtfLeave: wtfLeave,
	wtfStartTimeRange: wtfStartTimeRange,
	wtfEndTimeRange: wtfEndTimeRange,
	Type: Type,
	EventEmitter: EventEmitter,
	ErrorHandler: ErrorHandler,
	AnimationTransitionEvent: AnimationTransitionEvent,
	AnimationPlayer: AnimationPlayer,
	Sanitizer: Sanitizer,
	get SecurityContext () { return SecurityContext; },
	ANALYZE_FOR_ENTRY_COMPONENTS: ANALYZE_FOR_ENTRY_COMPONENTS,
	Attribute: Attribute,
	ContentChild: ContentChild,
	ContentChildren: ContentChildren,
	Query: Query,
	ViewChild: ViewChild,
	ViewChildren: ViewChildren,
	Component: Component,
	Directive: Directive,
	HostBinding: HostBinding,
	HostListener: HostListener,
	Input: Input,
	Output: Output,
	Pipe: Pipe,
	AfterContentChecked: AfterContentChecked,
	AfterContentInit: AfterContentInit,
	AfterViewChecked: AfterViewChecked,
	AfterViewInit: AfterViewInit,
	DoCheck: DoCheck,
	OnChanges: OnChanges,
	OnDestroy: OnDestroy,
	OnInit: OnInit,
	CUSTOM_ELEMENTS_SCHEMA: CUSTOM_ELEMENTS_SCHEMA,
	NO_ERRORS_SCHEMA: NO_ERRORS_SCHEMA,
	NgModule: NgModule,
	get ViewEncapsulation () { return ViewEncapsulation; },
	Class: Class,
	forwardRef: forwardRef,
	resolveForwardRef: resolveForwardRef,
	Injector: Injector,
	ReflectiveInjector: ReflectiveInjector,
	ResolvedReflectiveFactory: ResolvedReflectiveFactory,
	ReflectiveKey: ReflectiveKey,
	OpaqueToken: OpaqueToken,
	Inject: Inject,
	Optional: Optional,
	Injectable: Injectable,
	Self: Self,
	SkipSelf: SkipSelf,
	Host: Host,
	NgZone: NgZone,
	RenderComponentType: RenderComponentType,
	Renderer: Renderer,
	RootRenderer: RootRenderer,
	COMPILER_OPTIONS: COMPILER_OPTIONS,
	Compiler: Compiler,
	CompilerFactory: CompilerFactory,
	ModuleWithComponentFactories: ModuleWithComponentFactories,
	ComponentFactory: ComponentFactory,
	ComponentRef: ComponentRef,
	ComponentFactoryResolver: ComponentFactoryResolver,
	ElementRef: ElementRef,
	NgModuleFactory: NgModuleFactory,
	NgModuleRef: NgModuleRef,
	NgModuleFactoryLoader: NgModuleFactoryLoader,
	getModuleFactory: getModuleFactory,
	QueryList: QueryList,
	SystemJsNgModuleLoader: SystemJsNgModuleLoader,
	SystemJsNgModuleLoaderConfig: SystemJsNgModuleLoaderConfig,
	TemplateRef: TemplateRef,
	ViewContainerRef: ViewContainerRef,
	EmbeddedViewRef: EmbeddedViewRef,
	ViewRef: ViewRef,
	get ChangeDetectionStrategy () { return ChangeDetectionStrategy; },
	ChangeDetectorRef: ChangeDetectorRef,
	CollectionChangeRecord: CollectionChangeRecord,
	DefaultIterableDiffer: DefaultIterableDiffer,
	IterableDiffers: IterableDiffers,
	KeyValueChangeRecord: KeyValueChangeRecord,
	KeyValueDiffers: KeyValueDiffers,
	SimpleChange: SimpleChange,
	WrappedValue: WrappedValue,
	platformCore: platformCore,
	__core_private__: __core_private__,
	AUTO_STYLE: AUTO_STYLE,
	AnimationEntryMetadata: AnimationEntryMetadata,
	AnimationStateMetadata: AnimationStateMetadata,
	AnimationStateDeclarationMetadata: AnimationStateDeclarationMetadata,
	AnimationStateTransitionMetadata: AnimationStateTransitionMetadata,
	AnimationMetadata: AnimationMetadata,
	AnimationKeyframesSequenceMetadata: AnimationKeyframesSequenceMetadata,
	AnimationStyleMetadata: AnimationStyleMetadata,
	AnimationAnimateMetadata: AnimationAnimateMetadata,
	AnimationWithStepsMetadata: AnimationWithStepsMetadata,
	AnimationSequenceMetadata: AnimationSequenceMetadata,
	AnimationGroupMetadata: AnimationGroupMetadata,
	animate: animate,
	group: group,
	sequence: sequence,
	style: style,
	state: state,
	keyframes: keyframes,
	transition: transition,
	trigger: trigger
});

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * `LocationStrategy` is responsible for representing and reading route state
 * from the browser's URL. Angular provides two strategies:
 * {@link HashLocationStrategy} and {@link PathLocationStrategy} (default).
 *
 * This is used under the hood of the {@link Location} service.
 *
 * Applications should use the {@link Router} or {@link Location} services to
 * interact with application route state.
 *
 * For instance, {@link HashLocationStrategy} produces URLs like
 * `http://example.com#/foo`, and {@link PathLocationStrategy} produces
 * `http://example.com/foo` as an equivalent URL.
 *
 * See these two classes for more.
 *
 * @stable
 */
var LocationStrategy = (function () {
    function LocationStrategy() {
    }
    return LocationStrategy;
}());
/**
 * The `APP_BASE_HREF` token represents the base href to be used with the
 * {@link PathLocationStrategy}.
 *
 * If you're using {@link PathLocationStrategy}, you must provide a provider to a string
 * representing the URL prefix that should be preserved when generating and recognizing
 * URLs.
 *
 * ### Example
 *
 * ```typescript
 * import {Component, NgModule} from '@angular/core';
 * import {APP_BASE_HREF} from '@angular/common';
 *
 * @NgModule({
 *   providers: [{provide: APP_BASE_HREF, useValue: '/my/app'}]
 * })
 * class AppModule {}
 * ```
 *
 * @stable
 */
var APP_BASE_HREF = new OpaqueToken('appBaseHref');

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var globalScope$1;
if (typeof window === 'undefined') {
    if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
        // TODO: Replace any with WorkerGlobalScope from lib.webworker.d.ts #3492
        globalScope$1 = self;
    }
    else {
        globalScope$1 = global;
    }
}
else {
    globalScope$1 = window;
}

// Need to declare a new variable for global here since TypeScript
// exports the original value of the symbol.
var _global$1 = globalScope$1;
function getTypeNameForDebugging$1(type) {
    if (type['name']) {
        return type['name'];
    }
    return typeof type;
}

var Date$2 = _global$1.Date;
// TODO: remove calls to assert in production environment
// Note: Can't just export this and import in in other files
// as `assert` is a reserved keyword in Dart
_global$1.assert = function assert(condition) {
    // TODO: to be fixed properly via #2830, noop for now
};
function isPresent$1(obj) {
    return obj !== undefined && obj !== null;
}
function isBlank$1(obj) {
    return obj === undefined || obj === null;
}

function isNumber$1(obj) {
    return typeof obj === 'number';
}
function isString$1(obj) {
    return typeof obj === 'string';
}
function isFunction$2(obj) {
    return typeof obj === 'function';
}

function isStringMap$1(obj) {
    return typeof obj === 'object' && obj !== null;
}

function isPromise$1(obj) {
    // allow any Promise/A+ compliant thenable.
    // It's up to the caller to ensure that obj.then conforms to the spec
    return isPresent$1(obj) && isFunction$2(obj.then);
}
function isArray$3(obj) {
    return Array.isArray(obj);
}
function isDate$1(obj) {
    return obj instanceof Date$2 && !isNaN(obj.valueOf());
}

function stringify$1(token) {
    if (typeof token === 'string') {
        return token;
    }
    if (token === undefined || token === null) {
        return '' + token;
    }
    if (token.overriddenName) {
        return token.overriddenName;
    }
    if (token.name) {
        return token.name;
    }
    var res = token.toString();
    var newLineIndex = res.indexOf('\n');
    return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
}
// serialize / deserialize enum exist only for consistency with dart API
// enums in typescript don't need to be serialized



var StringWrapper$1 = (function () {
    function StringWrapper() {
    }
    StringWrapper.fromCharCode = function (code) { return String.fromCharCode(code); };
    StringWrapper.charCodeAt = function (s, index) { return s.charCodeAt(index); };
    StringWrapper.split = function (s, regExp) { return s.split(regExp); };
    StringWrapper.equals = function (s, s2) { return s === s2; };
    StringWrapper.stripLeft = function (s, charVal) {
        if (s && s.length) {
            var pos = 0;
            for (var i = 0; i < s.length; i++) {
                if (s[i] != charVal)
                    break;
                pos++;
            }
            s = s.substring(pos);
        }
        return s;
    };
    StringWrapper.stripRight = function (s, charVal) {
        if (s && s.length) {
            var pos = s.length;
            for (var i = s.length - 1; i >= 0; i--) {
                if (s[i] != charVal)
                    break;
                pos--;
            }
            s = s.substring(0, pos);
        }
        return s;
    };
    StringWrapper.replace = function (s, from, replace) {
        return s.replace(from, replace);
    };
    StringWrapper.replaceAll = function (s, from, replace) {
        return s.replace(from, replace);
    };
    StringWrapper.slice = function (s, from, to) {
        if (from === void 0) { from = 0; }
        if (to === void 0) { to = null; }
        return s.slice(from, to === null ? undefined : to);
    };
    StringWrapper.replaceAllMapped = function (s, from, cb) {
        return s.replace(from, function () {
            var matches = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                matches[_i - 0] = arguments[_i];
            }
            // Remove offset & string from the result array
            matches.splice(-2, 2);
            // The callback receives match, p1, ..., pn
            return cb(matches);
        });
    };
    StringWrapper.contains = function (s, substr) { return s.indexOf(substr) != -1; };
    StringWrapper.compare = function (a, b) {
        if (a < b) {
            return -1;
        }
        else if (a > b) {
            return 1;
        }
        else {
            return 0;
        }
    };
    return StringWrapper;
}());

var NumberWrapper$1 = (function () {
    function NumberWrapper() {
    }
    NumberWrapper.toFixed = function (n, fractionDigits) { return n.toFixed(fractionDigits); };
    NumberWrapper.equal = function (a, b) { return a === b; };
    NumberWrapper.parseIntAutoRadix = function (text) {
        var result = parseInt(text);
        if (isNaN(result)) {
            throw new Error('Invalid integer literal when parsing ' + text);
        }
        return result;
    };
    NumberWrapper.parseInt = function (text, radix) {
        if (radix == 10) {
            if (/^(\-|\+)?[0-9]+$/.test(text)) {
                return parseInt(text, radix);
            }
        }
        else if (radix == 16) {
            if (/^(\-|\+)?[0-9ABCDEFabcdef]+$/.test(text)) {
                return parseInt(text, radix);
            }
        }
        else {
            var result = parseInt(text, radix);
            if (!isNaN(result)) {
                return result;
            }
        }
        throw new Error('Invalid integer literal when parsing ' + text + ' in base ' + radix);
    };
    Object.defineProperty(NumberWrapper, "NaN", {
        get: function () { return NaN; },
        enumerable: true,
        configurable: true
    });
    NumberWrapper.isNumeric = function (value) { return !isNaN(value - parseFloat(value)); };
    NumberWrapper.isNaN = function (value) { return isNaN(value); };
    NumberWrapper.isInteger = function (value) { return Number.isInteger(value); };
    return NumberWrapper;
}());


// JS has NaN !== NaN

// JS considers NaN is the same as NaN for map Key (while NaN !== NaN otherwise)
// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map



function isJsObject$1(o) {
    return o !== null && (typeof o === 'function' || typeof o === 'object');
}


// Can't be all uppercase as our transpiler would think it is a special directive...
var Json$1 = (function () {
    function Json() {
    }
    Json.parse = function (s) { return _global$1.JSON.parse(s); };
    Json.stringify = function (data) {
        // Dart doesn't take 3 arguments
        return _global$1.JSON.stringify(data, null, 2);
    };
    return Json;
}());
var DateWrapper$1 = (function () {
    function DateWrapper() {
    }
    DateWrapper.create = function (year, month, day, hour, minutes, seconds, milliseconds) {
        if (month === void 0) { month = 1; }
        if (day === void 0) { day = 1; }
        if (hour === void 0) { hour = 0; }
        if (minutes === void 0) { minutes = 0; }
        if (seconds === void 0) { seconds = 0; }
        if (milliseconds === void 0) { milliseconds = 0; }
        return new Date$2(year, month - 1, day, hour, minutes, seconds, milliseconds);
    };
    DateWrapper.fromISOString = function (str) { return new Date$2(str); };
    DateWrapper.fromMillis = function (ms) { return new Date$2(ms); };
    DateWrapper.toMillis = function (date) { return date.getTime(); };
    DateWrapper.now = function () { return new Date$2(); };
    DateWrapper.toJson = function (date) { return date.toJSON(); };
    return DateWrapper;
}());

var _symbolIterator$1 = null;
function getSymbolIterator$1() {
    if (isBlank$1(_symbolIterator$1)) {
        if (isPresent$1(globalScope$1.Symbol) && isPresent$1(Symbol.iterator)) {
            _symbolIterator$1 = Symbol.iterator;
        }
        else {
            // es6-shim specific logic
            var keys = Object.getOwnPropertyNames(Map.prototype);
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                if (key !== 'entries' && key !== 'size' &&
                    Map.prototype[key] === Map.prototype['entries']) {
                    _symbolIterator$1 = key;
                }
            }
        }
    }
    return _symbolIterator$1;
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * `Location` is a service that applications can use to interact with a browser's URL.
 * Depending on which {@link LocationStrategy} is used, `Location` will either persist
 * to the URL's path or the URL's hash segment.
 *
 * Note: it's better to use {@link Router#navigate} service to trigger route changes. Use
 * `Location` only if you need to interact with or create normalized URLs outside of
 * routing.
 *
 * `Location` is responsible for normalizing the URL against the application's base href.
 * A normalized URL is absolute from the URL host, includes the application's base href, and has no
 * trailing slash:
 * - `/my/app/user/123` is normalized
 * - `my/app/user/123` **is not** normalized
 * - `/my/app/user/123/` **is not** normalized
 *
 * ### Example
 *
 * ```
 * import {Component} from '@angular/core';
 * import {Location} from '@angular/common';
 *
 * @Component({selector: 'app-component'})
 * class AppCmp {
 *   constructor(location: Location) {
 *     location.go('/foo');
 *   }
 * }
 * ```
 *
 * @stable
 */
var Location = (function () {
    function Location(platformStrategy) {
        var _this = this;
        /** @internal */
        this._subject = new EventEmitter();
        this._platformStrategy = platformStrategy;
        var browserBaseHref = this._platformStrategy.getBaseHref();
        this._baseHref = Location.stripTrailingSlash(_stripIndexHtml(browserBaseHref));
        this._platformStrategy.onPopState(function (ev) { _this._subject.emit({ 'url': _this.path(true), 'pop': true, 'type': ev.type }); });
    }
    /**
     * Returns the normalized URL path.
     */
    // TODO: vsavkin. Remove the boolean flag and always include hash once the deprecated router is
    // removed.
    Location.prototype.path = function (includeHash) {
        if (includeHash === void 0) { includeHash = false; }
        return this.normalize(this._platformStrategy.path(includeHash));
    };
    /**
     * Normalizes the given path and compares to the current normalized path.
     */
    Location.prototype.isCurrentPathEqualTo = function (path, query) {
        if (query === void 0) { query = ''; }
        return this.path() == this.normalize(path + Location.normalizeQueryParams(query));
    };
    /**
     * Given a string representing a URL, returns the normalized URL path without leading or
     * trailing slashes.
     */
    Location.prototype.normalize = function (url) {
        return Location.stripTrailingSlash(_stripBaseHref(this._baseHref, _stripIndexHtml(url)));
    };
    /**
     * Given a string representing a URL, returns the platform-specific external URL path.
     * If the given URL doesn't begin with a leading slash (`'/'`), this method adds one
     * before normalizing. This method will also add a hash if `HashLocationStrategy` is
     * used, or the `APP_BASE_HREF` if the `PathLocationStrategy` is in use.
     */
    Location.prototype.prepareExternalUrl = function (url) {
        if (url.length > 0 && !url.startsWith('/')) {
            url = '/' + url;
        }
        return this._platformStrategy.prepareExternalUrl(url);
    };
    // TODO: rename this method to pushState
    /**
     * Changes the browsers URL to the normalized version of the given URL, and pushes a
     * new item onto the platform's history.
     */
    Location.prototype.go = function (path, query) {
        if (query === void 0) { query = ''; }
        this._platformStrategy.pushState(null, '', path, query);
    };
    /**
     * Changes the browsers URL to the normalized version of the given URL, and replaces
     * the top item on the platform's history stack.
     */
    Location.prototype.replaceState = function (path, query) {
        if (query === void 0) { query = ''; }
        this._platformStrategy.replaceState(null, '', path, query);
    };
    /**
     * Navigates forward in the platform's history.
     */
    Location.prototype.forward = function () { this._platformStrategy.forward(); };
    /**
     * Navigates back in the platform's history.
     */
    Location.prototype.back = function () { this._platformStrategy.back(); };
    /**
     * Subscribe to the platform's `popState` events.
     */
    Location.prototype.subscribe = function (onNext, onThrow, onReturn) {
        if (onThrow === void 0) { onThrow = null; }
        if (onReturn === void 0) { onReturn = null; }
        return this._subject.subscribe({ next: onNext, error: onThrow, complete: onReturn });
    };
    /**
     * Given a string of url parameters, prepend with '?' if needed, otherwise return parameters as
     * is.
     */
    Location.normalizeQueryParams = function (params) {
        return (params.length > 0 && params.substring(0, 1) != '?') ? ('?' + params) : params;
    };
    /**
     * Given 2 parts of a url, join them with a slash if needed.
     */
    Location.joinWithSlash = function (start, end) {
        if (start.length == 0) {
            return end;
        }
        if (end.length == 0) {
            return start;
        }
        var slashes = 0;
        if (start.endsWith('/')) {
            slashes++;
        }
        if (end.startsWith('/')) {
            slashes++;
        }
        if (slashes == 2) {
            return start + end.substring(1);
        }
        if (slashes == 1) {
            return start + end;
        }
        return start + '/' + end;
    };
    /**
     * If url has a trailing slash, remove it, otherwise return url as is.
     */
    Location.stripTrailingSlash = function (url) {
        if (/\/$/g.test(url)) {
            url = url.substring(0, url.length - 1);
        }
        return url;
    };
    Location.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Location.ctorParameters = [
        { type: LocationStrategy, },
    ];
    return Location;
}());
function _stripBaseHref(baseHref, url) {
    if (baseHref.length > 0 && url.startsWith(baseHref)) {
        return url.substring(baseHref.length);
    }
    return url;
}
function _stripIndexHtml(url) {
    if (/\/index.html$/g.test(url)) {
        // '/index.html'.length == 11
        return url.substring(0, url.length - 11);
    }
    return url;
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$21 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * `HashLocationStrategy` is a {@link LocationStrategy} used to configure the
 * {@link Location} service to represent its state in the
 * [hash fragment](https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax)
 * of the browser's URL.
 *
 * For instance, if you call `location.go('/foo')`, the browser's URL will become
 * `example.com#/foo`.
 *
 * ### Example
 *
 * ```
 * import {Component, NgModule} from '@angular/core';
 * import {
 *   LocationStrategy,
 *   HashLocationStrategy
 * } from '@angular/common';
 *
 * @NgModule({
 *   providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
 * })
 * class AppModule {}
 * ```
 *
 * @stable
 */
var HashLocationStrategy = (function (_super) {
    __extends$21(HashLocationStrategy, _super);
    function HashLocationStrategy(_platformLocation, _baseHref) {
        _super.call(this);
        this._platformLocation = _platformLocation;
        this._baseHref = '';
        if (isPresent$1(_baseHref)) {
            this._baseHref = _baseHref;
        }
    }
    HashLocationStrategy.prototype.onPopState = function (fn) {
        this._platformLocation.onPopState(fn);
        this._platformLocation.onHashChange(fn);
    };
    HashLocationStrategy.prototype.getBaseHref = function () { return this._baseHref; };
    HashLocationStrategy.prototype.path = function (includeHash) {
        if (includeHash === void 0) { includeHash = false; }
        // the hash value is always prefixed with a `#`
        // and if it is empty then it will stay empty
        var path = this._platformLocation.hash;
        if (!isPresent$1(path))
            path = '#';
        return path.length > 0 ? path.substring(1) : path;
    };
    HashLocationStrategy.prototype.prepareExternalUrl = function (internal) {
        var url = Location.joinWithSlash(this._baseHref, internal);
        return url.length > 0 ? ('#' + url) : url;
    };
    HashLocationStrategy.prototype.pushState = function (state$$1, title, path, queryParams) {
        var url = this.prepareExternalUrl(path + Location.normalizeQueryParams(queryParams));
        if (url.length == 0) {
            url = this._platformLocation.pathname;
        }
        this._platformLocation.pushState(state$$1, title, url);
    };
    HashLocationStrategy.prototype.replaceState = function (state$$1, title, path, queryParams) {
        var url = this.prepareExternalUrl(path + Location.normalizeQueryParams(queryParams));
        if (url.length == 0) {
            url = this._platformLocation.pathname;
        }
        this._platformLocation.replaceState(state$$1, title, url);
    };
    HashLocationStrategy.prototype.forward = function () { this._platformLocation.forward(); };
    HashLocationStrategy.prototype.back = function () { this._platformLocation.back(); };
    HashLocationStrategy.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    HashLocationStrategy.ctorParameters = [
        { type: PlatformLocation, },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [APP_BASE_HREF,] },] },
    ];
    return HashLocationStrategy;
}(LocationStrategy));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$22 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * `PathLocationStrategy` is a {@link LocationStrategy} used to configure the
 * {@link Location} service to represent its state in the
 * [path](https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax) of the
 * browser's URL.
 *
 * `PathLocationStrategy` is the default binding for {@link LocationStrategy}
 * provided in {@link ROUTER_PROVIDERS}.
 *
 * If you're using `PathLocationStrategy`, you must provide a {@link APP_BASE_HREF}
 * or add a base element to the document. This URL prefix that will be preserved
 * when generating and recognizing URLs.
 *
 * For instance, if you provide an `APP_BASE_HREF` of `'/my/app'` and call
 * `location.go('/foo')`, the browser's URL will become
 * `example.com/my/app/foo`.
 *
 * Similarly, if you add `<base href='/my/app'/>` to the document and call
 * `location.go('/foo')`, the browser's URL will become
 * `example.com/my/app/foo`.
 *
 * @stable
 */
var PathLocationStrategy = (function (_super) {
    __extends$22(PathLocationStrategy, _super);
    function PathLocationStrategy(_platformLocation, href) {
        _super.call(this);
        this._platformLocation = _platformLocation;
        if (isBlank$1(href)) {
            href = this._platformLocation.getBaseHrefFromDOM();
        }
        if (isBlank$1(href)) {
            throw new Error("No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.");
        }
        this._baseHref = href;
    }
    PathLocationStrategy.prototype.onPopState = function (fn) {
        this._platformLocation.onPopState(fn);
        this._platformLocation.onHashChange(fn);
    };
    PathLocationStrategy.prototype.getBaseHref = function () { return this._baseHref; };
    PathLocationStrategy.prototype.prepareExternalUrl = function (internal) {
        return Location.joinWithSlash(this._baseHref, internal);
    };
    PathLocationStrategy.prototype.path = function (includeHash) {
        if (includeHash === void 0) { includeHash = false; }
        var pathname = this._platformLocation.pathname +
            Location.normalizeQueryParams(this._platformLocation.search);
        var hash = this._platformLocation.hash;
        return hash && includeHash ? "" + pathname + hash : pathname;
    };
    PathLocationStrategy.prototype.pushState = function (state$$1, title, url, queryParams) {
        var externalUrl = this.prepareExternalUrl(url + Location.normalizeQueryParams(queryParams));
        this._platformLocation.pushState(state$$1, title, externalUrl);
    };
    PathLocationStrategy.prototype.replaceState = function (state$$1, title, url, queryParams) {
        var externalUrl = this.prepareExternalUrl(url + Location.normalizeQueryParams(queryParams));
        this._platformLocation.replaceState(state$$1, title, externalUrl);
    };
    PathLocationStrategy.prototype.forward = function () { this._platformLocation.forward(); };
    PathLocationStrategy.prototype.back = function () { this._platformLocation.back(); };
    PathLocationStrategy.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    PathLocationStrategy.ctorParameters = [
        { type: PlatformLocation, },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [APP_BASE_HREF,] },] },
    ];
    return PathLocationStrategy;
}(LocationStrategy));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$23 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @experimental
 */
var NgLocalization = (function () {
    function NgLocalization() {
    }
    return NgLocalization;
}());
/**
 * Returns the plural category for a given value.
 * - "=value" when the case exists,
 * - the plural category otherwise
 *
 * @internal
 */
function getPluralCategory(value, cases, ngLocalization) {
    var nbCase = "=" + value;
    return cases.indexOf(nbCase) > -1 ? nbCase : ngLocalization.getPluralCategory(value);
}
/**
 * Returns the plural case based on the locale
 *
 * @experimental
 */
var NgLocaleLocalization = (function (_super) {
    __extends$23(NgLocaleLocalization, _super);
    function NgLocaleLocalization(_locale) {
        _super.call(this);
        this._locale = _locale;
    }
    NgLocaleLocalization.prototype.getPluralCategory = function (value) {
        var plural = getPluralCase(this._locale, value);
        switch (plural) {
            case Plural.Zero:
                return 'zero';
            case Plural.One:
                return 'one';
            case Plural.Two:
                return 'two';
            case Plural.Few:
                return 'few';
            case Plural.Many:
                return 'many';
            default:
                return 'other';
        }
    };
    NgLocaleLocalization.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NgLocaleLocalization.ctorParameters = [
        { type: undefined, decorators: [{ type: Inject, args: [LOCALE_ID,] },] },
    ];
    return NgLocaleLocalization;
}(NgLocalization));
// This is generated code DO NOT MODIFY
// see angular2/script/cldr/gen_plural_rules.js
/** @experimental */
var Plural;
(function (Plural) {
    Plural[Plural["Zero"] = 0] = "Zero";
    Plural[Plural["One"] = 1] = "One";
    Plural[Plural["Two"] = 2] = "Two";
    Plural[Plural["Few"] = 3] = "Few";
    Plural[Plural["Many"] = 4] = "Many";
    Plural[Plural["Other"] = 5] = "Other";
})(Plural || (Plural = {}));
/**
 * Returns the plural case based on the locale
 *
 * @experimental
 */
function getPluralCase(locale, nLike) {
    // TODO(vicb): lazy compute
    if (typeof nLike === 'string') {
        nLike = parseInt(nLike, 10);
    }
    var n = nLike;
    var nDecimal = n.toString().replace(/^[^.]*\.?/, '');
    var i = Math.floor(Math.abs(n));
    var v = nDecimal.length;
    var f = parseInt(nDecimal, 10);
    var t = parseInt(n.toString().replace(/^[^.]*\.?|0+$/g, ''), 10) || 0;
    var lang = locale.split('-')[0].toLowerCase();
    switch (lang) {
        case 'af':
        case 'asa':
        case 'az':
        case 'bem':
        case 'bez':
        case 'bg':
        case 'brx':
        case 'ce':
        case 'cgg':
        case 'chr':
        case 'ckb':
        case 'ee':
        case 'el':
        case 'eo':
        case 'es':
        case 'eu':
        case 'fo':
        case 'fur':
        case 'gsw':
        case 'ha':
        case 'haw':
        case 'hu':
        case 'jgo':
        case 'jmc':
        case 'ka':
        case 'kk':
        case 'kkj':
        case 'kl':
        case 'ks':
        case 'ksb':
        case 'ky':
        case 'lb':
        case 'lg':
        case 'mas':
        case 'mgo':
        case 'ml':
        case 'mn':
        case 'nb':
        case 'nd':
        case 'ne':
        case 'nn':
        case 'nnh':
        case 'nyn':
        case 'om':
        case 'or':
        case 'os':
        case 'ps':
        case 'rm':
        case 'rof':
        case 'rwk':
        case 'saq':
        case 'seh':
        case 'sn':
        case 'so':
        case 'sq':
        case 'ta':
        case 'te':
        case 'teo':
        case 'tk':
        case 'tr':
        case 'ug':
        case 'uz':
        case 'vo':
        case 'vun':
        case 'wae':
        case 'xog':
            if (n === 1)
                return Plural.One;
            return Plural.Other;
        case 'agq':
        case 'bas':
        case 'cu':
        case 'dav':
        case 'dje':
        case 'dua':
        case 'dyo':
        case 'ebu':
        case 'ewo':
        case 'guz':
        case 'kam':
        case 'khq':
        case 'ki':
        case 'kln':
        case 'kok':
        case 'ksf':
        case 'lrc':
        case 'lu':
        case 'luo':
        case 'luy':
        case 'mer':
        case 'mfe':
        case 'mgh':
        case 'mua':
        case 'mzn':
        case 'nmg':
        case 'nus':
        case 'qu':
        case 'rn':
        case 'rw':
        case 'sbp':
        case 'twq':
        case 'vai':
        case 'yav':
        case 'yue':
        case 'zgh':
        case 'ak':
        case 'ln':
        case 'mg':
        case 'pa':
        case 'ti':
            if (n === Math.floor(n) && n >= 0 && n <= 1)
                return Plural.One;
            return Plural.Other;
        case 'am':
        case 'as':
        case 'bn':
        case 'fa':
        case 'gu':
        case 'hi':
        case 'kn':
        case 'mr':
        case 'zu':
            if (i === 0 || n === 1)
                return Plural.One;
            return Plural.Other;
        case 'ar':
            if (n === 0)
                return Plural.Zero;
            if (n === 1)
                return Plural.One;
            if (n === 2)
                return Plural.Two;
            if (n % 100 === Math.floor(n % 100) && n % 100 >= 3 && n % 100 <= 10)
                return Plural.Few;
            if (n % 100 === Math.floor(n % 100) && n % 100 >= 11 && n % 100 <= 99)
                return Plural.Many;
            return Plural.Other;
        case 'ast':
        case 'ca':
        case 'de':
        case 'en':
        case 'et':
        case 'fi':
        case 'fy':
        case 'gl':
        case 'it':
        case 'nl':
        case 'sv':
        case 'sw':
        case 'ur':
        case 'yi':
            if (i === 1 && v === 0)
                return Plural.One;
            return Plural.Other;
        case 'be':
            if (n % 10 === 1 && !(n % 100 === 11))
                return Plural.One;
            if (n % 10 === Math.floor(n % 10) && n % 10 >= 2 && n % 10 <= 4 &&
                !(n % 100 >= 12 && n % 100 <= 14))
                return Plural.Few;
            if (n % 10 === 0 || n % 10 === Math.floor(n % 10) && n % 10 >= 5 && n % 10 <= 9 ||
                n % 100 === Math.floor(n % 100) && n % 100 >= 11 && n % 100 <= 14)
                return Plural.Many;
            return Plural.Other;
        case 'br':
            if (n % 10 === 1 && !(n % 100 === 11 || n % 100 === 71 || n % 100 === 91))
                return Plural.One;
            if (n % 10 === 2 && !(n % 100 === 12 || n % 100 === 72 || n % 100 === 92))
                return Plural.Two;
            if (n % 10 === Math.floor(n % 10) && (n % 10 >= 3 && n % 10 <= 4 || n % 10 === 9) &&
                !(n % 100 >= 10 && n % 100 <= 19 || n % 100 >= 70 && n % 100 <= 79 ||
                    n % 100 >= 90 && n % 100 <= 99))
                return Plural.Few;
            if (!(n === 0) && n % 1e6 === 0)
                return Plural.Many;
            return Plural.Other;
        case 'bs':
        case 'hr':
        case 'sr':
            if (v === 0 && i % 10 === 1 && !(i % 100 === 11) || f % 10 === 1 && !(f % 100 === 11))
                return Plural.One;
            if (v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 2 && i % 10 <= 4 &&
                !(i % 100 >= 12 && i % 100 <= 14) ||
                f % 10 === Math.floor(f % 10) && f % 10 >= 2 && f % 10 <= 4 &&
                    !(f % 100 >= 12 && f % 100 <= 14))
                return Plural.Few;
            return Plural.Other;
        case 'cs':
        case 'sk':
            if (i === 1 && v === 0)
                return Plural.One;
            if (i === Math.floor(i) && i >= 2 && i <= 4 && v === 0)
                return Plural.Few;
            if (!(v === 0))
                return Plural.Many;
            return Plural.Other;
        case 'cy':
            if (n === 0)
                return Plural.Zero;
            if (n === 1)
                return Plural.One;
            if (n === 2)
                return Plural.Two;
            if (n === 3)
                return Plural.Few;
            if (n === 6)
                return Plural.Many;
            return Plural.Other;
        case 'da':
            if (n === 1 || !(t === 0) && (i === 0 || i === 1))
                return Plural.One;
            return Plural.Other;
        case 'dsb':
        case 'hsb':
            if (v === 0 && i % 100 === 1 || f % 100 === 1)
                return Plural.One;
            if (v === 0 && i % 100 === 2 || f % 100 === 2)
                return Plural.Two;
            if (v === 0 && i % 100 === Math.floor(i % 100) && i % 100 >= 3 && i % 100 <= 4 ||
                f % 100 === Math.floor(f % 100) && f % 100 >= 3 && f % 100 <= 4)
                return Plural.Few;
            return Plural.Other;
        case 'ff':
        case 'fr':
        case 'hy':
        case 'kab':
            if (i === 0 || i === 1)
                return Plural.One;
            return Plural.Other;
        case 'fil':
            if (v === 0 && (i === 1 || i === 2 || i === 3) ||
                v === 0 && !(i % 10 === 4 || i % 10 === 6 || i % 10 === 9) ||
                !(v === 0) && !(f % 10 === 4 || f % 10 === 6 || f % 10 === 9))
                return Plural.One;
            return Plural.Other;
        case 'ga':
            if (n === 1)
                return Plural.One;
            if (n === 2)
                return Plural.Two;
            if (n === Math.floor(n) && n >= 3 && n <= 6)
                return Plural.Few;
            if (n === Math.floor(n) && n >= 7 && n <= 10)
                return Plural.Many;
            return Plural.Other;
        case 'gd':
            if (n === 1 || n === 11)
                return Plural.One;
            if (n === 2 || n === 12)
                return Plural.Two;
            if (n === Math.floor(n) && (n >= 3 && n <= 10 || n >= 13 && n <= 19))
                return Plural.Few;
            return Plural.Other;
        case 'gv':
            if (v === 0 && i % 10 === 1)
                return Plural.One;
            if (v === 0 && i % 10 === 2)
                return Plural.Two;
            if (v === 0 &&
                (i % 100 === 0 || i % 100 === 20 || i % 100 === 40 || i % 100 === 60 || i % 100 === 80))
                return Plural.Few;
            if (!(v === 0))
                return Plural.Many;
            return Plural.Other;
        case 'he':
            if (i === 1 && v === 0)
                return Plural.One;
            if (i === 2 && v === 0)
                return Plural.Two;
            if (v === 0 && !(n >= 0 && n <= 10) && n % 10 === 0)
                return Plural.Many;
            return Plural.Other;
        case 'is':
            if (t === 0 && i % 10 === 1 && !(i % 100 === 11) || !(t === 0))
                return Plural.One;
            return Plural.Other;
        case 'ksh':
            if (n === 0)
                return Plural.Zero;
            if (n === 1)
                return Plural.One;
            return Plural.Other;
        case 'kw':
        case 'naq':
        case 'se':
        case 'smn':
            if (n === 1)
                return Plural.One;
            if (n === 2)
                return Plural.Two;
            return Plural.Other;
        case 'lag':
            if (n === 0)
                return Plural.Zero;
            if ((i === 0 || i === 1) && !(n === 0))
                return Plural.One;
            return Plural.Other;
        case 'lt':
            if (n % 10 === 1 && !(n % 100 >= 11 && n % 100 <= 19))
                return Plural.One;
            if (n % 10 === Math.floor(n % 10) && n % 10 >= 2 && n % 10 <= 9 &&
                !(n % 100 >= 11 && n % 100 <= 19))
                return Plural.Few;
            if (!(f === 0))
                return Plural.Many;
            return Plural.Other;
        case 'lv':
        case 'prg':
            if (n % 10 === 0 || n % 100 === Math.floor(n % 100) && n % 100 >= 11 && n % 100 <= 19 ||
                v === 2 && f % 100 === Math.floor(f % 100) && f % 100 >= 11 && f % 100 <= 19)
                return Plural.Zero;
            if (n % 10 === 1 && !(n % 100 === 11) || v === 2 && f % 10 === 1 && !(f % 100 === 11) ||
                !(v === 2) && f % 10 === 1)
                return Plural.One;
            return Plural.Other;
        case 'mk':
            if (v === 0 && i % 10 === 1 || f % 10 === 1)
                return Plural.One;
            return Plural.Other;
        case 'mt':
            if (n === 1)
                return Plural.One;
            if (n === 0 || n % 100 === Math.floor(n % 100) && n % 100 >= 2 && n % 100 <= 10)
                return Plural.Few;
            if (n % 100 === Math.floor(n % 100) && n % 100 >= 11 && n % 100 <= 19)
                return Plural.Many;
            return Plural.Other;
        case 'pl':
            if (i === 1 && v === 0)
                return Plural.One;
            if (v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 2 && i % 10 <= 4 &&
                !(i % 100 >= 12 && i % 100 <= 14))
                return Plural.Few;
            if (v === 0 && !(i === 1) && i % 10 === Math.floor(i % 10) && i % 10 >= 0 && i % 10 <= 1 ||
                v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 5 && i % 10 <= 9 ||
                v === 0 && i % 100 === Math.floor(i % 100) && i % 100 >= 12 && i % 100 <= 14)
                return Plural.Many;
            return Plural.Other;
        case 'pt':
            if (n === Math.floor(n) && n >= 0 && n <= 2 && !(n === 2))
                return Plural.One;
            return Plural.Other;
        case 'ro':
            if (i === 1 && v === 0)
                return Plural.One;
            if (!(v === 0) || n === 0 ||
                !(n === 1) && n % 100 === Math.floor(n % 100) && n % 100 >= 1 && n % 100 <= 19)
                return Plural.Few;
            return Plural.Other;
        case 'ru':
        case 'uk':
            if (v === 0 && i % 10 === 1 && !(i % 100 === 11))
                return Plural.One;
            if (v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 2 && i % 10 <= 4 &&
                !(i % 100 >= 12 && i % 100 <= 14))
                return Plural.Few;
            if (v === 0 && i % 10 === 0 ||
                v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 5 && i % 10 <= 9 ||
                v === 0 && i % 100 === Math.floor(i % 100) && i % 100 >= 11 && i % 100 <= 14)
                return Plural.Many;
            return Plural.Other;
        case 'shi':
            if (i === 0 || n === 1)
                return Plural.One;
            if (n === Math.floor(n) && n >= 2 && n <= 10)
                return Plural.Few;
            return Plural.Other;
        case 'si':
            if (n === 0 || n === 1 || i === 0 && f === 1)
                return Plural.One;
            return Plural.Other;
        case 'sl':
            if (v === 0 && i % 100 === 1)
                return Plural.One;
            if (v === 0 && i % 100 === 2)
                return Plural.Two;
            if (v === 0 && i % 100 === Math.floor(i % 100) && i % 100 >= 3 && i % 100 <= 4 || !(v === 0))
                return Plural.Few;
            return Plural.Other;
        case 'tzm':
            if (n === Math.floor(n) && n >= 0 && n <= 1 || n === Math.floor(n) && n >= 11 && n <= 99)
                return Plural.One;
            return Plural.Other;
        default:
            return Plural.Other;
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var Map$2 = _global$1.Map;
var Set$2 = _global$1.Set;
// Safari and Internet Explorer do not support the iterable parameter to the
// Map constructor.  We work around that by manually adding the items.
var createMapFromPairs$1 = (function () {
    try {
        if (new Map$2([[1, 2]]).size === 1) {
            return function createMapFromPairs$1(pairs) { return new Map$2(pairs); };
        }
    }
    catch (e) {
    }
    return function createMapAndPopulateFromPairs(pairs) {
        var map = new Map$2();
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            map.set(pair[0], pair[1]);
        }
        return map;
    };
})();
var createMapFromMap$1 = (function () {
    try {
        if (new Map$2(new Map$2())) {
            return function createMapFromMap$1(m) { return new Map$2(m); };
        }
    }
    catch (e) {
    }
    return function createMapAndPopulateFromMap(m) {
        var map = new Map$2();
        m.forEach(function (v, k) { map.set(k, v); });
        return map;
    };
})();
var _clearValues$1 = (function () {
    if ((new Map$2()).keys().next) {
        return function _clearValues$1(m) {
            var keyIterator = m.keys();
            var k;
            while (!((k = keyIterator.next()).done)) {
                m.set(k.value, null);
            }
        };
    }
    else {
        return function _clearValuesWithForeEach(m) {
            m.forEach(function (v, k) { m.set(k, null); });
        };
    }
})();
// Safari doesn't implement MapIterator.next(), which is used is Traceur's polyfill of Array.from
// TODO(mlaval): remove the work around once we have a working polyfill of Array.from
var _arrayFromMap$1 = (function () {
    try {
        if ((new Map$2()).values().next) {
            return function createArrayFromMap(m, getValues) {
                return getValues ? Array.from(m.values()) : Array.from(m.keys());
            };
        }
    }
    catch (e) {
    }
    return function createArrayFromMapWithForeach(m, getValues) {
        var res = ListWrapper$1.createFixedSize(m.size), i = 0;
        m.forEach(function (v, k) {
            res[i] = getValues ? v : k;
            i++;
        });
        return res;
    };
})();

/**
 * Wraps Javascript Objects
 */
var StringMapWrapper$1 = (function () {
    function StringMapWrapper() {
    }
    StringMapWrapper.create = function () {
        // Note: We are not using Object.create(null) here due to
        // performance!
        // http://jsperf.com/ng2-object-create-null
        return {};
    };
    StringMapWrapper.contains = function (map, key) {
        return map.hasOwnProperty(key);
    };
    StringMapWrapper.get = function (map, key) {
        return map.hasOwnProperty(key) ? map[key] : undefined;
    };
    StringMapWrapper.set = function (map, key, value) { map[key] = value; };
    StringMapWrapper.keys = function (map) { return Object.keys(map); };
    StringMapWrapper.values = function (map) {
        return Object.keys(map).map(function (k) { return map[k]; });
    };
    StringMapWrapper.isEmpty = function (map) {
        for (var prop in map) {
            return false;
        }
        return true;
    };
    StringMapWrapper.delete = function (map, key) { delete map[key]; };
    StringMapWrapper.forEach = function (map, callback) {
        for (var _i = 0, _a = Object.keys(map); _i < _a.length; _i++) {
            var k = _a[_i];
            callback(map[k], k);
        }
    };
    StringMapWrapper.merge = function (m1, m2) {
        var m = {};
        for (var _i = 0, _a = Object.keys(m1); _i < _a.length; _i++) {
            var k = _a[_i];
            m[k] = m1[k];
        }
        for (var _b = 0, _c = Object.keys(m2); _b < _c.length; _b++) {
            var k = _c[_b];
            m[k] = m2[k];
        }
        return m;
    };
    StringMapWrapper.equals = function (m1, m2) {
        var k1 = Object.keys(m1);
        var k2 = Object.keys(m2);
        if (k1.length != k2.length) {
            return false;
        }
        for (var i = 0; i < k1.length; i++) {
            var key = k1[i];
            if (m1[key] !== m2[key]) {
                return false;
            }
        }
        return true;
    };
    return StringMapWrapper;
}());
var ListWrapper$1 = (function () {
    function ListWrapper() {
    }
    // JS has no way to express a statically fixed size list, but dart does so we
    // keep both methods.
    ListWrapper.createFixedSize = function (size) { return new Array(size); };
    ListWrapper.createGrowableSize = function (size) { return new Array(size); };
    ListWrapper.clone = function (array) { return array.slice(0); };
    ListWrapper.forEachWithIndex = function (array, fn) {
        for (var i = 0; i < array.length; i++) {
            fn(array[i], i);
        }
    };
    ListWrapper.first = function (array) {
        if (!array)
            return null;
        return array[0];
    };
    ListWrapper.last = function (array) {
        if (!array || array.length == 0)
            return null;
        return array[array.length - 1];
    };
    ListWrapper.indexOf = function (array, value, startIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        return array.indexOf(value, startIndex);
    };
    ListWrapper.contains = function (list, el) { return list.indexOf(el) !== -1; };
    ListWrapper.reversed = function (array) {
        var a = ListWrapper.clone(array);
        return a.reverse();
    };
    ListWrapper.concat = function (a, b) { return a.concat(b); };
    ListWrapper.insert = function (list, index, value) { list.splice(index, 0, value); };
    ListWrapper.removeAt = function (list, index) {
        var res = list[index];
        list.splice(index, 1);
        return res;
    };
    ListWrapper.removeAll = function (list, items) {
        for (var i = 0; i < items.length; ++i) {
            var index = list.indexOf(items[i]);
            list.splice(index, 1);
        }
    };
    ListWrapper.remove = function (list, el) {
        var index = list.indexOf(el);
        if (index > -1) {
            list.splice(index, 1);
            return true;
        }
        return false;
    };
    ListWrapper.clear = function (list) { list.length = 0; };
    ListWrapper.isEmpty = function (list) { return list.length == 0; };
    ListWrapper.fill = function (list, value, start, end) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = null; }
        list.fill(value, start, end === null ? list.length : end);
    };
    ListWrapper.equals = function (a, b) {
        if (a.length != b.length)
            return false;
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    };
    ListWrapper.slice = function (l, from, to) {
        if (from === void 0) { from = 0; }
        if (to === void 0) { to = null; }
        return l.slice(from, to === null ? undefined : to);
    };
    ListWrapper.splice = function (l, from, length) { return l.splice(from, length); };
    ListWrapper.sort = function (l, compareFn) {
        if (isPresent$1(compareFn)) {
            l.sort(compareFn);
        }
        else {
            l.sort();
        }
    };
    ListWrapper.toString = function (l) { return l.toString(); };
    ListWrapper.toJSON = function (l) { return JSON.stringify(l); };
    ListWrapper.maximum = function (list, predicate) {
        if (list.length == 0) {
            return null;
        }
        var solution = null;
        var maxValue = -Infinity;
        for (var index = 0; index < list.length; index++) {
            var candidate = list[index];
            if (isBlank$1(candidate)) {
                continue;
            }
            var candidateValue = predicate(candidate);
            if (candidateValue > maxValue) {
                solution = candidate;
                maxValue = candidateValue;
            }
        }
        return solution;
    };
    ListWrapper.flatten = function (list) {
        var target = [];
        _flattenArray$1(list, target);
        return target;
    };
    ListWrapper.addAll = function (list, source) {
        for (var i = 0; i < source.length; i++) {
            list.push(source[i]);
        }
    };
    return ListWrapper;
}());
function _flattenArray$1(source, target) {
    if (isPresent$1(source)) {
        for (var i = 0; i < source.length; i++) {
            var item = source[i];
            if (isArray$3(item)) {
                _flattenArray$1(item, target);
            }
            else {
                target.push(item);
            }
        }
    }
    return target;
}
function isListLikeIterable$1(obj) {
    if (!isJsObject$1(obj))
        return false;
    return isArray$3(obj) ||
        (!(obj instanceof Map$2) &&
            getSymbolIterator$1() in obj); // JS Iterable have a Symbol.iterator prop
}


// Safari and Internet Explorer do not support the iterable parameter to the
// Set constructor.  We work around that by manually adding the items.
var createSetFromList$1 = (function () {
    var test = new Set$2([1, 2, 3]);
    if (test.size === 3) {
        return function createSetFromList$1(lst) { return new Set$2(lst); };
    }
    else {
        return function createSetAndPopulateFromList(lst) {
            var res = new Set$2(lst);
            if (res.size !== lst.length) {
                for (var i = 0; i < lst.length; i++) {
                    res.add(lst[i]);
                }
            }
            return res;
        };
    }
})();

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @ngModule CommonModule
 *
 * @whatItDoes Adds and removes CSS classes on an HTML element.
 *
 * @howToUse
 * ```
 *     <some-element [ngClass]="'first second'">...</some-element>
 *
 *     <some-element [ngClass]="['first', 'second']">...</some-element>
 *
 *     <some-element [ngClass]="{'first': true, 'second': true, 'third': false}">...</some-element>
 *
 *     <some-element [ngClass]="stringExp|arrayExp|objExp">...</some-element>
 * ```
 *
 * @description
 *
 * The CSS classes are updated as follow depending on the type of the expression evaluation:
 * - `string` - the CSS classes listed in a string (space delimited) are added,
 * - `Array` - the CSS classes (Array elements) are added,
 * - `Object` - keys are CSS class names that get added when the expression given in the value
 *              evaluates to a truthy value, otherwise class are removed.
 *
 * @stable
 */
var NgClass = (function () {
    function NgClass(_iterableDiffers, _keyValueDiffers, _ngEl, _renderer) {
        this._iterableDiffers = _iterableDiffers;
        this._keyValueDiffers = _keyValueDiffers;
        this._ngEl = _ngEl;
        this._renderer = _renderer;
        this._initialClasses = [];
    }
    Object.defineProperty(NgClass.prototype, "klass", {
        set: function (v) {
            this._applyInitialClasses(true);
            this._initialClasses = typeof v === 'string' ? v.split(/\s+/) : [];
            this._applyInitialClasses(false);
            this._applyClasses(this._rawClass, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgClass.prototype, "ngClass", {
        set: function (v) {
            this._cleanupClasses(this._rawClass);
            this._iterableDiffer = null;
            this._keyValueDiffer = null;
            this._rawClass = typeof v === 'string' ? v.split(/\s+/) : v;
            if (this._rawClass) {
                if (isListLikeIterable$1(this._rawClass)) {
                    this._iterableDiffer = this._iterableDiffers.find(this._rawClass).create(null);
                }
                else {
                    this._keyValueDiffer = this._keyValueDiffers.find(this._rawClass).create(null);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    NgClass.prototype.ngDoCheck = function () {
        if (this._iterableDiffer) {
            var changes = this._iterableDiffer.diff(this._rawClass);
            if (changes) {
                this._applyIterableChanges(changes);
            }
        }
        else if (this._keyValueDiffer) {
            var changes = this._keyValueDiffer.diff(this._rawClass);
            if (changes) {
                this._applyKeyValueChanges(changes);
            }
        }
    };
    NgClass.prototype._cleanupClasses = function (rawClassVal) {
        this._applyClasses(rawClassVal, true);
        this._applyInitialClasses(false);
    };
    NgClass.prototype._applyKeyValueChanges = function (changes) {
        var _this = this;
        changes.forEachAddedItem(function (record) { return _this._toggleClass(record.key, record.currentValue); });
        changes.forEachChangedItem(function (record) { return _this._toggleClass(record.key, record.currentValue); });
        changes.forEachRemovedItem(function (record) {
            if (record.previousValue) {
                _this._toggleClass(record.key, false);
            }
        });
    };
    NgClass.prototype._applyIterableChanges = function (changes) {
        var _this = this;
        changes.forEachAddedItem(function (record) { return _this._toggleClass(record.item, true); });
        changes.forEachRemovedItem(function (record) { return _this._toggleClass(record.item, false); });
    };
    NgClass.prototype._applyInitialClasses = function (isCleanup) {
        var _this = this;
        this._initialClasses.forEach(function (klass) { return _this._toggleClass(klass, !isCleanup); });
    };
    NgClass.prototype._applyClasses = function (rawClassVal, isCleanup) {
        var _this = this;
        if (rawClassVal) {
            if (Array.isArray(rawClassVal) || rawClassVal instanceof Set) {
                rawClassVal.forEach(function (klass) { return _this._toggleClass(klass, !isCleanup); });
            }
            else {
                Object.keys(rawClassVal).forEach(function (klass) {
                    if (isPresent$1(rawClassVal[klass]))
                        _this._toggleClass(klass, !isCleanup);
                });
            }
        }
    };
    NgClass.prototype._toggleClass = function (klass, enabled) {
        var _this = this;
        klass = klass.trim();
        if (klass) {
            klass.split(/\s+/g).forEach(function (klass) { _this._renderer.setElementClass(_this._ngEl.nativeElement, klass, enabled); });
        }
    };
    NgClass.decorators = [
        { type: Directive, args: [{ selector: '[ngClass]' },] },
    ];
    /** @nocollapse */
    NgClass.ctorParameters = [
        { type: IterableDiffers, },
        { type: KeyValueDiffers, },
        { type: ElementRef, },
        { type: Renderer, },
    ];
    NgClass.propDecorators = {
        'klass': [{ type: Input, args: ['class',] },],
        'ngClass': [{ type: Input },],
    };
    return NgClass;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var NgForRow = (function () {
    function NgForRow($implicit, index, count) {
        this.$implicit = $implicit;
        this.index = index;
        this.count = count;
    }
    Object.defineProperty(NgForRow.prototype, "first", {
        get: function () { return this.index === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgForRow.prototype, "last", {
        get: function () { return this.index === this.count - 1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgForRow.prototype, "even", {
        get: function () { return this.index % 2 === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgForRow.prototype, "odd", {
        get: function () { return !this.even; },
        enumerable: true,
        configurable: true
    });
    return NgForRow;
}());
/**
 * The `NgFor` directive instantiates a template once per item from an iterable. The context for
 * each instantiated template inherits from the outer context with the given loop variable set
 * to the current item from the iterable.
 *
 * ### Local Variables
 *
 * `NgFor` provides several exported values that can be aliased to local variables:
 *
 * * `index` will be set to the current loop iteration for each template context.
 * * `first` will be set to a boolean value indicating whether the item is the first one in the
 *   iteration.
 * * `last` will be set to a boolean value indicating whether the item is the last one in the
 *   iteration.
 * * `even` will be set to a boolean value indicating whether this item has an even index.
 * * `odd` will be set to a boolean value indicating whether this item has an odd index.
 *
 * ### Change Propagation
 *
 * When the contents of the iterator changes, `NgFor` makes the corresponding changes to the DOM:
 *
 * * When an item is added, a new instance of the template is added to the DOM.
 * * When an item is removed, its template instance is removed from the DOM.
 * * When items are reordered, their respective templates are reordered in the DOM.
 * * Otherwise, the DOM element for that item will remain the same.
 *
 * Angular uses object identity to track insertions and deletions within the iterator and reproduce
 * those changes in the DOM. This has important implications for animations and any stateful
 * controls
 * (such as `<input>` elements which accept user input) that are present. Inserted rows can be
 * animated in, deleted rows can be animated out, and unchanged rows retain any unsaved state such
 * as user input.
 *
 * It is possible for the identities of elements in the iterator to change while the data does not.
 * This can happen, for example, if the iterator produced from an RPC to the server, and that
 * RPC is re-run. Even if the data hasn't changed, the second response will produce objects with
 * different identities, and Angular will tear down the entire DOM and rebuild it (as if all old
 * elements were deleted and all new elements inserted). This is an expensive operation and should
 * be avoided if possible.
 *
 * To customize the default tracking algorithm, `NgFor` supports `trackBy` option.
 * `trackBy` takes a function which has two arguments: `index` and `item`.
 * If `trackBy` is given, Angular tracks changes by the return value of the function.
 *
 * ### Syntax
 *
 * - `<li *ngFor="let item of items; let i = index; trackBy: trackByFn">...</li>`
 * - `<li template="ngFor let item of items; let i = index; trackBy: trackByFn">...</li>`
 *
 * With `<template>` element:
 *
 * ```
 * <template ngFor let-item [ngForOf]="items" let-i="index" [ngForTrackBy]="trackByFn">
 *   <li>...</li>
 * </template>
 * ```
 *
 * ### Example
 *
 * See a [live demo](http://plnkr.co/edit/KVuXxDp0qinGDyo307QW?p=preview) for a more detailed
 * example.
 *
 * @stable
 */
var NgFor = (function () {
    function NgFor(_viewContainer, _template, _differs, _cdr) {
        this._viewContainer = _viewContainer;
        this._template = _template;
        this._differs = _differs;
        this._cdr = _cdr;
        this._differ = null;
    }
    Object.defineProperty(NgFor.prototype, "ngForTemplate", {
        set: function (value) {
            if (value) {
                this._template = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    NgFor.prototype.ngOnChanges = function (changes) {
        if ('ngForOf' in changes) {
            // React on ngForOf changes only once all inputs have been initialized
            var value = changes['ngForOf'].currentValue;
            if (!this._differ && value) {
                try {
                    this._differ = this._differs.find(value).create(this._cdr, this.ngForTrackBy);
                }
                catch (e) {
                    throw new Error("Cannot find a differ supporting object '" + value + "' of type '" + getTypeNameForDebugging$1(value) + "'. NgFor only supports binding to Iterables such as Arrays.");
                }
            }
        }
    };
    NgFor.prototype.ngDoCheck = function () {
        if (this._differ) {
            var changes = this._differ.diff(this.ngForOf);
            if (changes)
                this._applyChanges(changes);
        }
    };
    NgFor.prototype._applyChanges = function (changes) {
        var _this = this;
        var insertTuples = [];
        changes.forEachOperation(function (item, adjustedPreviousIndex, currentIndex) {
            if (item.previousIndex == null) {
                var view = _this._viewContainer.createEmbeddedView(_this._template, new NgForRow(null, null, null), currentIndex);
                var tuple = new RecordViewTuple(item, view);
                insertTuples.push(tuple);
            }
            else if (currentIndex == null) {
                _this._viewContainer.remove(adjustedPreviousIndex);
            }
            else {
                var view = _this._viewContainer.get(adjustedPreviousIndex);
                _this._viewContainer.move(view, currentIndex);
                var tuple = new RecordViewTuple(item, view);
                insertTuples.push(tuple);
            }
        });
        for (var i = 0; i < insertTuples.length; i++) {
            this._perViewChange(insertTuples[i].view, insertTuples[i].record);
        }
        for (var i = 0, ilen = this._viewContainer.length; i < ilen; i++) {
            var viewRef = this._viewContainer.get(i);
            viewRef.context.index = i;
            viewRef.context.count = ilen;
        }
        changes.forEachIdentityChange(function (record) {
            var viewRef = _this._viewContainer.get(record.currentIndex);
            viewRef.context.$implicit = record.item;
        });
    };
    NgFor.prototype._perViewChange = function (view, record) {
        view.context.$implicit = record.item;
    };
    NgFor.decorators = [
        { type: Directive, args: [{ selector: '[ngFor][ngForOf]' },] },
    ];
    /** @nocollapse */
    NgFor.ctorParameters = [
        { type: ViewContainerRef, },
        { type: TemplateRef, },
        { type: IterableDiffers, },
        { type: ChangeDetectorRef, },
    ];
    NgFor.propDecorators = {
        'ngForOf': [{ type: Input },],
        'ngForTrackBy': [{ type: Input },],
        'ngForTemplate': [{ type: Input },],
    };
    return NgFor;
}());
var RecordViewTuple = (function () {
    function RecordViewTuple(record, view) {
        this.record = record;
        this.view = view;
    }
    return RecordViewTuple;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Removes or recreates a portion of the DOM tree based on an {expression}.
 *
 * If the expression assigned to `ngIf` evaluates to a false value then the element
 * is removed from the DOM, otherwise a clone of the element is reinserted into the DOM.
 *
 * ### Example ([live demo](http://plnkr.co/edit/fe0kgemFBtmQOY31b4tw?p=preview)):
 *
 * ```
 * <div *ngIf="errorCount > 0" class="error">
 *   <!-- Error message displayed when the errorCount property on the current context is greater
 * than 0. -->
 *   {{errorCount}} errors detected
 * </div>
 * ```
 *
 * ### Syntax
 *
 * - `<div *ngIf="condition">...</div>`
 * - `<div template="ngIf condition">...</div>`
 * - `<template [ngIf]="condition"><div>...</div></template>`
 *
 * @stable
 */
var NgIf = (function () {
    function NgIf(_viewContainer, _template) {
        this._viewContainer = _viewContainer;
        this._template = _template;
        this._hasView = false;
    }
    Object.defineProperty(NgIf.prototype, "ngIf", {
        set: function (condition) {
            if (condition && !this._hasView) {
                this._hasView = true;
                this._viewContainer.createEmbeddedView(this._template);
            }
            else if (!condition && this._hasView) {
                this._hasView = false;
                this._viewContainer.clear();
            }
        },
        enumerable: true,
        configurable: true
    });
    NgIf.decorators = [
        { type: Directive, args: [{ selector: '[ngIf]' },] },
    ];
    /** @nocollapse */
    NgIf.ctorParameters = [
        { type: ViewContainerRef, },
        { type: TemplateRef, },
    ];
    NgIf.propDecorators = {
        'ngIf': [{ type: Input },],
    };
    return NgIf;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var _CASE_DEFAULT = new Object();
var SwitchView = (function () {
    function SwitchView(_viewContainerRef, _templateRef) {
        this._viewContainerRef = _viewContainerRef;
        this._templateRef = _templateRef;
    }
    SwitchView.prototype.create = function () { this._viewContainerRef.createEmbeddedView(this._templateRef); };
    SwitchView.prototype.destroy = function () { this._viewContainerRef.clear(); };
    return SwitchView;
}());
/**
 * @ngModule CommonModule
 *
 * @whatItDoes Adds / removes DOM sub-trees when the nest match expressions matches the switch
 *             expression.
 *
 * @howToUse
 * ```
 *     <container-element [ngSwitch]="switch_expression">
 *       <some-element *ngSwitchCase="match_expression_1">...</some-element>
 *       <some-element *ngSwitchCase="match_expression_2">...</some-element>
 *       <some-other-element *ngSwitchCase="match_expression_3">...</some-other-element>
 *       <ng-container *ngSwitchCase="match_expression_3">
 *         <!-- use a ng-container to group multiple root nodes -->
 *         <inner-element></inner-element>
 *         <inner-other-element></inner-other-element>
 *       </ng-container>
 *       <some-element *ngSwitchDefault>...</p>
 *     </container-element>
 * ```
 * @description
 *
 * `NgSwitch` stamps out nested views when their match expression value matches the value of the
 * switch expression.
 *
 * In other words:
 * - you define a container element (where you place the directive with a switch expression on the
 * `[ngSwitch]="..."` attribute)
 * - you define inner views inside the `NgSwitch` and place a `*ngSwitchCase` attribute on the view
 * root elements.
 *
 * Elements within `NgSwitch` but outside of a `NgSwitchCase` or `NgSwitchDefault` directives will
 * be
 * preserved at the location.
 *
 * The `ngSwitchCase` directive informs the parent `NgSwitch` of which view to display when the
 * expression is evaluated.
 * When no matching expression is found on a `ngSwitchCase` view, the `ngSwitchDefault` view is
 * stamped out.
 *
 * @stable
 */
var NgSwitch = (function () {
    function NgSwitch() {
        this._useDefault = false;
        this._valueViews = new Map();
        this._activeViews = [];
    }
    Object.defineProperty(NgSwitch.prototype, "ngSwitch", {
        set: function (value) {
            // Empty the currently active ViewContainers
            this._emptyAllActiveViews();
            // Add the ViewContainers matching the value (with a fallback to default)
            this._useDefault = false;
            var views = this._valueViews.get(value);
            if (!views) {
                this._useDefault = true;
                views = this._valueViews.get(_CASE_DEFAULT) || null;
            }
            this._activateViews(views);
            this._switchValue = value;
        },
        enumerable: true,
        configurable: true
    });
    /** @internal */
    NgSwitch.prototype._onCaseValueChanged = function (oldCase, newCase, view) {
        this._deregisterView(oldCase, view);
        this._registerView(newCase, view);
        if (oldCase === this._switchValue) {
            view.destroy();
            ListWrapper$1.remove(this._activeViews, view);
        }
        else if (newCase === this._switchValue) {
            if (this._useDefault) {
                this._useDefault = false;
                this._emptyAllActiveViews();
            }
            view.create();
            this._activeViews.push(view);
        }
        // Switch to default when there is no more active ViewContainers
        if (this._activeViews.length === 0 && !this._useDefault) {
            this._useDefault = true;
            this._activateViews(this._valueViews.get(_CASE_DEFAULT));
        }
    };
    /** @internal */
    NgSwitch.prototype._emptyAllActiveViews = function () {
        var activeContainers = this._activeViews;
        for (var i = 0; i < activeContainers.length; i++) {
            activeContainers[i].destroy();
        }
        this._activeViews = [];
    };
    /** @internal */
    NgSwitch.prototype._activateViews = function (views) {
        // TODO(vicb): assert(this._activeViews.length === 0);
        if (views) {
            for (var i = 0; i < views.length; i++) {
                views[i].create();
            }
            this._activeViews = views;
        }
    };
    /** @internal */
    NgSwitch.prototype._registerView = function (value, view) {
        var views = this._valueViews.get(value);
        if (!views) {
            views = [];
            this._valueViews.set(value, views);
        }
        views.push(view);
    };
    /** @internal */
    NgSwitch.prototype._deregisterView = function (value, view) {
        // `_CASE_DEFAULT` is used a marker for non-registered cases
        if (value === _CASE_DEFAULT)
            return;
        var views = this._valueViews.get(value);
        if (views.length == 1) {
            this._valueViews.delete(value);
        }
        else {
            ListWrapper$1.remove(views, view);
        }
    };
    NgSwitch.decorators = [
        { type: Directive, args: [{ selector: '[ngSwitch]' },] },
    ];
    /** @nocollapse */
    NgSwitch.ctorParameters = [];
    NgSwitch.propDecorators = {
        'ngSwitch': [{ type: Input },],
    };
    return NgSwitch;
}());
/**
 * @ngModule CommonModule
 *
 * @whatItDoes Creates a view that will be added/removed from the parent {@link NgSwitch} when the
 *             given expression evaluate to respectively the same/different value as the switch
 *             expression.
 *
 * @howToUse
 *     <container-element [ngSwitch]="switch_expression">
 *       <some-element *ngSwitchCase="match_expression_1">...</some-element>
 *     </container-element>
 *
 * @description
 *
 * Insert the sub-tree when the expression evaluates to the same value as the enclosing switch
 * expression.
 *
 * If multiple match expressions match the switch expression value, all of them are displayed.
 *
 * See {@link NgSwitch} for more details and example.
 *
 * @stable
 */
var NgSwitchCase = (function () {
    function NgSwitchCase(viewContainer, templateRef, ngSwitch) {
        // `_CASE_DEFAULT` is used as a marker for a not yet initialized value
        /** @internal */
        this._value = _CASE_DEFAULT;
        this._switch = ngSwitch;
        this._view = new SwitchView(viewContainer, templateRef);
    }
    Object.defineProperty(NgSwitchCase.prototype, "ngSwitchCase", {
        set: function (value) {
            this._switch._onCaseValueChanged(this._value, value, this._view);
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    NgSwitchCase.decorators = [
        { type: Directive, args: [{ selector: '[ngSwitchCase]' },] },
    ];
    /** @nocollapse */
    NgSwitchCase.ctorParameters = [
        { type: ViewContainerRef, },
        { type: TemplateRef, },
        { type: NgSwitch, decorators: [{ type: Host },] },
    ];
    NgSwitchCase.propDecorators = {
        'ngSwitchCase': [{ type: Input },],
    };
    return NgSwitchCase;
}());
/**
 * @ngModule CommonModule
 * @whatItDoes Creates a view that is added to the parent {@link NgSwitch} when no case expressions
 * match the
 *             switch expression.
 *
 * @howToUse
 *     <container-element [ngSwitch]="switch_expression">
 *       <some-element *ngSwitchCase="match_expression_1">...</some-element>
 *       <some-other-element *ngSwitchDefault>...</some-other-element>
 *     </container-element>
 *
 * @description
 *
 * Insert the sub-tree when no case expressions evaluate to the same value as the enclosing switch
 * expression.
 *
 * See {@link NgSwitch} for more details and example.
 *
 * @stable
 */
var NgSwitchDefault = (function () {
    function NgSwitchDefault(viewContainer, templateRef, sswitch) {
        sswitch._registerView(_CASE_DEFAULT, new SwitchView(viewContainer, templateRef));
    }
    NgSwitchDefault.decorators = [
        { type: Directive, args: [{ selector: '[ngSwitchDefault]' },] },
    ];
    /** @nocollapse */
    NgSwitchDefault.ctorParameters = [
        { type: ViewContainerRef, },
        { type: TemplateRef, },
        { type: NgSwitch, decorators: [{ type: Host },] },
    ];
    return NgSwitchDefault;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @ngModule CommonModule
 *
 * @whatItDoes Adds / removes DOM sub-trees based on a numeric value. Tailored for pluralization.
 *
 * @howToUse
 * ```
 * <some-element [ngPlural]="value">
 *   <ng-container *ngPluralCase="'=0'">there is nothing</ng-container>
 *   <ng-container *ngPluralCase="'=1'">there is one</ng-container>
 *   <ng-container *ngPluralCase="'few'">there are a few</ng-container>
 *   <ng-container *ngPluralCase="'other'">there are exactly #</ng-container>
 * </some-element>
 * ```
 *
 * @description
 *
 * Displays DOM sub-trees that match the switch expression value, or failing that, DOM sub-trees
 * that match the switch expression's pluralization category.
 *
 * To use this directive you must provide a container element that sets the `[ngPlural]` attribute
 * to a switch expression. Inner elements with a `[ngPluralCase]` will display based on their
 * expression:
 * - if `[ngPluralCase]` is set to a value starting with `=`, it will only display if the value
 *   matches the switch expression exactly,
 * - otherwise, the view will be treated as a "category match", and will only display if exact
 *   value matches aren't found and the value maps to its category for the defined locale.
 *
 * See http://cldr.unicode.org/index/cldr-spec/plural-rules
 *
 * @experimental
 */
var NgPlural = (function () {
    function NgPlural(_localization) {
        this._localization = _localization;
        this._caseViews = {};
    }
    Object.defineProperty(NgPlural.prototype, "ngPlural", {
        set: function (value) {
            this._switchValue = value;
            this._updateView();
        },
        enumerable: true,
        configurable: true
    });
    NgPlural.prototype.addCase = function (value, switchView) { this._caseViews[value] = switchView; };
    /** @internal */
    NgPlural.prototype._updateView = function () {
        this._clearViews();
        var cases = Object.keys(this._caseViews);
        var key = getPluralCategory(this._switchValue, cases, this._localization);
        this._activateView(this._caseViews[key]);
    };
    /** @internal */
    NgPlural.prototype._clearViews = function () {
        if (this._activeView)
            this._activeView.destroy();
    };
    /** @internal */
    NgPlural.prototype._activateView = function (view) {
        if (view) {
            this._activeView = view;
            this._activeView.create();
        }
    };
    NgPlural.decorators = [
        { type: Directive, args: [{ selector: '[ngPlural]' },] },
    ];
    /** @nocollapse */
    NgPlural.ctorParameters = [
        { type: NgLocalization, },
    ];
    NgPlural.propDecorators = {
        'ngPlural': [{ type: Input },],
    };
    return NgPlural;
}());
/**
 * @ngModule CommonModule
 *
 * @whatItDoes Creates a view that will be added/removed from the parent {@link NgPlural} when the
 *             given expression matches the plural expression according to CLDR rules.
 *
 * @howToUse
 *     <some-element [ngPlural]="value">
 *       <ng-container *ngPluralCase="'=0'">...</ng-container>
 *       <ng-container *ngPluralCase="'other'">...</ng-container>
 *     </some-element>
 *
 * See {@link NgPlural} for more details and example.
 *
 * @experimental
 */
var NgPluralCase = (function () {
    function NgPluralCase(value, template, viewContainer, ngPlural) {
        this.value = value;
        ngPlural.addCase(value, new SwitchView(viewContainer, template));
    }
    NgPluralCase.decorators = [
        { type: Directive, args: [{ selector: '[ngPluralCase]' },] },
    ];
    /** @nocollapse */
    NgPluralCase.ctorParameters = [
        { type: undefined, decorators: [{ type: Attribute, args: ['ngPluralCase',] },] },
        { type: TemplateRef, },
        { type: ViewContainerRef, },
        { type: NgPlural, decorators: [{ type: Host },] },
    ];
    return NgPluralCase;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @ngModule CommonModule
 *
 * @whatItDoes Update an HTML element styles.
 *
 * @howToUse
 * ```
 * <some-element [ngStyle]="{'font-style': styleExp}">...</some-element>
 *
 * <some-element [ngStyle]="{'max-width.px': widthExp}">...</some-element>
 *
 * <some-element [ngStyle]="objExp">...</some-element>
 * ```
 *
 * @description
 *
 * The styles are updated according to the value of the expression evaluation:
 * - keys are style names with an option `.<unit>` suffix (ie 'top.px', 'font-style.em'),
 * - values are the values assigned to those properties (expressed in the given unit).
 *
 * @stable
 */
var NgStyle = (function () {
    function NgStyle(_differs, _ngEl, _renderer) {
        this._differs = _differs;
        this._ngEl = _ngEl;
        this._renderer = _renderer;
    }
    Object.defineProperty(NgStyle.prototype, "ngStyle", {
        set: function (v) {
            this._ngStyle = v;
            if (!this._differ && v) {
                this._differ = this._differs.find(v).create(null);
            }
        },
        enumerable: true,
        configurable: true
    });
    NgStyle.prototype.ngDoCheck = function () {
        if (this._differ) {
            var changes = this._differ.diff(this._ngStyle);
            if (changes) {
                this._applyChanges(changes);
            }
        }
    };
    NgStyle.prototype._applyChanges = function (changes) {
        var _this = this;
        changes.forEachRemovedItem(function (record) { return _this._setStyle(record.key, null); });
        changes.forEachAddedItem(function (record) { return _this._setStyle(record.key, record.currentValue); });
        changes.forEachChangedItem(function (record) { return _this._setStyle(record.key, record.currentValue); });
    };
    NgStyle.prototype._setStyle = function (nameAndUnit, value) {
        var _a = nameAndUnit.split('.'), name = _a[0], unit = _a[1];
        value = value !== null && value !== void (0) && unit ? "" + value + unit : value;
        this._renderer.setElementStyle(this._ngEl.nativeElement, name, value);
    };
    NgStyle.decorators = [
        { type: Directive, args: [{ selector: '[ngStyle]' },] },
    ];
    /** @nocollapse */
    NgStyle.ctorParameters = [
        { type: KeyValueDiffers, },
        { type: ElementRef, },
        { type: Renderer, },
    ];
    NgStyle.propDecorators = {
        'ngStyle': [{ type: Input },],
    };
    return NgStyle;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @ngModule CommonModule
 *
 * @whatItDoes Inserts an embedded view from a prepared `TemplateRef`
 *
 * @howToUse
 * ```
 * <template [ngTemplateOutlet]="templateRefExpression"
 *           [ngOutletContext]="objectExpression">
 * </template>
 * ```
 *
 * @description
 *
 * You can attach a context object to the `EmbeddedViewRef` by setting `[ngOutletContext]`.
 * `[ngOutletContext]` should be an object, the object's keys will be the local template variables
 * available within the `TemplateRef`.
 *
 * Note: using the key `$implicit` in the context object will set it's value as default.
 *
 * @experimental
 */
var NgTemplateOutlet = (function () {
    function NgTemplateOutlet(_viewContainerRef) {
        this._viewContainerRef = _viewContainerRef;
    }
    Object.defineProperty(NgTemplateOutlet.prototype, "ngOutletContext", {
        set: function (context) { this._context = context; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgTemplateOutlet.prototype, "ngTemplateOutlet", {
        set: function (templateRef) { this._templateRef = templateRef; },
        enumerable: true,
        configurable: true
    });
    NgTemplateOutlet.prototype.ngOnChanges = function () {
        if (this._viewRef) {
            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._viewRef));
        }
        if (this._templateRef) {
            this._viewRef = this._viewContainerRef.createEmbeddedView(this._templateRef, this._context);
        }
    };
    NgTemplateOutlet.decorators = [
        { type: Directive, args: [{ selector: '[ngTemplateOutlet]' },] },
    ];
    /** @nocollapse */
    NgTemplateOutlet.ctorParameters = [
        { type: ViewContainerRef, },
    ];
    NgTemplateOutlet.propDecorators = {
        'ngOutletContext': [{ type: Input },],
        'ngTemplateOutlet': [{ type: Input },],
    };
    return NgTemplateOutlet;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A collection of Angular directives that are likely to be used in each and every Angular
 * application.
 */
var COMMON_DIRECTIVES = [
    NgClass,
    NgFor,
    NgIf,
    NgTemplateOutlet,
    NgStyle,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgPlural,
    NgPluralCase,
];

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$25 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * @stable
 */
var BaseError$1 = (function (_super) {
    __extends$25(BaseError, _super);
    function BaseError(message) {
        // Errors don't use current this, instead they create a new instance.
        // We have to do forward all of our api to the nativeInstance.
        var nativeError = _super.call(this, message);
        this._nativeError = nativeError;
    }
    Object.defineProperty(BaseError.prototype, "message", {
        get: function () { return this._nativeError.message; },
        set: function (message) { this._nativeError.message = message; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseError.prototype, "name", {
        get: function () { return this._nativeError.name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseError.prototype, "stack", {
        get: function () { return this._nativeError.stack; },
        set: function (value) { this._nativeError.stack = value; },
        enumerable: true,
        configurable: true
    });
    BaseError.prototype.toString = function () { return this._nativeError.toString(); };
    return BaseError;
}(Error));
/**
 * @stable
 */
var WrappedError$1 = (function (_super) {
    __extends$25(WrappedError, _super);
    function WrappedError(message, error) {
        _super.call(this, message + " caused by: " + (error instanceof Error ? error.message : error));
        this.originalError = error;
    }
    Object.defineProperty(WrappedError.prototype, "stack", {
        get: function () {
            return (this.originalError instanceof Error ? this.originalError : this._nativeError)
                .stack;
        },
        enumerable: true,
        configurable: true
    });
    return WrappedError;
}(BaseError$1));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$24 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var InvalidPipeArgumentError = (function (_super) {
    __extends$24(InvalidPipeArgumentError, _super);
    function InvalidPipeArgumentError(type, value) {
        _super.call(this, "Invalid argument '" + value + "' for pipe '" + stringify$1(type) + "'");
    }
    return InvalidPipeArgumentError;
}(BaseError$1));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ObservableStrategy = (function () {
    function ObservableStrategy() {
    }
    ObservableStrategy.prototype.createSubscription = function (async, updateLatestValue) {
        return async.subscribe({ next: updateLatestValue, error: function (e) { throw e; } });
    };
    ObservableStrategy.prototype.dispose = function (subscription) { subscription.unsubscribe(); };
    ObservableStrategy.prototype.onDestroy = function (subscription) { subscription.unsubscribe(); };
    return ObservableStrategy;
}());
var PromiseStrategy = (function () {
    function PromiseStrategy() {
    }
    PromiseStrategy.prototype.createSubscription = function (async, updateLatestValue) {
        return async.then(updateLatestValue, function (e) { throw e; });
    };
    PromiseStrategy.prototype.dispose = function (subscription) { };
    PromiseStrategy.prototype.onDestroy = function (subscription) { };
    return PromiseStrategy;
}());
var _promiseStrategy = new PromiseStrategy();
var _observableStrategy = new ObservableStrategy();
/**
 * @ngModule CommonModule
 * @whatItDoes Unwraps a value from an asynchronous primitive.
 * @howToUse `observable_or_promise_expression | async`
 * @description
 * The `async` pipe subscribes to an `Observable` or `Promise` and returns the latest value it has
 * emitted. When a new value is emitted, the `async` pipe marks the component to be checked for
 * changes. When the component gets destroyed, the `async` pipe unsubscribes automatically to avoid
 * potential memory leaks.
 *
 *
 * ## Examples
 *
 * This example binds a `Promise` to the view. Clicking the `Resolve` button resolves the
 * promise.
 *
 * {@example common/pipes/ts/async_pipe.ts region='AsyncPipePromise'}
 *
 * It's also possible to use `async` with Observables. The example below binds the `time` Observable
 * to the view. The Observable continuesly updates the view with the current time.
 *
 * {@example common/pipes/ts/async_pipe.ts region='AsyncPipeObservable'}
 *
 * @stable
 */
var AsyncPipe = (function () {
    function AsyncPipe(_ref) {
        /** @internal */
        this._latestValue = null;
        /** @internal */
        this._latestReturnedValue = null;
        /** @internal */
        this._subscription = null;
        /** @internal */
        this._obj = null;
        this._strategy = null;
        this._ref = _ref;
    }
    AsyncPipe.prototype.ngOnDestroy = function () {
        if (isPresent$1(this._subscription)) {
            this._dispose();
        }
    };
    AsyncPipe.prototype.transform = function (obj) {
        if (isBlank$1(this._obj)) {
            if (isPresent$1(obj)) {
                this._subscribe(obj);
            }
            this._latestReturnedValue = this._latestValue;
            return this._latestValue;
        }
        if (obj !== this._obj) {
            this._dispose();
            return this.transform(obj);
        }
        if (this._latestValue === this._latestReturnedValue) {
            return this._latestReturnedValue;
        }
        else {
            this._latestReturnedValue = this._latestValue;
            return WrappedValue.wrap(this._latestValue);
        }
    };
    /** @internal */
    AsyncPipe.prototype._subscribe = function (obj) {
        var _this = this;
        this._obj = obj;
        this._strategy = this._selectStrategy(obj);
        this._subscription = this._strategy.createSubscription(obj, function (value) { return _this._updateLatestValue(obj, value); });
    };
    /** @internal */
    AsyncPipe.prototype._selectStrategy = function (obj) {
        if (isPromise$1(obj)) {
            return _promiseStrategy;
        }
        else if (obj.subscribe) {
            return _observableStrategy;
        }
        else {
            throw new InvalidPipeArgumentError(AsyncPipe, obj);
        }
    };
    /** @internal */
    AsyncPipe.prototype._dispose = function () {
        this._strategy.dispose(this._subscription);
        this._latestValue = null;
        this._latestReturnedValue = null;
        this._subscription = null;
        this._obj = null;
    };
    /** @internal */
    AsyncPipe.prototype._updateLatestValue = function (async, value) {
        if (async === this._obj) {
            this._latestValue = value;
            this._ref.markForCheck();
        }
    };
    AsyncPipe.decorators = [
        { type: Pipe, args: [{ name: 'async', pure: false },] },
    ];
    /** @nocollapse */
    AsyncPipe.ctorParameters = [
        { type: ChangeDetectorRef, },
    ];
    return AsyncPipe;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var NumberFormatStyle;
(function (NumberFormatStyle) {
    NumberFormatStyle[NumberFormatStyle["Decimal"] = 0] = "Decimal";
    NumberFormatStyle[NumberFormatStyle["Percent"] = 1] = "Percent";
    NumberFormatStyle[NumberFormatStyle["Currency"] = 2] = "Currency";
})(NumberFormatStyle || (NumberFormatStyle = {}));
var NumberFormatter = (function () {
    function NumberFormatter() {
    }
    NumberFormatter.format = function (num, locale, style, _a) {
        var _b = _a === void 0 ? {} : _a, minimumIntegerDigits = _b.minimumIntegerDigits, minimumFractionDigits = _b.minimumFractionDigits, maximumFractionDigits = _b.maximumFractionDigits, currency = _b.currency, _c = _b.currencyAsSymbol, currencyAsSymbol = _c === void 0 ? false : _c;
        var options = {
            minimumIntegerDigits: minimumIntegerDigits,
            minimumFractionDigits: minimumFractionDigits,
            maximumFractionDigits: maximumFractionDigits,
            style: NumberFormatStyle[style].toLowerCase()
        };
        if (style == NumberFormatStyle.Currency) {
            options.currency = currency;
            options.currencyDisplay = currencyAsSymbol ? 'symbol' : 'code';
        }
        return new Intl.NumberFormat(locale, options).format(num);
    };
    return NumberFormatter;
}());
var DATE_FORMATS_SPLIT = /((?:[^yMLdHhmsazZEwGjJ']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|J+|j+|m+|s+|a|z|Z|G+|w+))(.*)/;
var PATTERN_ALIASES = {
    yMMMdjms: datePartGetterFactory(combine([
        digitCondition('year', 1),
        nameCondition('month', 3),
        digitCondition('day', 1),
        digitCondition('hour', 1),
        digitCondition('minute', 1),
        digitCondition('second', 1),
    ])),
    yMdjm: datePartGetterFactory(combine([
        digitCondition('year', 1), digitCondition('month', 1), digitCondition('day', 1),
        digitCondition('hour', 1), digitCondition('minute', 1)
    ])),
    yMMMMEEEEd: datePartGetterFactory(combine([
        digitCondition('year', 1), nameCondition('month', 4), nameCondition('weekday', 4),
        digitCondition('day', 1)
    ])),
    yMMMMd: datePartGetterFactory(combine([digitCondition('year', 1), nameCondition('month', 4), digitCondition('day', 1)])),
    yMMMd: datePartGetterFactory(combine([digitCondition('year', 1), nameCondition('month', 3), digitCondition('day', 1)])),
    yMd: datePartGetterFactory(combine([digitCondition('year', 1), digitCondition('month', 1), digitCondition('day', 1)])),
    jms: datePartGetterFactory(combine([digitCondition('hour', 1), digitCondition('second', 1), digitCondition('minute', 1)])),
    jm: datePartGetterFactory(combine([digitCondition('hour', 1), digitCondition('minute', 1)]))
};
var DATE_FORMATS = {
    yyyy: datePartGetterFactory(digitCondition('year', 4)),
    yy: datePartGetterFactory(digitCondition('year', 2)),
    y: datePartGetterFactory(digitCondition('year', 1)),
    MMMM: datePartGetterFactory(nameCondition('month', 4)),
    MMM: datePartGetterFactory(nameCondition('month', 3)),
    MM: datePartGetterFactory(digitCondition('month', 2)),
    M: datePartGetterFactory(digitCondition('month', 1)),
    LLLL: datePartGetterFactory(nameCondition('month', 4)),
    dd: datePartGetterFactory(digitCondition('day', 2)),
    d: datePartGetterFactory(digitCondition('day', 1)),
    HH: digitModifier(hourExtracter(datePartGetterFactory(hour12Modify(digitCondition('hour', 2), false)))),
    H: hourExtracter(datePartGetterFactory(hour12Modify(digitCondition('hour', 1), false))),
    hh: digitModifier(hourExtracter(datePartGetterFactory(hour12Modify(digitCondition('hour', 2), true)))),
    h: hourExtracter(datePartGetterFactory(hour12Modify(digitCondition('hour', 1), true))),
    jj: datePartGetterFactory(digitCondition('hour', 2)),
    j: datePartGetterFactory(digitCondition('hour', 1)),
    mm: digitModifier(datePartGetterFactory(digitCondition('minute', 2))),
    m: datePartGetterFactory(digitCondition('minute', 1)),
    ss: digitModifier(datePartGetterFactory(digitCondition('second', 2))),
    s: datePartGetterFactory(digitCondition('second', 1)),
    // while ISO 8601 requires fractions to be prefixed with `.` or `,`
    // we can be just safely rely on using `sss` since we currently don't support single or two digit
    // fractions
    sss: datePartGetterFactory(digitCondition('second', 3)),
    EEEE: datePartGetterFactory(nameCondition('weekday', 4)),
    EEE: datePartGetterFactory(nameCondition('weekday', 3)),
    EE: datePartGetterFactory(nameCondition('weekday', 2)),
    E: datePartGetterFactory(nameCondition('weekday', 1)),
    a: hourClockExtracter(datePartGetterFactory(hour12Modify(digitCondition('hour', 1), true))),
    Z: timeZoneGetter('short'),
    z: timeZoneGetter('long'),
    ww: datePartGetterFactory({}),
    // first Thursday of the year. not support ?
    w: datePartGetterFactory({}),
    // of the year not support ?
    G: datePartGetterFactory(nameCondition('era', 1)),
    GG: datePartGetterFactory(nameCondition('era', 2)),
    GGG: datePartGetterFactory(nameCondition('era', 3)),
    GGGG: datePartGetterFactory(nameCondition('era', 4))
};
function digitModifier(inner) {
    return function (date, locale) {
        var result = inner(date, locale);
        return result.length == 1 ? '0' + result : result;
    };
}
function hourClockExtracter(inner) {
    return function (date, locale) {
        var result = inner(date, locale);
        return result.split(' ')[1];
    };
}
function hourExtracter(inner) {
    return function (date, locale) {
        var result = inner(date, locale);
        return result.split(' ')[0];
    };
}
function intlDateFormat(date, locale, options) {
    return new Intl.DateTimeFormat(locale, options).format(date).replace(/[\u200e\u200f]/g, '');
}
function timeZoneGetter(timezone) {
    // To workaround `Intl` API restriction for single timezone let format with 24 hours
    var options = { hour: '2-digit', hour12: false, timeZoneName: timezone };
    return function (date, locale) {
        var result = intlDateFormat(date, locale, options);
        // Then extract first 3 letters that related to hours
        return result ? result.substring(3) : '';
    };
}
function hour12Modify(options, value) {
    options.hour12 = value;
    return options;
}
function digitCondition(prop, len) {
    var result = {};
    result[prop] = len == 2 ? '2-digit' : 'numeric';
    return result;
}
function nameCondition(prop, len) {
    var result = {};
    result[prop] = len < 4 ? 'short' : 'long';
    return result;
}
function combine(options) {
    var result = {};
    options.forEach(function (option) { Object.assign(result, option); });
    return result;
}
function datePartGetterFactory(ret) {
    return function (date, locale) { return intlDateFormat(date, locale, ret); };
}
var datePartsFormatterCache = new Map();
function dateFormatter(format, date, locale) {
    var text = '';
    var match;
    var fn;
    var parts = [];
    if (PATTERN_ALIASES[format]) {
        return PATTERN_ALIASES[format](date, locale);
    }
    if (datePartsFormatterCache.has(format)) {
        parts = datePartsFormatterCache.get(format);
    }
    else {
        var matches = DATE_FORMATS_SPLIT.exec(format);
        while (format) {
            match = DATE_FORMATS_SPLIT.exec(format);
            if (match) {
                parts = concat(parts, match, 1);
                format = parts.pop();
            }
            else {
                parts.push(format);
                format = null;
            }
        }
        datePartsFormatterCache.set(format, parts);
    }
    parts.forEach(function (part) {
        fn = DATE_FORMATS[part];
        text += fn ? fn(date, locale) :
            part === '\'\'' ? '\'' : part.replace(/(^'|'$)/g, '').replace(/''/g, '\'');
    });
    return text;
}
var slice = [].slice;
function concat(array1 /** TODO #9100 */, array2 /** TODO #9100 */, index /** TODO #9100 */) {
    return array1.concat(slice.call(array2, index));
}
var DateFormatter = (function () {
    function DateFormatter() {
    }
    DateFormatter.format = function (date, locale, pattern) {
        return dateFormatter(pattern, date, locale);
    };
    return DateFormatter;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @ngModule CommonModule
 * @whatItDoes Formats a date according to locale rules.
 * @howToUse `date_expression | date[:format]`
 * @description
 *
 * Where:
 * - `expression` is a date object or a number (milliseconds since UTC epoch) or an ISO string
 * (https://www.w3.org/TR/NOTE-datetime).
 * - `format` indicates which date/time components to include. The format can be predifined as
 *   shown below or custom as shown in the table.
 *   - `'medium'`: equivalent to `'yMMMdjms'` (e.g. `Sep 3, 2010, 12:05:08 PM` for `en-US`)
 *   - `'short'`: equivalent to `'yMdjm'` (e.g. `9/3/2010, 12:05 PM` for `en-US`)
 *   - `'fullDate'`: equivalent to `'yMMMMEEEEd'` (e.g. `Friday, September 3, 2010` for `en-US`)
 *   - `'longDate'`: equivalent to `'yMMMMd'` (e.g. `September 3, 2010` for `en-US`)
 *   - `'mediumDate'`: equivalent to `'yMMMd'` (e.g. `Sep 3, 2010` for `en-US`)
 *   - `'shortDate'`: equivalent to `'yMd'` (e.g. `9/3/2010` for `en-US`)
 *   - `'mediumTime'`: equivalent to `'jms'` (e.g. `12:05:08 PM` for `en-US`)
 *   - `'shortTime'`: equivalent to `'jm'` (e.g. `12:05 PM` for `en-US`)
 *
 *
 *  | Component | Symbol | Short Form   | Long Form         | Numeric   | 2-digit   |
 *  |-----------|:------:|--------------|-------------------|-----------|-----------|
 *  | era       |   G    | G (AD)       | GGGG (Anno Domini)| -         | -         |
 *  | year      |   y    | -            | -                 | y (2015)  | yy (15)   |
 *  | month     |   M    | MMM (Sep)    | MMMM (September)  | M (9)     | MM (09)   |
 *  | day       |   d    | -            | -                 | d (3)     | dd (03)   |
 *  | weekday   |   E    | EEE (Sun)    | EEEE (Sunday)     | -         | -         |
 *  | hour      |   j    | -            | -                 | j (13)    | jj (13)   |
 *  | hour12    |   h    | -            | -                 | h (1 PM)  | hh (01 PM)|
 *  | hour24    |   H    | -            | -                 | H (13)    | HH (13)   |
 *  | minute    |   m    | -            | -                 | m (5)     | mm (05)   |
 *  | second    |   s    | -            | -                 | s (9)     | ss (09)   |
 *  | timezone  |   z    | -            | z (Pacific Standard Time)| -  | -         |
 *  | timezone  |   Z    | Z (GMT-8:00) | -                 | -         | -         |
 *  | timezone  |   a    | a (PM)       | -                 | -         | -         |
 *
 * In javascript, only the components specified will be respected (not the ordering,
 * punctuations, ...) and details of the formatting will be dependent on the locale.
 *
 * Timezone of the formatted text will be the local system timezone of the end-user's machine.
 *
 * WARNINGS:
 * - this pipe is marked as pure hence it will not be re-evaluated when the input is mutated.
 *   Instead users should treat the date as an immutable object and change the reference when the
 *   pipe needs to re-run (this is to avoid reformatting the date on every change detection run
 *   which would be an expensive operation).
 * - this pipe uses the Internationalization API. Therefore it is only reliable in Chrome and Opera
 *   browsers.
 *
 * ### Examples
 *
 * Assuming `dateObj` is (year: 2015, month: 6, day: 15, hour: 21, minute: 43, second: 11)
 * in the _local_ time and locale is 'en-US':
 *
 * ```
 *     {{ dateObj | date }}               // output is 'Jun 15, 2015'
 *     {{ dateObj | date:'medium' }}      // output is 'Jun 15, 2015, 9:43:11 PM'
 *     {{ dateObj | date:'shortTime' }}   // output is '9:43 PM'
 *     {{ dateObj | date:'mmss' }}        // output is '43:11'
 * ```
 *
 * {@example common/pipes/ts/date_pipe.ts region='DatePipe'}
 *
 * @stable
 */
var DatePipe = (function () {
    function DatePipe(_locale) {
        this._locale = _locale;
    }
    DatePipe.prototype.transform = function (value, pattern) {
        if (pattern === void 0) { pattern = 'mediumDate'; }
        if (isBlank$1(value))
            return null;
        if (!this.supports(value)) {
            throw new InvalidPipeArgumentError(DatePipe, value);
        }
        if (NumberWrapper$1.isNumeric(value)) {
            value = DateWrapper$1.fromMillis(parseFloat(value));
        }
        else if (isString$1(value)) {
            value = DateWrapper$1.fromISOString(value);
        }
        if (StringMapWrapper$1.contains(DatePipe._ALIASES, pattern)) {
            pattern = StringMapWrapper$1.get(DatePipe._ALIASES, pattern);
        }
        return DateFormatter.format(value, this._locale, pattern);
    };
    DatePipe.prototype.supports = function (obj) {
        if (isDate$1(obj) || NumberWrapper$1.isNumeric(obj)) {
            return true;
        }
        if (isString$1(obj) && isDate$1(DateWrapper$1.fromISOString(obj))) {
            return true;
        }
        return false;
    };
    /** @internal */
    DatePipe._ALIASES = {
        'medium': 'yMMMdjms',
        'short': 'yMdjm',
        'fullDate': 'yMMMMEEEEd',
        'longDate': 'yMMMMd',
        'mediumDate': 'yMMMd',
        'shortDate': 'yMd',
        'mediumTime': 'jms',
        'shortTime': 'jm'
    };
    DatePipe.decorators = [
        { type: Pipe, args: [{ name: 'date', pure: true },] },
    ];
    /** @nocollapse */
    DatePipe.ctorParameters = [
        { type: undefined, decorators: [{ type: Inject, args: [LOCALE_ID,] },] },
    ];
    return DatePipe;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var _INTERPOLATION_REGEXP = /#/g;
/**
 * @ngModule CommonModule
 * @whatItDoes Maps a value to a string that pluralizes the value according to locale rules.
 * @howToUse `expression | i18nPlural:mapping`
 * @description
 *
 *  Where:
 *  - `expression` is a number.
 *  - `mapping` is an object that mimics the ICU format, see
 *    http://userguide.icu-project.org/formatparse/messages
 *
 *  ## Example
 *
 * {@example common/pipes/ts/i18n_pipe.ts region='I18nPluralPipeComponent'}
 *
 * @experimental
 */
var I18nPluralPipe = (function () {
    function I18nPluralPipe(_localization) {
        this._localization = _localization;
    }
    I18nPluralPipe.prototype.transform = function (value, pluralMap) {
        if (isBlank$1(value))
            return '';
        if (!isStringMap$1(pluralMap)) {
            throw new InvalidPipeArgumentError(I18nPluralPipe, pluralMap);
        }
        var key = getPluralCategory(value, Object.keys(pluralMap), this._localization);
        return StringWrapper$1.replaceAll(pluralMap[key], _INTERPOLATION_REGEXP, value.toString());
    };
    I18nPluralPipe.decorators = [
        { type: Pipe, args: [{ name: 'i18nPlural', pure: true },] },
    ];
    /** @nocollapse */
    I18nPluralPipe.ctorParameters = [
        { type: NgLocalization, },
    ];
    return I18nPluralPipe;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @ngModule CommonModule
 * @whatItDoes Generic selector that displays the string that matches the current value.
 * @howToUse `expression | i18nSelect:mapping`
 * @description
 *
 *  Where:
 *  - `mapping`: is an object that indicates the text that should be displayed
 *  for different values of the provided `expression`.
 *
 *  ## Example
 *
 * {@example common/pipes/ts/i18n_pipe.ts region='I18nSelectPipeComponent'}
 *
 *  @experimental
 */
var I18nSelectPipe = (function () {
    function I18nSelectPipe() {
    }
    I18nSelectPipe.prototype.transform = function (value, mapping) {
        if (isBlank$1(value))
            return '';
        if (!isStringMap$1(mapping)) {
            throw new InvalidPipeArgumentError(I18nSelectPipe, mapping);
        }
        return mapping.hasOwnProperty(value) ? mapping[value] : '';
    };
    I18nSelectPipe.decorators = [
        { type: Pipe, args: [{ name: 'i18nSelect', pure: true },] },
    ];
    /** @nocollapse */
    I18nSelectPipe.ctorParameters = [];
    return I18nSelectPipe;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @ngModule CommonModule
 * @whatItDoes Converts value into JSON string.
 * @howToUse `expression | json`
 * @description
 *
 * Converts value into string using `JSON.stringify`. Useful for debugging.
 *
 * ### Example
 * {@example common/pipes/ts/json_pipe.ts region='JsonPipe'}
 *
 * @stable
 */
var JsonPipe = (function () {
    function JsonPipe() {
    }
    JsonPipe.prototype.transform = function (value) { return Json$1.stringify(value); };
    JsonPipe.decorators = [
        { type: Pipe, args: [{ name: 'json', pure: false },] },
    ];
    /** @nocollapse */
    JsonPipe.ctorParameters = [];
    return JsonPipe;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @ngModule CommonModule
 * @whatItDoes Transforms string to lowercase.
 * @howToUse `expression | lowercase`
 * @description
 *
 * Converts value into lowercase string using `String.prototype.toLowerCase()`.
 *
 * ### Example
 *
 * {@example common/pipes/ts/lowerupper_pipe.ts region='LowerUpperPipe'}
 *
 * @stable
 */
var LowerCasePipe = (function () {
    function LowerCasePipe() {
    }
    LowerCasePipe.prototype.transform = function (value) {
        if (isBlank$1(value))
            return value;
        if (!isString$1(value)) {
            throw new InvalidPipeArgumentError(LowerCasePipe, value);
        }
        return value.toLowerCase();
    };
    LowerCasePipe.decorators = [
        { type: Pipe, args: [{ name: 'lowercase' },] },
    ];
    /** @nocollapse */
    LowerCasePipe.ctorParameters = [];
    return LowerCasePipe;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var _NUMBER_FORMAT_REGEXP = /^(\d+)?\.((\d+)(\-(\d+))?)?$/;
function formatNumber(pipe, locale, value, style$$1, digits, currency, currencyAsSymbol) {
    if (currency === void 0) { currency = null; }
    if (currencyAsSymbol === void 0) { currencyAsSymbol = false; }
    if (isBlank$1(value))
        return null;
    // Convert strings to numbers
    value = isString$1(value) && NumberWrapper$1.isNumeric(value) ? +value : value;
    if (!isNumber$1(value)) {
        throw new InvalidPipeArgumentError(pipe, value);
    }
    var minInt;
    var minFraction;
    var maxFraction;
    if (style$$1 !== NumberFormatStyle.Currency) {
        // rely on Intl default for currency
        minInt = 1;
        minFraction = 0;
        maxFraction = 3;
    }
    if (isPresent$1(digits)) {
        var parts = digits.match(_NUMBER_FORMAT_REGEXP);
        if (parts === null) {
            throw new Error(digits + " is not a valid digit info for number pipes");
        }
        if (isPresent$1(parts[1])) {
            minInt = NumberWrapper$1.parseIntAutoRadix(parts[1]);
        }
        if (isPresent$1(parts[3])) {
            minFraction = NumberWrapper$1.parseIntAutoRadix(parts[3]);
        }
        if (isPresent$1(parts[5])) {
            maxFraction = NumberWrapper$1.parseIntAutoRadix(parts[5]);
        }
    }
    return NumberFormatter.format(value, locale, style$$1, {
        minimumIntegerDigits: minInt,
        minimumFractionDigits: minFraction,
        maximumFractionDigits: maxFraction,
        currency: currency,
        currencyAsSymbol: currencyAsSymbol
    });
}
/**
 * @ngModule CommonModule
 * @whatItDoes Formats a number according to locale rules.
 * @howToUse `number_expression | number[:digitInfo]`
 *
 * Formats a number as text. Group sizing and separator and other locale-specific
 * configurations are based on the active locale.
 *
 * where `expression` is a number:
 *  - `digitInfo` is a `string` which has a following format: <br>
 *     <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>
 *   - `minIntegerDigits` is the minimum number of integer digits to use. Defaults to `1`.
 *   - `minFractionDigits` is the minimum number of digits after fraction. Defaults to `0`.
 *   - `maxFractionDigits` is the maximum number of digits after fraction. Defaults to `3`.
 *
 * For more information on the acceptable range for each of these numbers and other
 * details see your native internationalization library.
 *
 * WARNING: this pipe uses the Internationalization API which is not yet available in all browsers
 * and may require a polyfill. See {@linkDocs guide/browser-support} for details.
 *
 * ### Example
 *
 * {@example common/pipes/ts/number_pipe.ts region='NumberPipe'}
 *
 * @stable
 */
var DecimalPipe = (function () {
    function DecimalPipe(_locale) {
        this._locale = _locale;
    }
    DecimalPipe.prototype.transform = function (value, digits) {
        if (digits === void 0) { digits = null; }
        return formatNumber(DecimalPipe, this._locale, value, NumberFormatStyle.Decimal, digits);
    };
    DecimalPipe.decorators = [
        { type: Pipe, args: [{ name: 'number' },] },
    ];
    /** @nocollapse */
    DecimalPipe.ctorParameters = [
        { type: undefined, decorators: [{ type: Inject, args: [LOCALE_ID,] },] },
    ];
    return DecimalPipe;
}());
/**
 * @ngModule CommonModule
 * @whatItDoes Formats a number as a percentage according to locale rules.
 * @howToUse `number_expression | percent[:digitInfo]`
 *
 * @description
 *
 * Formats a number as percentage.
 *
 * - `digitInfo` See {@link DecimalPipe} for detailed description.
 *
 * WARNING: this pipe uses the Internationalization API which is not yet available in all browsers
 * and may require a polyfill. See {@linkDocs guide/browser-support} for details.
 *
 * ### Example
 *
 * {@example common/pipes/ts/number_pipe.ts region='PercentPipe'}
 *
 * @stable
 */
var PercentPipe = (function () {
    function PercentPipe(_locale) {
        this._locale = _locale;
    }
    PercentPipe.prototype.transform = function (value, digits) {
        if (digits === void 0) { digits = null; }
        return formatNumber(PercentPipe, this._locale, value, NumberFormatStyle.Percent, digits);
    };
    PercentPipe.decorators = [
        { type: Pipe, args: [{ name: 'percent' },] },
    ];
    /** @nocollapse */
    PercentPipe.ctorParameters = [
        { type: undefined, decorators: [{ type: Inject, args: [LOCALE_ID,] },] },
    ];
    return PercentPipe;
}());
/**
 * @ngModule CommonModule
 * @whatItDoes Formats a number as currency using locale rules.
 * @howToUse `number_expression | currency[:currencyCode[:symbolDisplay[:digitInfo]]]`
 * @description
 *
 * Use `currency` to format a number as currency.
 *
 * - `currencyCode` is the [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code, such
 *    as `USD` for the US dollar and `EUR` for the euro.
 * - `symbolDisplay` is a boolean indicating whether to use the currency symbol or code.
 *   - `true`: use symbol (e.g. `$`).
 *   - `false`(default): use code (e.g. `USD`).
 * - `digitInfo` See {@link DecimalPipe} for detailed description.
 *
 * WARNING: this pipe uses the Internationalization API which is not yet available in all browsers
 * and may require a polyfill. See {@linkDocs guide/browser-support} for details.
 *
 * ### Example
 *
 * {@example common/pipes/ts/number_pipe.ts region='CurrencyPipe'}
 *
 * @stable
 */
var CurrencyPipe = (function () {
    function CurrencyPipe(_locale) {
        this._locale = _locale;
    }
    CurrencyPipe.prototype.transform = function (value, currencyCode, symbolDisplay, digits) {
        if (currencyCode === void 0) { currencyCode = 'USD'; }
        if (symbolDisplay === void 0) { symbolDisplay = false; }
        if (digits === void 0) { digits = null; }
        return formatNumber(CurrencyPipe, this._locale, value, NumberFormatStyle.Currency, digits, currencyCode, symbolDisplay);
    };
    CurrencyPipe.decorators = [
        { type: Pipe, args: [{ name: 'currency' },] },
    ];
    /** @nocollapse */
    CurrencyPipe.ctorParameters = [
        { type: undefined, decorators: [{ type: Inject, args: [LOCALE_ID,] },] },
    ];
    return CurrencyPipe;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @ngModule CommonModule
 * @whatItDoes Creates a new List or String containing a subset (slice) of the elements.
 * @howToUse `array_or_string_expression | slice:start[:end]`
 * @description
 *
 * Where the input expression is a `List` or `String`, and:
 * - `start`: The starting index of the subset to return.
 *   - **a positive integer**: return the item at `start` index and all items after
 *     in the list or string expression.
 *   - **a negative integer**: return the item at `start` index from the end and all items after
 *     in the list or string expression.
 *   - **if positive and greater than the size of the expression**: return an empty list or string.
 *   - **if negative and greater than the size of the expression**: return entire list or string.
 * - `end`: The ending index of the subset to return.
 *   - **omitted**: return all items until the end.
 *   - **if positive**: return all items before `end` index of the list or string.
 *   - **if negative**: return all items before `end` index from the end of the list or string.
 *
 * All behavior is based on the expected behavior of the JavaScript API `Array.prototype.slice()`
 * and `String.prototype.slice()`.
 *
 * When operating on a [List], the returned list is always a copy even when all
 * the elements are being returned.
 *
 * When operating on a blank value, the pipe returns the blank value.
 *
 * ## List Example
 *
 * This `ngFor` example:
 *
 * {@example common/pipes/ts/slice_pipe.ts region='SlicePipe_list'}
 *
 * produces the following:
 *
 *     <li>b</li>
 *     <li>c</li>
 *
 * ## String Examples
 *
 * {@example common/pipes/ts/slice_pipe.ts region='SlicePipe_string'}
 *
 * @stable
 */
var SlicePipe = (function () {
    function SlicePipe() {
    }
    SlicePipe.prototype.transform = function (value, start, end) {
        if (end === void 0) { end = null; }
        if (isBlank$1(value))
            return value;
        if (!this.supports(value)) {
            throw new InvalidPipeArgumentError(SlicePipe, value);
        }
        if (isString$1(value)) {
            return StringWrapper$1.slice(value, start, end);
        }
        return ListWrapper$1.slice(value, start, end);
    };
    SlicePipe.prototype.supports = function (obj) { return isString$1(obj) || isArray$3(obj); };
    SlicePipe.decorators = [
        { type: Pipe, args: [{ name: 'slice', pure: false },] },
    ];
    /** @nocollapse */
    SlicePipe.ctorParameters = [];
    return SlicePipe;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @ngModule CommonModule
 * @whatItDoes Transforms string to uppercase.
 * @howToUse `expression | uppercase`
 * @description
 *
 * Converts value into lowercase string using `String.prototype.toUpperCase()`.
 *
 * ### Example
 *
 * {@example common/pipes/ts/lowerupper_pipe.ts region='LowerUpperPipe'}
 *
 * @stable
 */
var UpperCasePipe = (function () {
    function UpperCasePipe() {
    }
    UpperCasePipe.prototype.transform = function (value) {
        if (isBlank$1(value))
            return value;
        if (!isString$1(value)) {
            throw new InvalidPipeArgumentError(UpperCasePipe, value);
        }
        return value.toUpperCase();
    };
    UpperCasePipe.decorators = [
        { type: Pipe, args: [{ name: 'uppercase' },] },
    ];
    /** @nocollapse */
    UpperCasePipe.ctorParameters = [];
    return UpperCasePipe;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A collection of Angular pipes that are likely to be used in each and every application.
 */
var COMMON_PIPES = [
    AsyncPipe,
    UpperCasePipe,
    LowerCasePipe,
    JsonPipe,
    SlicePipe,
    DecimalPipe,
    PercentPipe,
    CurrencyPipe,
    DatePipe,
    I18nPluralPipe,
    I18nSelectPipe,
];

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Note: This does not contain the location providers,
// as they need some platform specific implementations to work.
/**
 * The module that includes all the basic Angular directives like {@link NgIf}, {@link NgFor}, ...
 *
 * @stable
 */
var CommonModule = (function () {
    function CommonModule() {
    }
    CommonModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [COMMON_DIRECTIVES, COMMON_PIPES],
                    exports: [COMMON_DIRECTIVES, COMMON_PIPES],
                    providers: [
                        { provide: NgLocalization, useClass: NgLocaleLocalization },
                    ],
                },] },
    ];
    /** @nocollapse */
    CommonModule.ctorParameters = [];
    return CommonModule;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the common package.
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */



var DebugDomRootRenderer$1 = __core_private__.DebugDomRootRenderer;

var NoOpAnimationPlayer$1 = __core_private__.NoOpAnimationPlayer;

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var _NoOpAnimationDriver = (function () {
    function _NoOpAnimationDriver() {
    }
    _NoOpAnimationDriver.prototype.animate = function (element, startingStyles, keyframes, duration, delay, easing) {
        return new NoOpAnimationPlayer$1();
    };
    return _NoOpAnimationDriver;
}());
/**
 * @experimental
 */
var AnimationDriver = (function () {
    function AnimationDriver() {
    }
    AnimationDriver.NOOP = new _NoOpAnimationDriver();
    return AnimationDriver;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var globalScope$2;
if (typeof window === 'undefined') {
    if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
        // TODO: Replace any with WorkerGlobalScope from lib.webworker.d.ts #3492
        globalScope$2 = self;
    }
    else {
        globalScope$2 = global;
    }
}
else {
    globalScope$2 = window;
}

// Need to declare a new variable for global here since TypeScript
// exports the original value of the symbol.
var _global$2 = globalScope$2;


var Date$3 = _global$2.Date;
// TODO: remove calls to assert in production environment
// Note: Can't just export this and import in in other files
// as `assert` is a reserved keyword in Dart
_global$2.assert = function assert(condition) {
    // TODO: to be fixed properly via #2830, noop for now
};
function isPresent$2(obj) {
    return obj !== undefined && obj !== null;
}
function isBlank$2(obj) {
    return obj === undefined || obj === null;
}

function isNumber$2(obj) {
    return typeof obj === 'number';
}
function isString$2(obj) {
    return typeof obj === 'string';
}
function isFunction$3(obj) {
    return typeof obj === 'function';
}




function isArray$4(obj) {
    return Array.isArray(obj);
}


function stringify$2(token) {
    if (typeof token === 'string') {
        return token;
    }
    if (token === undefined || token === null) {
        return '' + token;
    }
    if (token.overriddenName) {
        return token.overriddenName;
    }
    if (token.name) {
        return token.name;
    }
    var res = token.toString();
    var newLineIndex = res.indexOf('\n');
    return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
}
// serialize / deserialize enum exist only for consistency with dart API
// enums in typescript don't need to be serialized



var StringWrapper$2 = (function () {
    function StringWrapper() {
    }
    StringWrapper.fromCharCode = function (code) { return String.fromCharCode(code); };
    StringWrapper.charCodeAt = function (s, index) { return s.charCodeAt(index); };
    StringWrapper.split = function (s, regExp) { return s.split(regExp); };
    StringWrapper.equals = function (s, s2) { return s === s2; };
    StringWrapper.stripLeft = function (s, charVal) {
        if (s && s.length) {
            var pos = 0;
            for (var i = 0; i < s.length; i++) {
                if (s[i] != charVal)
                    break;
                pos++;
            }
            s = s.substring(pos);
        }
        return s;
    };
    StringWrapper.stripRight = function (s, charVal) {
        if (s && s.length) {
            var pos = s.length;
            for (var i = s.length - 1; i >= 0; i--) {
                if (s[i] != charVal)
                    break;
                pos--;
            }
            s = s.substring(0, pos);
        }
        return s;
    };
    StringWrapper.replace = function (s, from, replace) {
        return s.replace(from, replace);
    };
    StringWrapper.replaceAll = function (s, from, replace) {
        return s.replace(from, replace);
    };
    StringWrapper.slice = function (s, from, to) {
        if (from === void 0) { from = 0; }
        if (to === void 0) { to = null; }
        return s.slice(from, to === null ? undefined : to);
    };
    StringWrapper.replaceAllMapped = function (s, from, cb) {
        return s.replace(from, function () {
            var matches = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                matches[_i - 0] = arguments[_i];
            }
            // Remove offset & string from the result array
            matches.splice(-2, 2);
            // The callback receives match, p1, ..., pn
            return cb(matches);
        });
    };
    StringWrapper.contains = function (s, substr) { return s.indexOf(substr) != -1; };
    StringWrapper.compare = function (a, b) {
        if (a < b) {
            return -1;
        }
        else if (a > b) {
            return 1;
        }
        else {
            return 0;
        }
    };
    return StringWrapper;
}());

var NumberWrapper$2 = (function () {
    function NumberWrapper() {
    }
    NumberWrapper.toFixed = function (n, fractionDigits) { return n.toFixed(fractionDigits); };
    NumberWrapper.equal = function (a, b) { return a === b; };
    NumberWrapper.parseIntAutoRadix = function (text) {
        var result = parseInt(text);
        if (isNaN(result)) {
            throw new Error('Invalid integer literal when parsing ' + text);
        }
        return result;
    };
    NumberWrapper.parseInt = function (text, radix) {
        if (radix == 10) {
            if (/^(\-|\+)?[0-9]+$/.test(text)) {
                return parseInt(text, radix);
            }
        }
        else if (radix == 16) {
            if (/^(\-|\+)?[0-9ABCDEFabcdef]+$/.test(text)) {
                return parseInt(text, radix);
            }
        }
        else {
            var result = parseInt(text, radix);
            if (!isNaN(result)) {
                return result;
            }
        }
        throw new Error('Invalid integer literal when parsing ' + text + ' in base ' + radix);
    };
    Object.defineProperty(NumberWrapper, "NaN", {
        get: function () { return NaN; },
        enumerable: true,
        configurable: true
    });
    NumberWrapper.isNumeric = function (value) { return !isNaN(value - parseFloat(value)); };
    NumberWrapper.isNaN = function (value) { return isNaN(value); };
    NumberWrapper.isInteger = function (value) { return Number.isInteger(value); };
    return NumberWrapper;
}());


// JS has NaN !== NaN

// JS considers NaN is the same as NaN for map Key (while NaN !== NaN otherwise)
// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map



function isJsObject$2(o) {
    return o !== null && (typeof o === 'function' || typeof o === 'object');
}


// Can't be all uppercase as our transpiler would think it is a special directive...
var Json$2 = (function () {
    function Json() {
    }
    Json.parse = function (s) { return _global$2.JSON.parse(s); };
    Json.stringify = function (data) {
        // Dart doesn't take 3 arguments
        return _global$2.JSON.stringify(data, null, 2);
    };
    return Json;
}());
var DateWrapper$2 = (function () {
    function DateWrapper() {
    }
    DateWrapper.create = function (year, month, day, hour, minutes, seconds, milliseconds) {
        if (month === void 0) { month = 1; }
        if (day === void 0) { day = 1; }
        if (hour === void 0) { hour = 0; }
        if (minutes === void 0) { minutes = 0; }
        if (seconds === void 0) { seconds = 0; }
        if (milliseconds === void 0) { milliseconds = 0; }
        return new Date$3(year, month - 1, day, hour, minutes, seconds, milliseconds);
    };
    DateWrapper.fromISOString = function (str) { return new Date$3(str); };
    DateWrapper.fromMillis = function (ms) { return new Date$3(ms); };
    DateWrapper.toMillis = function (date) { return date.getTime(); };
    DateWrapper.now = function () { return new Date$3(); };
    DateWrapper.toJson = function (date) { return date.toJSON(); };
    return DateWrapper;
}());
function setValueOnPath$2(global, path, value) {
    var parts = path.split('.');
    var obj = global;
    while (parts.length > 1) {
        var name = parts.shift();
        if (obj.hasOwnProperty(name) && isPresent$2(obj[name])) {
            obj = obj[name];
        }
        else {
            obj = obj[name] = {};
        }
    }
    if (obj === undefined || obj === null) {
        obj = {};
    }
    obj[parts.shift()] = value;
}
var _symbolIterator$2 = null;
function getSymbolIterator$2() {
    if (isBlank$2(_symbolIterator$2)) {
        if (isPresent$2(globalScope$2.Symbol) && isPresent$2(Symbol.iterator)) {
            _symbolIterator$2 = Symbol.iterator;
        }
        else {
            // es6-shim specific logic
            var keys = Object.getOwnPropertyNames(Map.prototype);
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                if (key !== 'entries' && key !== 'size' &&
                    Map.prototype[key] === Map.prototype['entries']) {
                    _symbolIterator$2 = key;
                }
            }
        }
    }
    return _symbolIterator$2;
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var Map$3 = _global$2.Map;
var Set$3 = _global$2.Set;
// Safari and Internet Explorer do not support the iterable parameter to the
// Map constructor.  We work around that by manually adding the items.
var createMapFromPairs$2 = (function () {
    try {
        if (new Map$3([[1, 2]]).size === 1) {
            return function createMapFromPairs$2(pairs) { return new Map$3(pairs); };
        }
    }
    catch (e) {
    }
    return function createMapAndPopulateFromPairs(pairs) {
        var map = new Map$3();
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            map.set(pair[0], pair[1]);
        }
        return map;
    };
})();
var createMapFromMap$2 = (function () {
    try {
        if (new Map$3(new Map$3())) {
            return function createMapFromMap$2(m) { return new Map$3(m); };
        }
    }
    catch (e) {
    }
    return function createMapAndPopulateFromMap(m) {
        var map = new Map$3();
        m.forEach(function (v, k) { map.set(k, v); });
        return map;
    };
})();
var _clearValues$2 = (function () {
    if ((new Map$3()).keys().next) {
        return function _clearValues$2(m) {
            var keyIterator = m.keys();
            var k;
            while (!((k = keyIterator.next()).done)) {
                m.set(k.value, null);
            }
        };
    }
    else {
        return function _clearValuesWithForeEach(m) {
            m.forEach(function (v, k) { m.set(k, null); });
        };
    }
})();
// Safari doesn't implement MapIterator.next(), which is used is Traceur's polyfill of Array.from
// TODO(mlaval): remove the work around once we have a working polyfill of Array.from
var _arrayFromMap$2 = (function () {
    try {
        if ((new Map$3()).values().next) {
            return function createArrayFromMap(m, getValues) {
                return getValues ? Array.from(m.values()) : Array.from(m.keys());
            };
        }
    }
    catch (e) {
    }
    return function createArrayFromMapWithForeach(m, getValues) {
        var res = ListWrapper$2.createFixedSize(m.size), i = 0;
        m.forEach(function (v, k) {
            res[i] = getValues ? v : k;
            i++;
        });
        return res;
    };
})();

/**
 * Wraps Javascript Objects
 */
var StringMapWrapper$2 = (function () {
    function StringMapWrapper() {
    }
    StringMapWrapper.create = function () {
        // Note: We are not using Object.create(null) here due to
        // performance!
        // http://jsperf.com/ng2-object-create-null
        return {};
    };
    StringMapWrapper.contains = function (map, key) {
        return map.hasOwnProperty(key);
    };
    StringMapWrapper.get = function (map, key) {
        return map.hasOwnProperty(key) ? map[key] : undefined;
    };
    StringMapWrapper.set = function (map, key, value) { map[key] = value; };
    StringMapWrapper.keys = function (map) { return Object.keys(map); };
    StringMapWrapper.values = function (map) {
        return Object.keys(map).map(function (k) { return map[k]; });
    };
    StringMapWrapper.isEmpty = function (map) {
        for (var prop in map) {
            return false;
        }
        return true;
    };
    StringMapWrapper.delete = function (map, key) { delete map[key]; };
    StringMapWrapper.forEach = function (map, callback) {
        for (var _i = 0, _a = Object.keys(map); _i < _a.length; _i++) {
            var k = _a[_i];
            callback(map[k], k);
        }
    };
    StringMapWrapper.merge = function (m1, m2) {
        var m = {};
        for (var _i = 0, _a = Object.keys(m1); _i < _a.length; _i++) {
            var k = _a[_i];
            m[k] = m1[k];
        }
        for (var _b = 0, _c = Object.keys(m2); _b < _c.length; _b++) {
            var k = _c[_b];
            m[k] = m2[k];
        }
        return m;
    };
    StringMapWrapper.equals = function (m1, m2) {
        var k1 = Object.keys(m1);
        var k2 = Object.keys(m2);
        if (k1.length != k2.length) {
            return false;
        }
        for (var i = 0; i < k1.length; i++) {
            var key = k1[i];
            if (m1[key] !== m2[key]) {
                return false;
            }
        }
        return true;
    };
    return StringMapWrapper;
}());
var ListWrapper$2 = (function () {
    function ListWrapper() {
    }
    // JS has no way to express a statically fixed size list, but dart does so we
    // keep both methods.
    ListWrapper.createFixedSize = function (size) { return new Array(size); };
    ListWrapper.createGrowableSize = function (size) { return new Array(size); };
    ListWrapper.clone = function (array) { return array.slice(0); };
    ListWrapper.forEachWithIndex = function (array, fn) {
        for (var i = 0; i < array.length; i++) {
            fn(array[i], i);
        }
    };
    ListWrapper.first = function (array) {
        if (!array)
            return null;
        return array[0];
    };
    ListWrapper.last = function (array) {
        if (!array || array.length == 0)
            return null;
        return array[array.length - 1];
    };
    ListWrapper.indexOf = function (array, value, startIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        return array.indexOf(value, startIndex);
    };
    ListWrapper.contains = function (list, el) { return list.indexOf(el) !== -1; };
    ListWrapper.reversed = function (array) {
        var a = ListWrapper.clone(array);
        return a.reverse();
    };
    ListWrapper.concat = function (a, b) { return a.concat(b); };
    ListWrapper.insert = function (list, index, value) { list.splice(index, 0, value); };
    ListWrapper.removeAt = function (list, index) {
        var res = list[index];
        list.splice(index, 1);
        return res;
    };
    ListWrapper.removeAll = function (list, items) {
        for (var i = 0; i < items.length; ++i) {
            var index = list.indexOf(items[i]);
            list.splice(index, 1);
        }
    };
    ListWrapper.remove = function (list, el) {
        var index = list.indexOf(el);
        if (index > -1) {
            list.splice(index, 1);
            return true;
        }
        return false;
    };
    ListWrapper.clear = function (list) { list.length = 0; };
    ListWrapper.isEmpty = function (list) { return list.length == 0; };
    ListWrapper.fill = function (list, value, start, end) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = null; }
        list.fill(value, start, end === null ? list.length : end);
    };
    ListWrapper.equals = function (a, b) {
        if (a.length != b.length)
            return false;
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    };
    ListWrapper.slice = function (l, from, to) {
        if (from === void 0) { from = 0; }
        if (to === void 0) { to = null; }
        return l.slice(from, to === null ? undefined : to);
    };
    ListWrapper.splice = function (l, from, length) { return l.splice(from, length); };
    ListWrapper.sort = function (l, compareFn) {
        if (isPresent$2(compareFn)) {
            l.sort(compareFn);
        }
        else {
            l.sort();
        }
    };
    ListWrapper.toString = function (l) { return l.toString(); };
    ListWrapper.toJSON = function (l) { return JSON.stringify(l); };
    ListWrapper.maximum = function (list, predicate) {
        if (list.length == 0) {
            return null;
        }
        var solution = null;
        var maxValue = -Infinity;
        for (var index = 0; index < list.length; index++) {
            var candidate = list[index];
            if (isBlank$2(candidate)) {
                continue;
            }
            var candidateValue = predicate(candidate);
            if (candidateValue > maxValue) {
                solution = candidate;
                maxValue = candidateValue;
            }
        }
        return solution;
    };
    ListWrapper.flatten = function (list) {
        var target = [];
        _flattenArray$2(list, target);
        return target;
    };
    ListWrapper.addAll = function (list, source) {
        for (var i = 0; i < source.length; i++) {
            list.push(source[i]);
        }
    };
    return ListWrapper;
}());
function _flattenArray$2(source, target) {
    if (isPresent$2(source)) {
        for (var i = 0; i < source.length; i++) {
            var item = source[i];
            if (isArray$4(item)) {
                _flattenArray$2(item, target);
            }
            else {
                target.push(item);
            }
        }
    }
    return target;
}



// Safari and Internet Explorer do not support the iterable parameter to the
// Set constructor.  We work around that by manually adding the items.
var createSetFromList$2 = (function () {
    var test = new Set$3([1, 2, 3]);
    if (test.size === 3) {
        return function createSetFromList$2(lst) { return new Set$3(lst); };
    }
    else {
        return function createSetAndPopulateFromList(lst) {
            var res = new Set$3(lst);
            if (res.size !== lst.length) {
                for (var i = 0; i < lst.length; i++) {
                    res.add(lst[i]);
                }
            }
            return res;
        };
    }
})();

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var CAMEL_CASE_REGEXP = /([A-Z])/g;
var DASH_CASE_REGEXP = /-([a-z])/g;
function camelCaseToDashCase(input) {
    return StringWrapper$2.replaceAllMapped(input, CAMEL_CASE_REGEXP, function (m /** TODO #9100 */) { return '-' + m[1].toLowerCase(); });
}
function dashCaseToCamelCase(input) {
    return StringWrapper$2.replaceAllMapped(input, DASH_CASE_REGEXP, function (m /** TODO #9100 */) { return m[1].toUpperCase(); });
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var _DOM = null;
function getDOM() {
    return _DOM;
}

function setRootDomAdapter(adapter) {
    if (isBlank$2(_DOM)) {
        _DOM = adapter;
    }
}
/* tslint:disable:requireParameterType */
/**
 * Provides DOM operations in an environment-agnostic way.
 *
 * @security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */
var DomAdapter = (function () {
    function DomAdapter() {
        this.resourceLoaderType = null;
    }
    Object.defineProperty(DomAdapter.prototype, "attrToPropMap", {
        /**
         * Maps attribute names to their corresponding property names for cases
         * where attribute name doesn't match property name.
         */
        get: function () { return this._attrToPropMap; },
        set: function (value) { this._attrToPropMap = value; },
        enumerable: true,
        configurable: true
    });
    
    
    return DomAdapter;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var WebAnimationsPlayer = (function () {
    function WebAnimationsPlayer(element, keyframes$$1, options) {
        this.element = element;
        this.keyframes = keyframes$$1;
        this.options = options;
        this._onDoneFns = [];
        this._onStartFns = [];
        this._finished = false;
        this._initialized = false;
        this._started = false;
        this.parentPlayer = null;
        this._duration = options['duration'];
    }
    WebAnimationsPlayer.prototype._onFinish = function () {
        if (!this._finished) {
            this._finished = true;
            if (!isPresent$2(this.parentPlayer)) {
                this.destroy();
            }
            this._onDoneFns.forEach(function (fn) { return fn(); });
            this._onDoneFns = [];
        }
    };
    WebAnimationsPlayer.prototype.init = function () {
        var _this = this;
        if (this._initialized)
            return;
        this._initialized = true;
        var keyframes$$1 = this.keyframes.map(function (styles) {
            var formattedKeyframe = {};
            StringMapWrapper$2.forEach(styles, function (value, prop) {
                formattedKeyframe[prop] = value == AUTO_STYLE ? _computeStyle(_this.element, prop) : value;
            });
            return formattedKeyframe;
        });
        this._player = this._triggerWebAnimation(this.element, keyframes$$1, this.options);
        // this is required so that the player doesn't start to animate right away
        this.reset();
        this._player.onfinish = function () { return _this._onFinish(); };
    };
    /** @internal */
    WebAnimationsPlayer.prototype._triggerWebAnimation = function (element, keyframes$$1, options) {
        return element.animate(keyframes$$1, options);
    };
    WebAnimationsPlayer.prototype.onStart = function (fn) { this._onStartFns.push(fn); };
    WebAnimationsPlayer.prototype.onDone = function (fn) { this._onDoneFns.push(fn); };
    WebAnimationsPlayer.prototype.play = function () {
        this.init();
        if (!this.hasStarted()) {
            this._onStartFns.forEach(function (fn) { return fn(); });
            this._onStartFns = [];
            this._started = true;
        }
        this._player.play();
    };
    WebAnimationsPlayer.prototype.pause = function () {
        this.init();
        this._player.pause();
    };
    WebAnimationsPlayer.prototype.finish = function () {
        this.init();
        this._onFinish();
        this._player.finish();
    };
    WebAnimationsPlayer.prototype.reset = function () { this._player.cancel(); };
    WebAnimationsPlayer.prototype.restart = function () {
        this.reset();
        this.play();
    };
    WebAnimationsPlayer.prototype.hasStarted = function () { return this._started; };
    WebAnimationsPlayer.prototype.destroy = function () {
        this.reset();
        this._onFinish();
    };
    Object.defineProperty(WebAnimationsPlayer.prototype, "totalTime", {
        get: function () { return this._duration; },
        enumerable: true,
        configurable: true
    });
    WebAnimationsPlayer.prototype.setPosition = function (p) { this._player.currentTime = p * this.totalTime; };
    WebAnimationsPlayer.prototype.getPosition = function () { return this._player.currentTime / this.totalTime; };
    return WebAnimationsPlayer;
}());
function _computeStyle(element, prop) {
    return getDOM().getComputedStyle(element)[prop];
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var WebAnimationsDriver = (function () {
    function WebAnimationsDriver() {
    }
    WebAnimationsDriver.prototype.animate = function (element, startingStyles, keyframes$$1, duration, delay, easing) {
        var formattedSteps = [];
        var startingStyleLookup = {};
        if (isPresent$2(startingStyles) && startingStyles.styles.length > 0) {
            startingStyleLookup = _populateStyles(element, startingStyles, {});
            startingStyleLookup['offset'] = 0;
            formattedSteps.push(startingStyleLookup);
        }
        keyframes$$1.forEach(function (keyframe) {
            var data = _populateStyles(element, keyframe.styles, startingStyleLookup);
            data['offset'] = keyframe.offset;
            formattedSteps.push(data);
        });
        // this is a special case when only styles are applied as an
        // animation. When this occurs we want to animate from start to
        // end with the same values. Removing the offset and having only
        // start/end values is suitable enough for the web-animations API
        if (formattedSteps.length == 1) {
            var start = formattedSteps[0];
            start['offset'] = null;
            formattedSteps = [start, start];
        }
        var playerOptions = {
            'duration': duration,
            'delay': delay,
            'fill': 'both' // we use `both` because it allows for styling at 0% to work with `delay`
        };
        // we check for this to avoid having a null|undefined value be present
        // for the easing (which results in an error for certain browsers #9752)
        if (easing) {
            playerOptions['easing'] = easing;
        }
        return new WebAnimationsPlayer(element, formattedSteps, playerOptions);
    };
    return WebAnimationsDriver;
}());
function _populateStyles(element, styles, defaultStyles) {
    var data = {};
    styles.styles.forEach(function (entry) {
        StringMapWrapper$2.forEach(entry, function (val, prop) {
            var formattedProp = dashCaseToCamelCase(prop);
            data[formattedProp] =
                val == AUTO_STYLE ? val : val.toString() + _resolveStyleUnit(val, prop, formattedProp);
        });
    });
    StringMapWrapper$2.forEach(defaultStyles, function (value, prop) {
        if (!isPresent$2(data[prop])) {
            data[prop] = value;
        }
    });
    return data;
}
function _resolveStyleUnit(val, userProvidedProp, formattedProp) {
    var unit = '';
    if (_isPixelDimensionStyle(formattedProp) && val != 0 && val != '0') {
        if (isNumber$2(val)) {
            unit = 'px';
        }
        else if (_findDimensionalSuffix(val.toString()).length == 0) {
            throw new Error('Please provide a CSS unit value for ' + userProvidedProp + ':' + val);
        }
    }
    return unit;
}
var _$0 = 48;
var _$9 = 57;
var _$PERIOD = 46;
function _findDimensionalSuffix(value) {
    for (var i = 0; i < value.length; i++) {
        var c = StringWrapper$2.charCodeAt(value, i);
        if ((c >= _$0 && c <= _$9) || c == _$PERIOD)
            continue;
        return value.substring(i, value.length);
    }
    return '';
}
function _isPixelDimensionStyle(prop) {
    switch (prop) {
        case 'width':
        case 'height':
        case 'minWidth':
        case 'minHeight':
        case 'maxWidth':
        case 'maxHeight':
        case 'left':
        case 'top':
        case 'bottom':
        case 'right':
        case 'fontSize':
        case 'outlineWidth':
        case 'outlineOffset':
        case 'paddingTop':
        case 'paddingLeft':
        case 'paddingBottom':
        case 'paddingRight':
        case 'marginTop':
        case 'marginLeft':
        case 'marginBottom':
        case 'marginRight':
        case 'borderRadius':
        case 'borderWidth':
        case 'borderTopWidth':
        case 'borderLeftWidth':
        case 'borderRightWidth':
        case 'borderBottomWidth':
        case 'textIndent':
            return true;
        default:
            return false;
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$27 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Provides DOM operations in any browser environment.
 *
 * @security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */
var GenericBrowserDomAdapter = (function (_super) {
    __extends$27(GenericBrowserDomAdapter, _super);
    function GenericBrowserDomAdapter() {
        var _this = this;
        _super.call(this);
        this._animationPrefix = null;
        this._transitionEnd = null;
        try {
            var element = this.createElement('div', this.defaultDoc());
            if (isPresent$2(this.getStyle(element, 'animationName'))) {
                this._animationPrefix = '';
            }
            else {
                var domPrefixes = ['Webkit', 'Moz', 'O', 'ms'];
                for (var i = 0; i < domPrefixes.length; i++) {
                    if (isPresent$2(this.getStyle(element, domPrefixes[i] + 'AnimationName'))) {
                        this._animationPrefix = '-' + domPrefixes[i].toLowerCase() + '-';
                        break;
                    }
                }
            }
            var transEndEventNames = {
                WebkitTransition: 'webkitTransitionEnd',
                MozTransition: 'transitionend',
                OTransition: 'oTransitionEnd otransitionend',
                transition: 'transitionend'
            };
            StringMapWrapper$2.forEach(transEndEventNames, function (value, key) {
                if (isPresent$2(_this.getStyle(element, key))) {
                    _this._transitionEnd = value;
                }
            });
        }
        catch (e) {
            this._animationPrefix = null;
            this._transitionEnd = null;
        }
    }
    GenericBrowserDomAdapter.prototype.getDistributedNodes = function (el) { return el.getDistributedNodes(); };
    GenericBrowserDomAdapter.prototype.resolveAndSetHref = function (el, baseUrl, href) {
        el.href = href == null ? baseUrl : baseUrl + '/../' + href;
    };
    GenericBrowserDomAdapter.prototype.supportsDOMEvents = function () { return true; };
    GenericBrowserDomAdapter.prototype.supportsNativeShadowDOM = function () {
        return isFunction$3(this.defaultDoc().body.createShadowRoot);
    };
    GenericBrowserDomAdapter.prototype.getAnimationPrefix = function () {
        return isPresent$2(this._animationPrefix) ? this._animationPrefix : '';
    };
    GenericBrowserDomAdapter.prototype.getTransitionEnd = function () { return isPresent$2(this._transitionEnd) ? this._transitionEnd : ''; };
    GenericBrowserDomAdapter.prototype.supportsAnimation = function () {
        return isPresent$2(this._animationPrefix) && isPresent$2(this._transitionEnd);
    };
    return GenericBrowserDomAdapter;
}(DomAdapter));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$26 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _attrToPropMap = {
    'class': 'className',
    'innerHtml': 'innerHTML',
    'readonly': 'readOnly',
    'tabindex': 'tabIndex'
};
var DOM_KEY_LOCATION_NUMPAD = 3;
// Map to convert some key or keyIdentifier values to what will be returned by getEventKey
var _keyMap = {
    // The following values are here for cross-browser compatibility and to match the W3C standard
    // cf http://www.w3.org/TR/DOM-Level-3-Events-key/
    '\b': 'Backspace',
    '\t': 'Tab',
    '\x7F': 'Delete',
    '\x1B': 'Escape',
    'Del': 'Delete',
    'Esc': 'Escape',
    'Left': 'ArrowLeft',
    'Right': 'ArrowRight',
    'Up': 'ArrowUp',
    'Down': 'ArrowDown',
    'Menu': 'ContextMenu',
    'Scroll': 'ScrollLock',
    'Win': 'OS'
};
// There is a bug in Chrome for numeric keypad keys:
// https://code.google.com/p/chromium/issues/detail?id=155654
// 1, 2, 3 ... are reported as A, B, C ...
var _chromeNumKeyPadMap = {
    'A': '1',
    'B': '2',
    'C': '3',
    'D': '4',
    'E': '5',
    'F': '6',
    'G': '7',
    'H': '8',
    'I': '9',
    'J': '*',
    'K': '+',
    'M': '-',
    'N': '.',
    'O': '/',
    '\x60': '0',
    '\x90': 'NumLock'
};
/**
 * A `DomAdapter` powered by full browser DOM APIs.
 *
 * @security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */
/* tslint:disable:requireParameterType */
var BrowserDomAdapter = (function (_super) {
    __extends$26(BrowserDomAdapter, _super);
    function BrowserDomAdapter() {
        _super.apply(this, arguments);
    }
    BrowserDomAdapter.prototype.parse = function (templateHtml) { throw new Error('parse not implemented'); };
    BrowserDomAdapter.makeCurrent = function () { setRootDomAdapter(new BrowserDomAdapter()); };
    BrowserDomAdapter.prototype.hasProperty = function (element /** TODO #9100 */, name) { return name in element; };
    BrowserDomAdapter.prototype.setProperty = function (el, name, value) { el[name] = value; };
    BrowserDomAdapter.prototype.getProperty = function (el, name) { return el[name]; };
    BrowserDomAdapter.prototype.invoke = function (el, methodName, args) {
        el[methodName].apply(el, args);
    };
    // TODO(tbosch): move this into a separate environment class once we have it
    BrowserDomAdapter.prototype.logError = function (error /** TODO #9100 */) {
        if (window.console.error) {
            window.console.error(error);
        }
        else {
            window.console.log(error);
        }
    };
    BrowserDomAdapter.prototype.log = function (error /** TODO #9100 */) { window.console.log(error); };
    BrowserDomAdapter.prototype.logGroup = function (error /** TODO #9100 */) {
        if (window.console.group) {
            window.console.group(error);
            this.logError(error);
        }
        else {
            window.console.log(error);
        }
    };
    BrowserDomAdapter.prototype.logGroupEnd = function () {
        if (window.console.groupEnd) {
            window.console.groupEnd();
        }
    };
    Object.defineProperty(BrowserDomAdapter.prototype, "attrToPropMap", {
        get: function () { return _attrToPropMap; },
        enumerable: true,
        configurable: true
    });
    BrowserDomAdapter.prototype.query = function (selector) { return document.querySelector(selector); };
    BrowserDomAdapter.prototype.querySelector = function (el /** TODO #9100 */, selector) {
        return el.querySelector(selector);
    };
    BrowserDomAdapter.prototype.querySelectorAll = function (el /** TODO #9100 */, selector) {
        return el.querySelectorAll(selector);
    };
    BrowserDomAdapter.prototype.on = function (el /** TODO #9100 */, evt /** TODO #9100 */, listener /** TODO #9100 */) {
        el.addEventListener(evt, listener, false);
    };
    BrowserDomAdapter.prototype.onAndCancel = function (el /** TODO #9100 */, evt /** TODO #9100 */, listener /** TODO #9100 */) {
        el.addEventListener(evt, listener, false);
        // Needed to follow Dart's subscription semantic, until fix of
        // https://code.google.com/p/dart/issues/detail?id=17406
        return function () { el.removeEventListener(evt, listener, false); };
    };
    BrowserDomAdapter.prototype.dispatchEvent = function (el /** TODO #9100 */, evt /** TODO #9100 */) { el.dispatchEvent(evt); };
    BrowserDomAdapter.prototype.createMouseEvent = function (eventType) {
        var evt = document.createEvent('MouseEvent');
        evt.initEvent(eventType, true, true);
        return evt;
    };
    BrowserDomAdapter.prototype.createEvent = function (eventType /** TODO #9100 */) {
        var evt = document.createEvent('Event');
        evt.initEvent(eventType, true, true);
        return evt;
    };
    BrowserDomAdapter.prototype.preventDefault = function (evt) {
        evt.preventDefault();
        evt.returnValue = false;
    };
    BrowserDomAdapter.prototype.isPrevented = function (evt) {
        return evt.defaultPrevented || isPresent$2(evt.returnValue) && !evt.returnValue;
    };
    BrowserDomAdapter.prototype.getInnerHTML = function (el /** TODO #9100 */) { return el.innerHTML; };
    BrowserDomAdapter.prototype.getTemplateContent = function (el /** TODO #9100 */) {
        return 'content' in el && el instanceof HTMLTemplateElement ? el.content : null;
    };
    BrowserDomAdapter.prototype.getOuterHTML = function (el /** TODO #9100 */) { return el.outerHTML; };
    BrowserDomAdapter.prototype.nodeName = function (node) { return node.nodeName; };
    BrowserDomAdapter.prototype.nodeValue = function (node) { return node.nodeValue; };
    BrowserDomAdapter.prototype.type = function (node) { return node.type; };
    BrowserDomAdapter.prototype.content = function (node) {
        if (this.hasProperty(node, 'content')) {
            return node.content;
        }
        else {
            return node;
        }
    };
    BrowserDomAdapter.prototype.firstChild = function (el /** TODO #9100 */) { return el.firstChild; };
    BrowserDomAdapter.prototype.nextSibling = function (el /** TODO #9100 */) { return el.nextSibling; };
    BrowserDomAdapter.prototype.parentElement = function (el /** TODO #9100 */) { return el.parentNode; };
    BrowserDomAdapter.prototype.childNodes = function (el /** TODO #9100 */) { return el.childNodes; };
    BrowserDomAdapter.prototype.childNodesAsList = function (el /** TODO #9100 */) {
        var childNodes = el.childNodes;
        var res = ListWrapper$2.createFixedSize(childNodes.length);
        for (var i = 0; i < childNodes.length; i++) {
            res[i] = childNodes[i];
        }
        return res;
    };
    BrowserDomAdapter.prototype.clearNodes = function (el /** TODO #9100 */) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    };
    BrowserDomAdapter.prototype.appendChild = function (el /** TODO #9100 */, node /** TODO #9100 */) { el.appendChild(node); };
    BrowserDomAdapter.prototype.removeChild = function (el /** TODO #9100 */, node /** TODO #9100 */) { el.removeChild(node); };
    BrowserDomAdapter.prototype.replaceChild = function (el, newChild /** TODO #9100 */, oldChild /** TODO #9100 */) {
        el.replaceChild(newChild, oldChild);
    };
    BrowserDomAdapter.prototype.remove = function (node /** TODO #9100 */) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
        return node;
    };
    BrowserDomAdapter.prototype.insertBefore = function (el /** TODO #9100 */, node /** TODO #9100 */) {
        el.parentNode.insertBefore(node, el);
    };
    BrowserDomAdapter.prototype.insertAllBefore = function (el /** TODO #9100 */, nodes /** TODO #9100 */) {
        nodes.forEach(function (n /** TODO #9100 */) { return el.parentNode.insertBefore(n, el); });
    };
    BrowserDomAdapter.prototype.insertAfter = function (el /** TODO #9100 */, node /** TODO #9100 */) {
        el.parentNode.insertBefore(node, el.nextSibling);
    };
    BrowserDomAdapter.prototype.setInnerHTML = function (el /** TODO #9100 */, value /** TODO #9100 */) { el.innerHTML = value; };
    BrowserDomAdapter.prototype.getText = function (el /** TODO #9100 */) { return el.textContent; };
    // TODO(vicb): removed Element type because it does not support StyleElement
    BrowserDomAdapter.prototype.setText = function (el /** TODO #9100 */, value) { el.textContent = value; };
    BrowserDomAdapter.prototype.getValue = function (el /** TODO #9100 */) { return el.value; };
    BrowserDomAdapter.prototype.setValue = function (el /** TODO #9100 */, value) { el.value = value; };
    BrowserDomAdapter.prototype.getChecked = function (el /** TODO #9100 */) { return el.checked; };
    BrowserDomAdapter.prototype.setChecked = function (el /** TODO #9100 */, value) { el.checked = value; };
    BrowserDomAdapter.prototype.createComment = function (text) { return document.createComment(text); };
    BrowserDomAdapter.prototype.createTemplate = function (html /** TODO #9100 */) {
        var t = document.createElement('template');
        t.innerHTML = html;
        return t;
    };
    BrowserDomAdapter.prototype.createElement = function (tagName /* TODO #9100 */, doc) {
        if (doc === void 0) { doc = document; }
        return doc.createElement(tagName);
    };
    BrowserDomAdapter.prototype.createElementNS = function (ns /* TODO #9100 */, tagName /* TODO #9100 */, doc) {
        if (doc === void 0) { doc = document; }
        return doc.createElementNS(ns, tagName);
    };
    BrowserDomAdapter.prototype.createTextNode = function (text, doc) {
        if (doc === void 0) { doc = document; }
        return doc.createTextNode(text);
    };
    BrowserDomAdapter.prototype.createScriptTag = function (attrName, attrValue, doc) {
        if (doc === void 0) { doc = document; }
        var el = doc.createElement('SCRIPT');
        el.setAttribute(attrName, attrValue);
        return el;
    };
    BrowserDomAdapter.prototype.createStyleElement = function (css, doc) {
        if (doc === void 0) { doc = document; }
        var style = doc.createElement('style');
        this.appendChild(style, this.createTextNode(css));
        return style;
    };
    BrowserDomAdapter.prototype.createShadowRoot = function (el) { return el.createShadowRoot(); };
    BrowserDomAdapter.prototype.getShadowRoot = function (el) { return el.shadowRoot; };
    BrowserDomAdapter.prototype.getHost = function (el) { return el.host; };
    BrowserDomAdapter.prototype.clone = function (node) { return node.cloneNode(true); };
    BrowserDomAdapter.prototype.getElementsByClassName = function (element /** TODO #9100 */, name) {
        return element.getElementsByClassName(name);
    };
    BrowserDomAdapter.prototype.getElementsByTagName = function (element /** TODO #9100 */, name) {
        return element.getElementsByTagName(name);
    };
    BrowserDomAdapter.prototype.classList = function (element /** TODO #9100 */) {
        return Array.prototype.slice.call(element.classList, 0);
    };
    BrowserDomAdapter.prototype.addClass = function (element /** TODO #9100 */, className) { element.classList.add(className); };
    BrowserDomAdapter.prototype.removeClass = function (element /** TODO #9100 */, className) {
        element.classList.remove(className);
    };
    BrowserDomAdapter.prototype.hasClass = function (element /** TODO #9100 */, className) {
        return element.classList.contains(className);
    };
    BrowserDomAdapter.prototype.setStyle = function (element /** TODO #9100 */, styleName, styleValue) {
        element.style[styleName] = styleValue;
    };
    BrowserDomAdapter.prototype.removeStyle = function (element /** TODO #9100 */, stylename) {
        element.style[stylename] = null;
    };
    BrowserDomAdapter.prototype.getStyle = function (element /** TODO #9100 */, stylename) {
        return element.style[stylename];
    };
    BrowserDomAdapter.prototype.hasStyle = function (element /** TODO #9100 */, styleName, styleValue) {
        if (styleValue === void 0) { styleValue = null; }
        var value = this.getStyle(element, styleName) || '';
        return styleValue ? value == styleValue : value.length > 0;
    };
    BrowserDomAdapter.prototype.tagName = function (element /** TODO #9100 */) { return element.tagName; };
    BrowserDomAdapter.prototype.attributeMap = function (element /** TODO #9100 */) {
        var res = new Map();
        var elAttrs = element.attributes;
        for (var i = 0; i < elAttrs.length; i++) {
            var attrib = elAttrs[i];
            res.set(attrib.name, attrib.value);
        }
        return res;
    };
    BrowserDomAdapter.prototype.hasAttribute = function (element /** TODO #9100 */, attribute) {
        return element.hasAttribute(attribute);
    };
    BrowserDomAdapter.prototype.hasAttributeNS = function (element /** TODO #9100 */, ns, attribute) {
        return element.hasAttributeNS(ns, attribute);
    };
    BrowserDomAdapter.prototype.getAttribute = function (element /** TODO #9100 */, attribute) {
        return element.getAttribute(attribute);
    };
    BrowserDomAdapter.prototype.getAttributeNS = function (element /** TODO #9100 */, ns, name) {
        return element.getAttributeNS(ns, name);
    };
    BrowserDomAdapter.prototype.setAttribute = function (element /** TODO #9100 */, name, value) {
        element.setAttribute(name, value);
    };
    BrowserDomAdapter.prototype.setAttributeNS = function (element /** TODO #9100 */, ns, name, value) {
        element.setAttributeNS(ns, name, value);
    };
    BrowserDomAdapter.prototype.removeAttribute = function (element /** TODO #9100 */, attribute) {
        element.removeAttribute(attribute);
    };
    BrowserDomAdapter.prototype.removeAttributeNS = function (element /** TODO #9100 */, ns, name) {
        element.removeAttributeNS(ns, name);
    };
    BrowserDomAdapter.prototype.templateAwareRoot = function (el /** TODO #9100 */) {
        return this.isTemplateElement(el) ? this.content(el) : el;
    };
    BrowserDomAdapter.prototype.createHtmlDocument = function () {
        return document.implementation.createHTMLDocument('fakeTitle');
    };
    BrowserDomAdapter.prototype.defaultDoc = function () { return document; };
    BrowserDomAdapter.prototype.getBoundingClientRect = function (el /** TODO #9100 */) {
        try {
            return el.getBoundingClientRect();
        }
        catch (e) {
            return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
        }
    };
    BrowserDomAdapter.prototype.getTitle = function () { return document.title; };
    BrowserDomAdapter.prototype.setTitle = function (newTitle) { document.title = newTitle || ''; };
    BrowserDomAdapter.prototype.elementMatches = function (n /** TODO #9100 */, selector) {
        var matches = false;
        if (n instanceof HTMLElement) {
            if (n.matches) {
                matches = n.matches(selector);
            }
            else if (n.msMatchesSelector) {
                matches = n.msMatchesSelector(selector);
            }
            else if (n.webkitMatchesSelector) {
                matches = n.webkitMatchesSelector(selector);
            }
        }
        return matches;
    };
    BrowserDomAdapter.prototype.isTemplateElement = function (el) {
        return el instanceof HTMLElement && el.nodeName == 'TEMPLATE';
    };
    BrowserDomAdapter.prototype.isTextNode = function (node) { return node.nodeType === Node.TEXT_NODE; };
    BrowserDomAdapter.prototype.isCommentNode = function (node) { return node.nodeType === Node.COMMENT_NODE; };
    BrowserDomAdapter.prototype.isElementNode = function (node) { return node.nodeType === Node.ELEMENT_NODE; };
    BrowserDomAdapter.prototype.hasShadowRoot = function (node /** TODO #9100 */) {
        return isPresent$2(node.shadowRoot) && node instanceof HTMLElement;
    };
    BrowserDomAdapter.prototype.isShadowRoot = function (node /** TODO #9100 */) { return node instanceof DocumentFragment; };
    BrowserDomAdapter.prototype.importIntoDoc = function (node) {
        var toImport = node;
        if (this.isTemplateElement(node)) {
            toImport = this.content(node);
        }
        return document.importNode(toImport, true);
    };
    BrowserDomAdapter.prototype.adoptNode = function (node) { return document.adoptNode(node); };
    BrowserDomAdapter.prototype.getHref = function (el) { return el.href; };
    BrowserDomAdapter.prototype.getEventKey = function (event /** TODO #9100 */) {
        var key = event.key;
        if (isBlank$2(key)) {
            key = event.keyIdentifier;
            // keyIdentifier is defined in the old draft of DOM Level 3 Events implemented by Chrome and
            // Safari
            // cf
            // http://www.w3.org/TR/2007/WD-DOM-Level-3-Events-20071221/events.html#Events-KeyboardEvents-Interfaces
            if (isBlank$2(key)) {
                return 'Unidentified';
            }
            if (key.startsWith('U+')) {
                key = String.fromCharCode(parseInt(key.substring(2), 16));
                if (event.location === DOM_KEY_LOCATION_NUMPAD && _chromeNumKeyPadMap.hasOwnProperty(key)) {
                    // There is a bug in Chrome for numeric keypad keys:
                    // https://code.google.com/p/chromium/issues/detail?id=155654
                    // 1, 2, 3 ... are reported as A, B, C ...
                    key = _chromeNumKeyPadMap[key];
                }
            }
        }
        if (_keyMap.hasOwnProperty(key)) {
            key = _keyMap[key];
        }
        return key;
    };
    BrowserDomAdapter.prototype.getGlobalEventTarget = function (target) {
        if (target == 'window') {
            return window;
        }
        else if (target == 'document') {
            return document;
        }
        else if (target == 'body') {
            return document.body;
        }
    };
    BrowserDomAdapter.prototype.getHistory = function () { return window.history; };
    BrowserDomAdapter.prototype.getLocation = function () { return window.location; };
    BrowserDomAdapter.prototype.getBaseHref = function () {
        var href = getBaseElementHref();
        if (isBlank$2(href)) {
            return null;
        }
        return relativePath(href);
    };
    BrowserDomAdapter.prototype.resetBaseElement = function () { baseElement = null; };
    BrowserDomAdapter.prototype.getUserAgent = function () { return window.navigator.userAgent; };
    BrowserDomAdapter.prototype.setData = function (element /** TODO #9100 */, name, value) {
        this.setAttribute(element, 'data-' + name, value);
    };
    BrowserDomAdapter.prototype.getData = function (element /** TODO #9100 */, name) {
        return this.getAttribute(element, 'data-' + name);
    };
    BrowserDomAdapter.prototype.getComputedStyle = function (element /** TODO #9100 */) { return getComputedStyle(element); };
    // TODO(tbosch): move this into a separate environment class once we have it
    BrowserDomAdapter.prototype.setGlobalVar = function (path, value) { setValueOnPath$2(_global$2, path, value); };
    BrowserDomAdapter.prototype.supportsWebAnimation = function () { return isFunction$3(Element.prototype['animate']); };
    BrowserDomAdapter.prototype.performanceNow = function () {
        // performance.now() is not available in all browsers, see
        // http://caniuse.com/#search=performance.now
        if (isPresent$2(window.performance) && isPresent$2(window.performance.now)) {
            return window.performance.now();
        }
        else {
            return DateWrapper$2.toMillis(DateWrapper$2.now());
        }
    };
    BrowserDomAdapter.prototype.supportsCookies = function () { return true; };
    BrowserDomAdapter.prototype.getCookie = function (name) { return parseCookieValue(document.cookie, name); };
    BrowserDomAdapter.prototype.setCookie = function (name, value) {
        // document.cookie is magical, assigning into it assigns/overrides one cookie value, but does
        // not clear other cookies.
        document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    };
    return BrowserDomAdapter;
}(GenericBrowserDomAdapter));
var baseElement = null;
function getBaseElementHref() {
    if (isBlank$2(baseElement)) {
        baseElement = document.querySelector('base');
        if (isBlank$2(baseElement)) {
            return null;
        }
    }
    return baseElement.getAttribute('href');
}
// based on urlUtils.js in AngularJS 1
var urlParsingNode = null;
function relativePath(url /** TODO #9100 */) {
    if (isBlank$2(urlParsingNode)) {
        urlParsingNode = document.createElement('a');
    }
    urlParsingNode.setAttribute('href', url);
    return (urlParsingNode.pathname.charAt(0) === '/') ? urlParsingNode.pathname :
        '/' + urlParsingNode.pathname;
}
function parseCookieValue(cookieStr, name) {
    name = encodeURIComponent(name);
    for (var _i = 0, _a = cookieStr.split(';'); _i < _a.length; _i++) {
        var cookie = _a[_i];
        var eqIndex = cookie.indexOf('=');
        var _b = eqIndex == -1 ? [cookie, ''] : [cookie.slice(0, eqIndex), cookie.slice(eqIndex + 1)], cookieName = _b[0], cookieValue = _b[1];
        if (cookieName.trim() === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function supportsState() {
    return !!window.history.pushState;
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$28 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * `PlatformLocation` encapsulates all of the direct calls to platform APIs.
 * This class should not be used directly by an application developer. Instead, use
 * {@link Location}.
 */
var BrowserPlatformLocation = (function (_super) {
    __extends$28(BrowserPlatformLocation, _super);
    function BrowserPlatformLocation() {
        _super.call(this);
        this._init();
    }
    // This is moved to its own method so that `MockPlatformLocationStrategy` can overwrite it
    /** @internal */
    BrowserPlatformLocation.prototype._init = function () {
        this._location = getDOM().getLocation();
        this._history = getDOM().getHistory();
    };
    Object.defineProperty(BrowserPlatformLocation.prototype, "location", {
        get: function () { return this._location; },
        enumerable: true,
        configurable: true
    });
    BrowserPlatformLocation.prototype.getBaseHrefFromDOM = function () { return getDOM().getBaseHref(); };
    BrowserPlatformLocation.prototype.onPopState = function (fn) {
        getDOM().getGlobalEventTarget('window').addEventListener('popstate', fn, false);
    };
    BrowserPlatformLocation.prototype.onHashChange = function (fn) {
        getDOM().getGlobalEventTarget('window').addEventListener('hashchange', fn, false);
    };
    Object.defineProperty(BrowserPlatformLocation.prototype, "pathname", {
        get: function () { return this._location.pathname; },
        set: function (newPath) { this._location.pathname = newPath; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserPlatformLocation.prototype, "search", {
        get: function () { return this._location.search; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserPlatformLocation.prototype, "hash", {
        get: function () { return this._location.hash; },
        enumerable: true,
        configurable: true
    });
    BrowserPlatformLocation.prototype.pushState = function (state$$1, title, url) {
        if (supportsState()) {
            this._history.pushState(state$$1, title, url);
        }
        else {
            this._location.hash = url;
        }
    };
    BrowserPlatformLocation.prototype.replaceState = function (state$$1, title, url) {
        if (supportsState()) {
            this._history.replaceState(state$$1, title, url);
        }
        else {
            this._location.hash = url;
        }
    };
    BrowserPlatformLocation.prototype.forward = function () { this._history.forward(); };
    BrowserPlatformLocation.prototype.back = function () { this._history.back(); };
    BrowserPlatformLocation.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BrowserPlatformLocation.ctorParameters = [];
    return BrowserPlatformLocation;
}(PlatformLocation));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var BrowserGetTestability = (function () {
    function BrowserGetTestability() {
    }
    BrowserGetTestability.init = function () { setTestabilityGetter(new BrowserGetTestability()); };
    BrowserGetTestability.prototype.addToWindow = function (registry) {
        _global$2.getAngularTestability = function (elem, findInAncestors) {
            if (findInAncestors === void 0) { findInAncestors = true; }
            var testability = registry.findTestabilityInTree(elem, findInAncestors);
            if (testability == null) {
                throw new Error('Could not find testability for element.');
            }
            return testability;
        };
        _global$2.getAllAngularTestabilities = function () { return registry.getAllTestabilities(); };
        _global$2.getAllAngularRootElements = function () { return registry.getAllRootElements(); };
        var whenAllStable = function (callback /** TODO #9100 */) {
            var testabilities = _global$2.getAllAngularTestabilities();
            var count = testabilities.length;
            var didWork = false;
            var decrement = function (didWork_ /** TODO #9100 */) {
                didWork = didWork || didWork_;
                count--;
                if (count == 0) {
                    callback(didWork);
                }
            };
            testabilities.forEach(function (testability /** TODO #9100 */) {
                testability.whenStable(decrement);
            });
        };
        if (!_global$2['frameworkStabilizers']) {
            _global$2['frameworkStabilizers'] = ListWrapper$2.createGrowableSize(0);
        }
        _global$2['frameworkStabilizers'].push(whenAllStable);
    };
    BrowserGetTestability.prototype.findTestabilityInTree = function (registry, elem, findInAncestors) {
        if (elem == null) {
            return null;
        }
        var t = registry.getTestability(elem);
        if (isPresent$2(t)) {
            return t;
        }
        else if (!findInAncestors) {
            return null;
        }
        if (getDOM().isShadowRoot(elem)) {
            return this.findTestabilityInTree(registry, getDOM().getHost(elem), true);
        }
        return this.findTestabilityInTree(registry, getDOM().parentElement(elem), true);
    };
    return BrowserGetTestability;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A service that can be used to get and set the title of a current HTML document.
 *
 * Since an Angular 2 application can't be bootstrapped on the entire HTML document (`<html>` tag)
 * it is not possible to bind to the `text` property of the `HTMLTitleElement` elements
 * (representing the `<title>` tag). Instead, this service can be used to set and get the current
 * title value.
 *
 * @experimental
 */
var Title = (function () {
    function Title() {
    }
    /**
     * Get the title of the current HTML document.
     * @returns {string}
     */
    Title.prototype.getTitle = function () { return getDOM().getTitle(); };
    /**
     * Set the title of the current HTML document.
     * @param newTitle
     */
    Title.prototype.setTitle = function (newTitle) { getDOM().setTitle(newTitle); };
    return Title;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A DI Token representing the main rendering context. In a browser this is the DOM Document.
 *
 * Note: Document might not be available in the Application Context when Application and Rendering
 * Contexts are not the same (e.g. when running the application into a Web Worker).
 *
 * @stable
 */
var DOCUMENT = new OpaqueToken('DocumentToken');

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @stable
 */
var EVENT_MANAGER_PLUGINS = new OpaqueToken('EventManagerPlugins');
/**
 * @stable
 */
var EventManager = (function () {
    function EventManager(plugins, _zone) {
        var _this = this;
        this._zone = _zone;
        plugins.forEach(function (p) { return p.manager = _this; });
        this._plugins = plugins.slice().reverse();
    }
    EventManager.prototype.addEventListener = function (element, eventName, handler) {
        var plugin = this._findPluginFor(eventName);
        return plugin.addEventListener(element, eventName, handler);
    };
    EventManager.prototype.addGlobalEventListener = function (target, eventName, handler) {
        var plugin = this._findPluginFor(eventName);
        return plugin.addGlobalEventListener(target, eventName, handler);
    };
    EventManager.prototype.getZone = function () { return this._zone; };
    /** @internal */
    EventManager.prototype._findPluginFor = function (eventName) {
        var plugins = this._plugins;
        for (var i = 0; i < plugins.length; i++) {
            var plugin = plugins[i];
            if (plugin.supports(eventName)) {
                return plugin;
            }
        }
        throw new Error("No event manager plugin found for event " + eventName);
    };
    EventManager.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    EventManager.ctorParameters = [
        { type: Array, decorators: [{ type: Inject, args: [EVENT_MANAGER_PLUGINS,] },] },
        { type: NgZone, },
    ];
    return EventManager;
}());
var EventManagerPlugin = (function () {
    function EventManagerPlugin() {
    }
    // That is equivalent to having supporting $event.target
    EventManagerPlugin.prototype.supports = function (eventName) { return false; };
    EventManagerPlugin.prototype.addEventListener = function (element, eventName, handler) {
        throw 'not implemented';
    };
    EventManagerPlugin.prototype.addGlobalEventListener = function (element, eventName, handler) {
        throw 'not implemented';
    };
    return EventManagerPlugin;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$30 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SharedStylesHost = (function () {
    function SharedStylesHost() {
        /** @internal */
        this._styles = [];
        /** @internal */
        this._stylesSet = new Set();
    }
    SharedStylesHost.prototype.addStyles = function (styles) {
        var _this = this;
        var additions = [];
        styles.forEach(function (style$$1) {
            if (!_this._stylesSet.has(style$$1)) {
                _this._stylesSet.add(style$$1);
                _this._styles.push(style$$1);
                additions.push(style$$1);
            }
        });
        this.onStylesAdded(additions);
    };
    SharedStylesHost.prototype.onStylesAdded = function (additions) { };
    SharedStylesHost.prototype.getAllStyles = function () { return this._styles; };
    SharedStylesHost.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SharedStylesHost.ctorParameters = [];
    return SharedStylesHost;
}());
var DomSharedStylesHost = (function (_super) {
    __extends$30(DomSharedStylesHost, _super);
    function DomSharedStylesHost(doc) {
        _super.call(this);
        this._hostNodes = new Set();
        this._hostNodes.add(doc.head);
    }
    /** @internal */
    DomSharedStylesHost.prototype._addStylesToHost = function (styles, host) {
        for (var i = 0; i < styles.length; i++) {
            var style$$1 = styles[i];
            getDOM().appendChild(host, getDOM().createStyleElement(style$$1));
        }
    };
    DomSharedStylesHost.prototype.addHost = function (hostNode) {
        this._addStylesToHost(this._styles, hostNode);
        this._hostNodes.add(hostNode);
    };
    DomSharedStylesHost.prototype.removeHost = function (hostNode) { this._hostNodes.delete(hostNode); };
    DomSharedStylesHost.prototype.onStylesAdded = function (additions) {
        var _this = this;
        this._hostNodes.forEach(function (hostNode) { _this._addStylesToHost(additions, hostNode); });
    };
    DomSharedStylesHost.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DomSharedStylesHost.ctorParameters = [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    ];
    return DomSharedStylesHost;
}(SharedStylesHost));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$29 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NAMESPACE_URIS = {
    'xlink': 'http://www.w3.org/1999/xlink',
    'svg': 'http://www.w3.org/2000/svg',
    'xhtml': 'http://www.w3.org/1999/xhtml'
};
var TEMPLATE_COMMENT_TEXT = 'template bindings={}';
var TEMPLATE_BINDINGS_EXP = /^template bindings=(.*)$/;
var DomRootRenderer = (function () {
    function DomRootRenderer(document, eventManager, sharedStylesHost, animationDriver) {
        this.document = document;
        this.eventManager = eventManager;
        this.sharedStylesHost = sharedStylesHost;
        this.animationDriver = animationDriver;
        this.registeredComponents = new Map();
    }
    DomRootRenderer.prototype.renderComponent = function (componentProto) {
        var renderer = this.registeredComponents.get(componentProto.id);
        if (isBlank$2(renderer)) {
            renderer = new DomRenderer(this, componentProto, this.animationDriver);
            this.registeredComponents.set(componentProto.id, renderer);
        }
        return renderer;
    };
    return DomRootRenderer;
}());
var DomRootRenderer_ = (function (_super) {
    __extends$29(DomRootRenderer_, _super);
    function DomRootRenderer_(_document, _eventManager, sharedStylesHost, animationDriver) {
        _super.call(this, _document, _eventManager, sharedStylesHost, animationDriver);
    }
    DomRootRenderer_.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DomRootRenderer_.ctorParameters = [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
        { type: EventManager, },
        { type: DomSharedStylesHost, },
        { type: AnimationDriver, },
    ];
    return DomRootRenderer_;
}(DomRootRenderer));
var DomRenderer = (function () {
    function DomRenderer(_rootRenderer, componentProto, _animationDriver) {
        this._rootRenderer = _rootRenderer;
        this.componentProto = componentProto;
        this._animationDriver = _animationDriver;
        this._styles = _flattenStyles(componentProto.id, componentProto.styles, []);
        if (componentProto.encapsulation !== ViewEncapsulation.Native) {
            this._rootRenderer.sharedStylesHost.addStyles(this._styles);
        }
        if (this.componentProto.encapsulation === ViewEncapsulation.Emulated) {
            this._contentAttr = _shimContentAttribute(componentProto.id);
            this._hostAttr = _shimHostAttribute(componentProto.id);
        }
        else {
            this._contentAttr = null;
            this._hostAttr = null;
        }
    }
    DomRenderer.prototype.selectRootElement = function (selectorOrNode, debugInfo) {
        var el;
        if (isString$2(selectorOrNode)) {
            el = getDOM().querySelector(this._rootRenderer.document, selectorOrNode);
            if (isBlank$2(el)) {
                throw new Error("The selector \"" + selectorOrNode + "\" did not match any elements");
            }
        }
        else {
            el = selectorOrNode;
        }
        getDOM().clearNodes(el);
        return el;
    };
    DomRenderer.prototype.createElement = function (parent, name, debugInfo) {
        var nsAndName = splitNamespace(name);
        var el = isPresent$2(nsAndName[0]) ?
            getDOM().createElementNS(NAMESPACE_URIS[nsAndName[0]], nsAndName[1]) :
            getDOM().createElement(nsAndName[1]);
        if (isPresent$2(this._contentAttr)) {
            getDOM().setAttribute(el, this._contentAttr, '');
        }
        if (isPresent$2(parent)) {
            getDOM().appendChild(parent, el);
        }
        return el;
    };
    DomRenderer.prototype.createViewRoot = function (hostElement) {
        var nodesParent;
        if (this.componentProto.encapsulation === ViewEncapsulation.Native) {
            nodesParent = getDOM().createShadowRoot(hostElement);
            this._rootRenderer.sharedStylesHost.addHost(nodesParent);
            for (var i = 0; i < this._styles.length; i++) {
                getDOM().appendChild(nodesParent, getDOM().createStyleElement(this._styles[i]));
            }
        }
        else {
            if (isPresent$2(this._hostAttr)) {
                getDOM().setAttribute(hostElement, this._hostAttr, '');
            }
            nodesParent = hostElement;
        }
        return nodesParent;
    };
    DomRenderer.prototype.createTemplateAnchor = function (parentElement, debugInfo) {
        var comment = getDOM().createComment(TEMPLATE_COMMENT_TEXT);
        if (isPresent$2(parentElement)) {
            getDOM().appendChild(parentElement, comment);
        }
        return comment;
    };
    DomRenderer.prototype.createText = function (parentElement, value, debugInfo) {
        var node = getDOM().createTextNode(value);
        if (isPresent$2(parentElement)) {
            getDOM().appendChild(parentElement, node);
        }
        return node;
    };
    DomRenderer.prototype.projectNodes = function (parentElement, nodes) {
        if (isBlank$2(parentElement))
            return;
        appendNodes(parentElement, nodes);
    };
    DomRenderer.prototype.attachViewAfter = function (node, viewRootNodes) { moveNodesAfterSibling(node, viewRootNodes); };
    DomRenderer.prototype.detachView = function (viewRootNodes) {
        for (var i = 0; i < viewRootNodes.length; i++) {
            getDOM().remove(viewRootNodes[i]);
        }
    };
    DomRenderer.prototype.destroyView = function (hostElement, viewAllNodes) {
        if (this.componentProto.encapsulation === ViewEncapsulation.Native && isPresent$2(hostElement)) {
            this._rootRenderer.sharedStylesHost.removeHost(getDOM().getShadowRoot(hostElement));
        }
    };
    DomRenderer.prototype.listen = function (renderElement, name, callback) {
        return this._rootRenderer.eventManager.addEventListener(renderElement, name, decoratePreventDefault(callback));
    };
    DomRenderer.prototype.listenGlobal = function (target, name, callback) {
        return this._rootRenderer.eventManager.addGlobalEventListener(target, name, decoratePreventDefault(callback));
    };
    DomRenderer.prototype.setElementProperty = function (renderElement, propertyName, propertyValue) {
        getDOM().setProperty(renderElement, propertyName, propertyValue);
    };
    DomRenderer.prototype.setElementAttribute = function (renderElement, attributeName, attributeValue) {
        var attrNs;
        var nsAndName = splitNamespace(attributeName);
        if (isPresent$2(nsAndName[0])) {
            attributeName = nsAndName[0] + ':' + nsAndName[1];
            attrNs = NAMESPACE_URIS[nsAndName[0]];
        }
        if (isPresent$2(attributeValue)) {
            if (isPresent$2(attrNs)) {
                getDOM().setAttributeNS(renderElement, attrNs, attributeName, attributeValue);
            }
            else {
                getDOM().setAttribute(renderElement, attributeName, attributeValue);
            }
        }
        else {
            if (isPresent$2(attrNs)) {
                getDOM().removeAttributeNS(renderElement, attrNs, nsAndName[1]);
            }
            else {
                getDOM().removeAttribute(renderElement, attributeName);
            }
        }
    };
    DomRenderer.prototype.setBindingDebugInfo = function (renderElement, propertyName, propertyValue) {
        var dashCasedPropertyName = camelCaseToDashCase(propertyName);
        if (getDOM().isCommentNode(renderElement)) {
            var existingBindings = StringWrapper$2.replaceAll(getDOM().getText(renderElement), /\n/g, '')
                .match(TEMPLATE_BINDINGS_EXP);
            var parsedBindings = Json$2.parse(existingBindings[1]);
            parsedBindings[dashCasedPropertyName] = propertyValue;
            getDOM().setText(renderElement, StringWrapper$2.replace(TEMPLATE_COMMENT_TEXT, '{}', Json$2.stringify(parsedBindings)));
        }
        else {
            this.setElementAttribute(renderElement, propertyName, propertyValue);
        }
    };
    DomRenderer.prototype.setElementClass = function (renderElement, className, isAdd) {
        if (isAdd) {
            getDOM().addClass(renderElement, className);
        }
        else {
            getDOM().removeClass(renderElement, className);
        }
    };
    DomRenderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) {
        if (isPresent$2(styleValue)) {
            getDOM().setStyle(renderElement, styleName, stringify$2(styleValue));
        }
        else {
            getDOM().removeStyle(renderElement, styleName);
        }
    };
    DomRenderer.prototype.invokeElementMethod = function (renderElement, methodName, args) {
        getDOM().invoke(renderElement, methodName, args);
    };
    DomRenderer.prototype.setText = function (renderNode, text) { getDOM().setText(renderNode, text); };
    DomRenderer.prototype.animate = function (element, startingStyles, keyframes$$1, duration, delay, easing) {
        return this._animationDriver.animate(element, startingStyles, keyframes$$1, duration, delay, easing);
    };
    return DomRenderer;
}());
function moveNodesAfterSibling(sibling /** TODO #9100 */, nodes /** TODO #9100 */) {
    var parent = getDOM().parentElement(sibling);
    if (nodes.length > 0 && isPresent$2(parent)) {
        var nextSibling = getDOM().nextSibling(sibling);
        if (isPresent$2(nextSibling)) {
            for (var i = 0; i < nodes.length; i++) {
                getDOM().insertBefore(nextSibling, nodes[i]);
            }
        }
        else {
            for (var i = 0; i < nodes.length; i++) {
                getDOM().appendChild(parent, nodes[i]);
            }
        }
    }
}
function appendNodes(parent /** TODO #9100 */, nodes /** TODO #9100 */) {
    for (var i = 0; i < nodes.length; i++) {
        getDOM().appendChild(parent, nodes[i]);
    }
}
function decoratePreventDefault(eventHandler) {
    return function (event /** TODO #9100 */) {
        var allowDefaultBehavior = eventHandler(event);
        if (allowDefaultBehavior === false) {
            // TODO(tbosch): move preventDefault into event plugins...
            getDOM().preventDefault(event);
        }
    };
}
var COMPONENT_REGEX = /%COMP%/g;
var COMPONENT_VARIABLE = '%COMP%';
var HOST_ATTR = "_nghost-" + COMPONENT_VARIABLE;
var CONTENT_ATTR = "_ngcontent-" + COMPONENT_VARIABLE;
function _shimContentAttribute(componentShortId) {
    return StringWrapper$2.replaceAll(CONTENT_ATTR, COMPONENT_REGEX, componentShortId);
}
function _shimHostAttribute(componentShortId) {
    return StringWrapper$2.replaceAll(HOST_ATTR, COMPONENT_REGEX, componentShortId);
}
function _flattenStyles(compId, styles, target) {
    for (var i = 0; i < styles.length; i++) {
        var style$$1 = styles[i];
        if (isArray$4(style$$1)) {
            _flattenStyles(compId, style$$1, target);
        }
        else {
            style$$1 = StringWrapper$2.replaceAll(style$$1, COMPONENT_REGEX, compId);
            target.push(style$$1);
        }
    }
    return target;
}
var NS_PREFIX_RE = /^:([^:]+):(.+)$/;
function splitNamespace(name) {
    if (name[0] != ':') {
        return [null, name];
    }
    var match = name.match(NS_PREFIX_RE);
    return [match[1], match[2]];
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var CORE_TOKENS = {
    'ApplicationRef': ApplicationRef,
    'NgZone': NgZone
};
var INSPECT_GLOBAL_NAME = 'ng.probe';
var CORE_TOKENS_GLOBAL_NAME = 'ng.coreTokens';
/**
 * Returns a {@link DebugElement} for the given native DOM element, or
 * null if the given native element does not have an Angular view associated
 * with it.
 */
function inspectNativeElement(element /** TODO #9100 */) {
    return getDebugNode(element);
}
/**
 * @experimental
 */
var NgProbeToken = (function () {
    function NgProbeToken(name, token) {
        this.name = name;
        this.token = token;
    }
    return NgProbeToken;
}());
function _createConditionalRootRenderer(rootRenderer /** TODO #9100 */, extraTokens) {
    if (isDevMode()) {
        return _createRootRenderer(rootRenderer, extraTokens);
    }
    return rootRenderer;
}
function _createRootRenderer(rootRenderer /** TODO #9100 */, extraTokens) {
    getDOM().setGlobalVar(INSPECT_GLOBAL_NAME, inspectNativeElement);
    getDOM().setGlobalVar(CORE_TOKENS_GLOBAL_NAME, StringMapWrapper$2.merge(CORE_TOKENS, _ngProbeTokensToMap(extraTokens || [])));
    return new DebugDomRootRenderer$1(rootRenderer);
}
function _ngProbeTokensToMap(tokens) {
    return tokens.reduce(function (prev, t) { return (prev[t.name] = t.token, prev); }, {});
}
/**
 * Providers which support debugging Angular applications (e.g. via `ng.probe`).
 */
var ELEMENT_PROBE_PROVIDERS = [{
        provide: RootRenderer,
        useFactory: _createConditionalRootRenderer,
        deps: [DomRootRenderer, [NgProbeToken, new Optional()]]
    }];
var ELEMENT_PROBE_PROVIDERS_PROD_MODE = [{
        provide: RootRenderer,
        useFactory: _createRootRenderer,
        deps: [DomRootRenderer, [NgProbeToken, new Optional()]]
    }];

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$31 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DomEventsPlugin = (function (_super) {
    __extends$31(DomEventsPlugin, _super);
    function DomEventsPlugin() {
        _super.apply(this, arguments);
    }
    // This plugin should come last in the list of plugins, because it accepts all
    // events.
    DomEventsPlugin.prototype.supports = function (eventName) { return true; };
    DomEventsPlugin.prototype.addEventListener = function (element, eventName, handler) {
        var zone = this.manager.getZone();
        var outsideHandler = function (event /** TODO #9100 */) { return zone.runGuarded(function () { return handler(event); }); };
        return this.manager.getZone().runOutsideAngular(function () { return getDOM().onAndCancel(element, eventName, outsideHandler); });
    };
    DomEventsPlugin.prototype.addGlobalEventListener = function (target, eventName, handler) {
        var element = getDOM().getGlobalEventTarget(target);
        var zone = this.manager.getZone();
        var outsideHandler = function (event /** TODO #9100 */) { return zone.runGuarded(function () { return handler(event); }); };
        return this.manager.getZone().runOutsideAngular(function () { return getDOM().onAndCancel(element, eventName, outsideHandler); });
    };
    DomEventsPlugin.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DomEventsPlugin.ctorParameters = [];
    return DomEventsPlugin;
}(EventManagerPlugin));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$33 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _eventNames = {
    // pan
    'pan': true,
    'panstart': true,
    'panmove': true,
    'panend': true,
    'pancancel': true,
    'panleft': true,
    'panright': true,
    'panup': true,
    'pandown': true,
    // pinch
    'pinch': true,
    'pinchstart': true,
    'pinchmove': true,
    'pinchend': true,
    'pinchcancel': true,
    'pinchin': true,
    'pinchout': true,
    // press
    'press': true,
    'pressup': true,
    // rotate
    'rotate': true,
    'rotatestart': true,
    'rotatemove': true,
    'rotateend': true,
    'rotatecancel': true,
    // swipe
    'swipe': true,
    'swipeleft': true,
    'swiperight': true,
    'swipeup': true,
    'swipedown': true,
    // tap
    'tap': true,
};
var HammerGesturesPluginCommon = (function (_super) {
    __extends$33(HammerGesturesPluginCommon, _super);
    function HammerGesturesPluginCommon() {
        _super.call(this);
    }
    HammerGesturesPluginCommon.prototype.supports = function (eventName) {
        eventName = eventName.toLowerCase();
        return StringMapWrapper$2.contains(_eventNames, eventName);
    };
    return HammerGesturesPluginCommon;
}(EventManagerPlugin));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$32 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * A DI token that you can use to provide{@link HammerGestureConfig} to Angular. Use it to configure
 * Hammer gestures.
 *
 * @experimental
 */
var HAMMER_GESTURE_CONFIG = new OpaqueToken('HammerGestureConfig');
/**
 * @experimental
 */
var HammerGestureConfig = (function () {
    function HammerGestureConfig() {
        this.events = [];
        this.overrides = {};
    }
    HammerGestureConfig.prototype.buildHammer = function (element) {
        var mc = new Hammer(element);
        mc.get('pinch').set({ enable: true });
        mc.get('rotate').set({ enable: true });
        for (var eventName in this.overrides) {
            mc.get(eventName).set(this.overrides[eventName]);
        }
        return mc;
    };
    HammerGestureConfig.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    HammerGestureConfig.ctorParameters = [];
    return HammerGestureConfig;
}());
var HammerGesturesPlugin = (function (_super) {
    __extends$32(HammerGesturesPlugin, _super);
    function HammerGesturesPlugin(_config) {
        _super.call(this);
        this._config = _config;
    }
    HammerGesturesPlugin.prototype.supports = function (eventName) {
        if (!_super.prototype.supports.call(this, eventName) && !this.isCustomEvent(eventName))
            return false;
        if (!isPresent$2(window['Hammer'])) {
            throw new Error("Hammer.js is not loaded, can not bind " + eventName + " event");
        }
        return true;
    };
    HammerGesturesPlugin.prototype.addEventListener = function (element, eventName, handler) {
        var _this = this;
        var zone = this.manager.getZone();
        eventName = eventName.toLowerCase();
        return zone.runOutsideAngular(function () {
            // Creating the manager bind events, must be done outside of angular
            var mc = _this._config.buildHammer(element);
            var callback = function (eventObj /** TODO #???? */) {
                zone.runGuarded(function () { handler(eventObj); });
            };
            mc.on(eventName, callback);
            return function () { mc.off(eventName, callback); };
        });
    };
    HammerGesturesPlugin.prototype.isCustomEvent = function (eventName) { return this._config.events.indexOf(eventName) > -1; };
    HammerGesturesPlugin.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    HammerGesturesPlugin.ctorParameters = [
        { type: HammerGestureConfig, decorators: [{ type: Inject, args: [HAMMER_GESTURE_CONFIG,] },] },
    ];
    return HammerGesturesPlugin;
}(HammerGesturesPluginCommon));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$34 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var modifierKeys = ['alt', 'control', 'meta', 'shift'];
var modifierKeyGetters = {
    'alt': function (event) { return event.altKey; },
    'control': function (event) { return event.ctrlKey; },
    'meta': function (event) { return event.metaKey; },
    'shift': function (event) { return event.shiftKey; }
};
/**
 * @experimental
 */
var KeyEventsPlugin = (function (_super) {
    __extends$34(KeyEventsPlugin, _super);
    function KeyEventsPlugin() {
        _super.call(this);
    }
    KeyEventsPlugin.prototype.supports = function (eventName) {
        return isPresent$2(KeyEventsPlugin.parseEventName(eventName));
    };
    KeyEventsPlugin.prototype.addEventListener = function (element, eventName, handler) {
        var parsedEvent = KeyEventsPlugin.parseEventName(eventName);
        var outsideHandler = KeyEventsPlugin.eventCallback(element, StringMapWrapper$2.get(parsedEvent, 'fullKey'), handler, this.manager.getZone());
        return this.manager.getZone().runOutsideAngular(function () {
            return getDOM().onAndCancel(element, StringMapWrapper$2.get(parsedEvent, 'domEventName'), outsideHandler);
        });
    };
    KeyEventsPlugin.parseEventName = function (eventName) {
        var parts = eventName.toLowerCase().split('.');
        var domEventName = parts.shift();
        if ((parts.length === 0) ||
            !(StringWrapper$2.equals(domEventName, 'keydown') ||
                StringWrapper$2.equals(domEventName, 'keyup'))) {
            return null;
        }
        var key = KeyEventsPlugin._normalizeKey(parts.pop());
        var fullKey = '';
        modifierKeys.forEach(function (modifierName) {
            if (ListWrapper$2.contains(parts, modifierName)) {
                ListWrapper$2.remove(parts, modifierName);
                fullKey += modifierName + '.';
            }
        });
        fullKey += key;
        if (parts.length != 0 || key.length === 0) {
            // returning null instead of throwing to let another plugin process the event
            return null;
        }
        var result = StringMapWrapper$2.create();
        StringMapWrapper$2.set(result, 'domEventName', domEventName);
        StringMapWrapper$2.set(result, 'fullKey', fullKey);
        return result;
    };
    KeyEventsPlugin.getEventFullKey = function (event) {
        var fullKey = '';
        var key = getDOM().getEventKey(event);
        key = key.toLowerCase();
        if (StringWrapper$2.equals(key, ' ')) {
            key = 'space'; // for readability
        }
        else if (StringWrapper$2.equals(key, '.')) {
            key = 'dot'; // because '.' is used as a separator in event names
        }
        modifierKeys.forEach(function (modifierName) {
            if (modifierName != key) {
                var modifierGetter = StringMapWrapper$2.get(modifierKeyGetters, modifierName);
                if (modifierGetter(event)) {
                    fullKey += modifierName + '.';
                }
            }
        });
        fullKey += key;
        return fullKey;
    };
    KeyEventsPlugin.eventCallback = function (element, fullKey, handler, zone) {
        return function (event /** TODO #9100 */) {
            if (StringWrapper$2.equals(KeyEventsPlugin.getEventFullKey(event), fullKey)) {
                zone.runGuarded(function () { return handler(event); });
            }
        };
    };
    /** @internal */
    KeyEventsPlugin._normalizeKey = function (keyName) {
        // TODO: switch to a StringMap if the mapping grows too much
        switch (keyName) {
            case 'esc':
                return 'escape';
            default:
                return keyName;
        }
    };
    KeyEventsPlugin.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    KeyEventsPlugin.ctorParameters = [];
    return KeyEventsPlugin;
}(EventManagerPlugin));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A pattern that recognizes a commonly useful subset of URLs that are safe.
 *
 * This regular expression matches a subset of URLs that will not cause script
 * execution if used in URL context within a HTML document. Specifically, this
 * regular expression matches if (comment from here on and regex copied from
 * Soy's EscapingConventions):
 * (1) Either a protocol in a whitelist (http, https, mailto or ftp).
 * (2) or no protocol.  A protocol must be followed by a colon. The below
 *     allows that by allowing colons only after one of the characters [/?#].
 *     A colon after a hash (#) must be in the fragment.
 *     Otherwise, a colon after a (?) must be in a query.
 *     Otherwise, a colon after a single solidus (/) must be in a path.
 *     Otherwise, a colon after a double solidus (//) must be in the authority
 *     (before port).
 *
 * The pattern disallows &, used in HTML entity declarations before
 * one of the characters in [/?#]. This disallows HTML entities used in the
 * protocol name, which should never happen, e.g. "h&#116;tp" for "http".
 * It also disallows HTML entities in the first path part of a relative path,
 * e.g. "foo&lt;bar/baz".  Our existing escaping functions should not produce
 * that. More importantly, it disallows masking of a colon,
 * e.g. "javascript&#58;...".
 *
 * This regular expression was taken from the Closure sanitization library.
 */
var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
/** A pattern that matches safe data URLs. Only matches image, video and audio types. */
var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
function sanitizeUrl(url) {
    url = String(url);
    if (url.match(SAFE_URL_PATTERN) || url.match(DATA_URL_PATTERN))
        return url;
    if (isDevMode()) {
        getDOM().log("WARNING: sanitizing unsafe URL value " + url + " (see http://g.co/ng/security#xss)");
    }
    return 'unsafe:' + url;
}
function sanitizeSrcset(srcset) {
    srcset = String(srcset);
    return srcset.split(',').map(function (srcset) { return sanitizeUrl(srcset.trim()); }).join(', ');
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** A <body> element that can be safely used to parse untrusted HTML. Lazily initialized below. */
var inertElement = null;
/** Lazily initialized to make sure the DOM adapter gets set before use. */
var DOM = null;
/** Returns an HTML element that is guaranteed to not execute code when creating elements in it. */
function getInertElement() {
    if (inertElement)
        return inertElement;
    DOM = getDOM();
    // Prefer using <template> element if supported.
    var templateEl = DOM.createElement('template');
    if ('content' in templateEl)
        return templateEl;
    var doc = DOM.createHtmlDocument();
    inertElement = DOM.querySelector(doc, 'body');
    if (inertElement == null) {
        // usually there should be only one body element in the document, but IE doesn't have any, so we
        // need to create one.
        var html = DOM.createElement('html', doc);
        inertElement = DOM.createElement('body', doc);
        DOM.appendChild(html, inertElement);
        DOM.appendChild(doc, html);
    }
    return inertElement;
}
function tagSet(tags) {
    var res = {};
    for (var _i = 0, _a = tags.split(','); _i < _a.length; _i++) {
        var t = _a[_i];
        res[t] = true;
    }
    return res;
}
function merge() {
    var sets = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sets[_i - 0] = arguments[_i];
    }
    var res = {};
    for (var _a = 0, sets_1 = sets; _a < sets_1.length; _a++) {
        var s = sets_1[_a];
        for (var v in s) {
            if (s.hasOwnProperty(v))
                res[v] = true;
        }
    }
    return res;
}
// Good source of info about elements and attributes
// http://dev.w3.org/html5/spec/Overview.html#semantics
// http://simon.html5.org/html-elements
// Safe Void Elements - HTML5
// http://dev.w3.org/html5/spec/Overview.html#void-elements
var VOID_ELEMENTS = tagSet('area,br,col,hr,img,wbr');
// Elements that you can, intentionally, leave open (and which close themselves)
// http://dev.w3.org/html5/spec/Overview.html#optional-tags
var OPTIONAL_END_TAG_BLOCK_ELEMENTS = tagSet('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr');
var OPTIONAL_END_TAG_INLINE_ELEMENTS = tagSet('rp,rt');
var OPTIONAL_END_TAG_ELEMENTS = merge(OPTIONAL_END_TAG_INLINE_ELEMENTS, OPTIONAL_END_TAG_BLOCK_ELEMENTS);
// Safe Block Elements - HTML5
var BLOCK_ELEMENTS = merge(OPTIONAL_END_TAG_BLOCK_ELEMENTS, tagSet('address,article,' +
    'aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,' +
    'h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'));
// Inline Elements - HTML5
var INLINE_ELEMENTS = merge(OPTIONAL_END_TAG_INLINE_ELEMENTS, tagSet('a,abbr,acronym,audio,b,' +
    'bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,' +
    'samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'));
var VALID_ELEMENTS = merge(VOID_ELEMENTS, BLOCK_ELEMENTS, INLINE_ELEMENTS, OPTIONAL_END_TAG_ELEMENTS);
// Attributes that have href and hence need to be sanitized
var URI_ATTRS = tagSet('background,cite,href,itemtype,longdesc,poster,src,xlink:href');
// Attributes that have special href set hence need to be sanitized
var SRCSET_ATTRS = tagSet('srcset');
var HTML_ATTRS = tagSet('abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,' +
    'compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,' +
    'ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,' +
    'scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,' +
    'valign,value,vspace,width');
// NB: This currently conciously doesn't support SVG. SVG sanitization has had several security
// issues in the past, so it seems safer to leave it out if possible. If support for binding SVG via
// innerHTML is required, SVG attributes should be added here.
// NB: Sanitization does not allow <form> elements or other active elements (<button> etc). Those
// can be sanitized, but they increase security surface area without a legitimate use case, so they
// are left out here.
var VALID_ATTRS = merge(URI_ATTRS, SRCSET_ATTRS, HTML_ATTRS);
/**
 * SanitizingHtmlSerializer serializes a DOM fragment, stripping out any unsafe elements and unsafe
 * attributes.
 */
var SanitizingHtmlSerializer = (function () {
    function SanitizingHtmlSerializer() {
        // Explicitly track if something was stripped, to avoid accidentally warning of sanitization just
        // because characters were re-encoded.
        this.sanitizedSomething = false;
        this.buf = [];
    }
    SanitizingHtmlSerializer.prototype.sanitizeChildren = function (el) {
        // This cannot use a TreeWalker, as it has to run on Angular's various DOM adapters.
        // However this code never accesses properties off of `document` before deleting its contents
        // again, so it shouldn't be vulnerable to DOM clobbering.
        var current = el.firstChild;
        while (current) {
            if (DOM.isElementNode(current)) {
                this.startElement(current);
            }
            else if (DOM.isTextNode(current)) {
                this.chars(DOM.nodeValue(current));
            }
            else {
                // Strip non-element, non-text nodes.
                this.sanitizedSomething = true;
            }
            if (DOM.firstChild(current)) {
                current = DOM.firstChild(current);
                continue;
            }
            while (current) {
                // Leaving the element. Walk up and to the right, closing tags as we go.
                if (DOM.isElementNode(current)) {
                    this.endElement(current);
                }
                if (DOM.nextSibling(current)) {
                    current = DOM.nextSibling(current);
                    break;
                }
                current = DOM.parentElement(current);
            }
        }
        return this.buf.join('');
    };
    SanitizingHtmlSerializer.prototype.startElement = function (element) {
        var _this = this;
        var tagName = DOM.nodeName(element).toLowerCase();
        if (!VALID_ELEMENTS.hasOwnProperty(tagName)) {
            this.sanitizedSomething = true;
            return;
        }
        this.buf.push('<');
        this.buf.push(tagName);
        DOM.attributeMap(element).forEach(function (value, attrName) {
            var lower = attrName.toLowerCase();
            if (!VALID_ATTRS.hasOwnProperty(lower)) {
                _this.sanitizedSomething = true;
                return;
            }
            // TODO(martinprobst): Special case image URIs for data:image/...
            if (URI_ATTRS[lower])
                value = sanitizeUrl(value);
            if (SRCSET_ATTRS[lower])
                value = sanitizeSrcset(value);
            _this.buf.push(' ');
            _this.buf.push(attrName);
            _this.buf.push('="');
            _this.buf.push(encodeEntities(value));
            _this.buf.push('"');
        });
        this.buf.push('>');
    };
    SanitizingHtmlSerializer.prototype.endElement = function (current) {
        var tagName = DOM.nodeName(current).toLowerCase();
        if (VALID_ELEMENTS.hasOwnProperty(tagName) && !VOID_ELEMENTS.hasOwnProperty(tagName)) {
            this.buf.push('</');
            this.buf.push(tagName);
            this.buf.push('>');
        }
    };
    SanitizingHtmlSerializer.prototype.chars = function (chars /** TODO #9100 */) { this.buf.push(encodeEntities(chars)); };
    return SanitizingHtmlSerializer;
}());
// Regular Expressions for parsing tags and attributes
var SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
// ! to ~ is the ASCII range.
var NON_ALPHANUMERIC_REGEXP = /([^\#-~ |!])/g;
/**
 * Escapes all potentially dangerous characters, so that the
 * resulting string can be safely inserted into attribute or
 * element text.
 * @param value
 * @returns {string} escaped text
 */
function encodeEntities(value) {
    return value.replace(/&/g, '&amp;')
        .replace(SURROGATE_PAIR_REGEXP, function (match) {
        var hi = match.charCodeAt(0);
        var low = match.charCodeAt(1);
        return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';
    })
        .replace(NON_ALPHANUMERIC_REGEXP, function (match) { return '&#' + match.charCodeAt(0) + ';'; })
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
/**
 * When IE9-11 comes across an unknown namespaced attribute e.g. 'xlink:foo' it adds 'xmlns:ns1'
 * attribute to declare ns1 namespace and prefixes the attribute with 'ns1' (e.g. 'ns1:xlink:foo').
 *
 * This is undesirable since we don't want to allow any of these custom attributes. This method
 * strips them all.
 */
function stripCustomNsAttrs(el) {
    DOM.attributeMap(el).forEach(function (_, attrName) {
        if (attrName === 'xmlns:ns1' || attrName.indexOf('ns1:') === 0) {
            DOM.removeAttribute(el, attrName);
        }
    });
    for (var _i = 0, _a = DOM.childNodesAsList(el); _i < _a.length; _i++) {
        var n = _a[_i];
        if (DOM.isElementNode(n))
            stripCustomNsAttrs(n);
    }
}
/**
 * Sanitizes the given unsafe, untrusted HTML fragment, and returns HTML text that is safe to add to
 * the DOM in a browser environment.
 */
function sanitizeHtml(unsafeHtmlInput) {
    try {
        var containerEl = getInertElement();
        // Make sure unsafeHtml is actually a string (TypeScript types are not enforced at runtime).
        var unsafeHtml = unsafeHtmlInput ? String(unsafeHtmlInput) : '';
        // mXSS protection. Repeatedly parse the document to make sure it stabilizes, so that a browser
        // trying to auto-correct incorrect HTML cannot cause formerly inert HTML to become dangerous.
        var mXSSAttempts = 5;
        var parsedHtml = unsafeHtml;
        do {
            if (mXSSAttempts === 0) {
                throw new Error('Failed to sanitize html because the input is unstable');
            }
            mXSSAttempts--;
            unsafeHtml = parsedHtml;
            DOM.setInnerHTML(containerEl, unsafeHtml);
            if (DOM.defaultDoc().documentMode) {
                // strip custom-namespaced attributes on IE<=11
                stripCustomNsAttrs(containerEl);
            }
            parsedHtml = DOM.getInnerHTML(containerEl);
        } while (unsafeHtml !== parsedHtml);
        var sanitizer = new SanitizingHtmlSerializer();
        var safeHtml = sanitizer.sanitizeChildren(DOM.getTemplateContent(containerEl) || containerEl);
        // Clear out the body element.
        var parent_1 = DOM.getTemplateContent(containerEl) || containerEl;
        for (var _i = 0, _a = DOM.childNodesAsList(parent_1); _i < _a.length; _i++) {
            var child = _a[_i];
            DOM.removeChild(parent_1, child);
        }
        if (isDevMode() && sanitizer.sanitizedSomething) {
            DOM.log('WARNING: sanitizing HTML stripped some content (see http://g.co/ng/security#xss).');
        }
        return safeHtml;
    }
    catch (e) {
        // In case anything goes wrong, clear out inertElement to reset the entire DOM structure.
        inertElement = null;
        throw e;
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Regular expression for safe style values.
 *
 * Quotes (" and ') are allowed, but a check must be done elsewhere to ensure they're balanced.
 *
 * ',' allows multiple values to be assigned to the same property (e.g. background-attachment or
 * font-family) and hence could allow multiple values to get injected, but that should pose no risk
 * of XSS.
 *
 * The function expression checks only for XSS safety, not for CSS validity.
 *
 * This regular expression was taken from the Closure sanitization library, and augmented for
 * transformation values.
 */
var VALUES = '[-,."\'%_!# a-zA-Z0-9]+';
var TRANSFORMATION_FNS = '(?:matrix|translate|scale|rotate|skew|perspective)(?:X|Y|3d)?';
var COLOR_FNS = '(?:rgb|hsl)a?';
var FN_ARGS = '\\([-0-9.%, a-zA-Z]+\\)';
var SAFE_STYLE_VALUE = new RegExp("^(" + VALUES + "|(?:" + TRANSFORMATION_FNS + "|" + COLOR_FNS + ")" + FN_ARGS + ")$", 'g');
/**
 * Matches a `url(...)` value with an arbitrary argument as long as it does
 * not contain parentheses.
 *
 * The URL value still needs to be sanitized separately.
 *
 * `url(...)` values are a very common use case, e.g. for `background-image`. With carefully crafted
 * CSS style rules, it is possible to construct an information leak with `url` values in CSS, e.g.
 * by observing whether scroll bars are displayed, or character ranges used by a font face
 * definition.
 *
 * Angular only allows binding CSS values (as opposed to entire CSS rules), so it is unlikely that
 * binding a URL value without further cooperation from the page will cause an information leak, and
 * if so, it is just a leak, not a full blown XSS vulnerability.
 *
 * Given the common use case, low likelihood of attack vector, and low impact of an attack, this
 * code is permissive and allows URLs that sanitize otherwise.
 */
var URL_RE = /^url\(([^)]+)\)$/;
/**
 * Checks that quotes (" and ') are properly balanced inside a string. Assumes
 * that neither escape (\) nor any other character that could result in
 * breaking out of a string parsing context are allowed;
 * see http://www.w3.org/TR/css3-syntax/#string-token-diagram.
 *
 * This code was taken from the Closure sanitization library.
 */
function hasBalancedQuotes(value) {
    var outsideSingle = true;
    var outsideDouble = true;
    for (var i = 0; i < value.length; i++) {
        var c = value.charAt(i);
        if (c === '\'' && outsideDouble) {
            outsideSingle = !outsideSingle;
        }
        else if (c === '"' && outsideSingle) {
            outsideDouble = !outsideDouble;
        }
    }
    return outsideSingle && outsideDouble;
}
/**
 * Sanitizes the given untrusted CSS style property value (i.e. not an entire object, just a single
 * value) and returns a value that is safe to use in a browser environment.
 */
function sanitizeStyle(value) {
    value = String(value).trim(); // Make sure it's actually a string.
    if (!value)
        return '';
    // Single url(...) values are supported, but only for URLs that sanitize cleanly. See above for
    // reasoning behind this.
    var urlMatch = value.match(URL_RE);
    if ((urlMatch && sanitizeUrl(urlMatch[1]) === urlMatch[1]) ||
        value.match(SAFE_STYLE_VALUE) && hasBalancedQuotes(value)) {
        return value; // Safe style values.
    }
    if (isDevMode()) {
        getDOM().log("WARNING: sanitizing unsafe style value " + value + " (see http://g.co/ng/security#xss).");
    }
    return 'unsafe';
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$35 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * DomSanitizer helps preventing Cross Site Scripting Security bugs (XSS) by sanitizing
 * values to be safe to use in the different DOM contexts.
 *
 * For example, when binding a URL in an `<a [href]="someValue">` hyperlink, `someValue` will be
 * sanitized so that an attacker cannot inject e.g. a `javascript:` URL that would execute code on
 * the website.
 *
 * In specific situations, it might be necessary to disable sanitization, for example if the
 * application genuinely needs to produce a `javascript:` style link with a dynamic value in it.
 * Users can bypass security by constructing a value with one of the `bypassSecurityTrust...`
 * methods, and then binding to that value from the template.
 *
 * These situations should be very rare, and extraordinary care must be taken to avoid creating a
 * Cross Site Scripting (XSS) security bug!
 *
 * When using `bypassSecurityTrust...`, make sure to call the method as early as possible and as
 * close as possible to the source of the value, to make it easy to verify no security bug is
 * created by its use.
 *
 * It is not required (and not recommended) to bypass security if the value is safe, e.g. a URL that
 * does not start with a suspicious protocol, or an HTML snippet that does not contain dangerous
 * code. The sanitizer leaves safe values intact.
 *
 * @security Calling any of the `bypassSecurityTrust...` APIs disables Angular's built-in
 * sanitization for the value passed in. Carefully check and audit all values and code paths going
 * into this call. Make sure any user data is appropriately escaped for this security context.
 * For more detail, see the [Security Guide](http://g.co/ng/security).
 *
 * @stable
 */
var DomSanitizer = (function () {
    function DomSanitizer() {
    }
    return DomSanitizer;
}());
var DomSanitizerImpl = (function (_super) {
    __extends$35(DomSanitizerImpl, _super);
    function DomSanitizerImpl() {
        _super.apply(this, arguments);
    }
    DomSanitizerImpl.prototype.sanitize = function (ctx, value) {
        if (value == null)
            return null;
        switch (ctx) {
            case SecurityContext.NONE:
                return value;
            case SecurityContext.HTML:
                if (value instanceof SafeHtmlImpl)
                    return value.changingThisBreaksApplicationSecurity;
                this.checkNotSafeValue(value, 'HTML');
                return sanitizeHtml(String(value));
            case SecurityContext.STYLE:
                if (value instanceof SafeStyleImpl)
                    return value.changingThisBreaksApplicationSecurity;
                this.checkNotSafeValue(value, 'Style');
                return sanitizeStyle(value);
            case SecurityContext.SCRIPT:
                if (value instanceof SafeScriptImpl)
                    return value.changingThisBreaksApplicationSecurity;
                this.checkNotSafeValue(value, 'Script');
                throw new Error('unsafe value used in a script context');
            case SecurityContext.URL:
                if (value instanceof SafeResourceUrlImpl || value instanceof SafeUrlImpl) {
                    // Allow resource URLs in URL contexts, they are strictly more trusted.
                    return value.changingThisBreaksApplicationSecurity;
                }
                this.checkNotSafeValue(value, 'URL');
                return sanitizeUrl(String(value));
            case SecurityContext.RESOURCE_URL:
                if (value instanceof SafeResourceUrlImpl) {
                    return value.changingThisBreaksApplicationSecurity;
                }
                this.checkNotSafeValue(value, 'ResourceURL');
                throw new Error('unsafe value used in a resource URL context (see http://g.co/ng/security#xss)');
            default:
                throw new Error("Unexpected SecurityContext " + ctx + " (see http://g.co/ng/security#xss)");
        }
    };
    DomSanitizerImpl.prototype.checkNotSafeValue = function (value, expectedType) {
        if (value instanceof SafeValueImpl) {
            throw new Error(("Required a safe " + expectedType + ", got a " + value.getTypeName() + " ") +
                "(see http://g.co/ng/security#xss)");
        }
    };
    DomSanitizerImpl.prototype.bypassSecurityTrustHtml = function (value) { return new SafeHtmlImpl(value); };
    DomSanitizerImpl.prototype.bypassSecurityTrustStyle = function (value) { return new SafeStyleImpl(value); };
    DomSanitizerImpl.prototype.bypassSecurityTrustScript = function (value) { return new SafeScriptImpl(value); };
    DomSanitizerImpl.prototype.bypassSecurityTrustUrl = function (value) { return new SafeUrlImpl(value); };
    DomSanitizerImpl.prototype.bypassSecurityTrustResourceUrl = function (value) {
        return new SafeResourceUrlImpl(value);
    };
    DomSanitizerImpl.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DomSanitizerImpl.ctorParameters = [];
    return DomSanitizerImpl;
}(DomSanitizer));
var SafeValueImpl = (function () {
    function SafeValueImpl(changingThisBreaksApplicationSecurity) {
        this.changingThisBreaksApplicationSecurity = changingThisBreaksApplicationSecurity;
        // empty
    }
    SafeValueImpl.prototype.toString = function () {
        return ("SafeValue must use [property]=binding: " + this.changingThisBreaksApplicationSecurity) +
            " (see http://g.co/ng/security#xss)";
    };
    return SafeValueImpl;
}());
var SafeHtmlImpl = (function (_super) {
    __extends$35(SafeHtmlImpl, _super);
    function SafeHtmlImpl() {
        _super.apply(this, arguments);
    }
    SafeHtmlImpl.prototype.getTypeName = function () { return 'HTML'; };
    return SafeHtmlImpl;
}(SafeValueImpl));
var SafeStyleImpl = (function (_super) {
    __extends$35(SafeStyleImpl, _super);
    function SafeStyleImpl() {
        _super.apply(this, arguments);
    }
    SafeStyleImpl.prototype.getTypeName = function () { return 'Style'; };
    return SafeStyleImpl;
}(SafeValueImpl));
var SafeScriptImpl = (function (_super) {
    __extends$35(SafeScriptImpl, _super);
    function SafeScriptImpl() {
        _super.apply(this, arguments);
    }
    SafeScriptImpl.prototype.getTypeName = function () { return 'Script'; };
    return SafeScriptImpl;
}(SafeValueImpl));
var SafeUrlImpl = (function (_super) {
    __extends$35(SafeUrlImpl, _super);
    function SafeUrlImpl() {
        _super.apply(this, arguments);
    }
    SafeUrlImpl.prototype.getTypeName = function () { return 'URL'; };
    return SafeUrlImpl;
}(SafeValueImpl));
var SafeResourceUrlImpl = (function (_super) {
    __extends$35(SafeResourceUrlImpl, _super);
    function SafeResourceUrlImpl() {
        _super.apply(this, arguments);
    }
    SafeResourceUrlImpl.prototype.getTypeName = function () { return 'ResourceURL'; };
    return SafeResourceUrlImpl;
}(SafeValueImpl));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var INTERNAL_BROWSER_PLATFORM_PROVIDERS = [
    { provide: PLATFORM_INITIALIZER, useValue: initDomAdapter, multi: true },
    { provide: PlatformLocation, useClass: BrowserPlatformLocation }
];
/**
 * @security Replacing built-in sanitization providers exposes the application to XSS risks.
 * Attacker-controlled data introduced by an unsanitized provider could expose your
 * application to XSS risks. For more detail, see the [Security Guide](http://g.co/ng/security).
 * @experimental
 */
var BROWSER_SANITIZATION_PROVIDERS = [
    { provide: Sanitizer, useExisting: DomSanitizer },
    { provide: DomSanitizer, useClass: DomSanitizerImpl },
];
/**
 * @stable
 */
var platformBrowser = createPlatformFactory(platformCore, 'browser', INTERNAL_BROWSER_PLATFORM_PROVIDERS);
function initDomAdapter() {
    BrowserDomAdapter.makeCurrent();
    BrowserGetTestability.init();
}
function errorHandler() {
    return new ErrorHandler();
}
function _document() {
    return getDOM().defaultDoc();
}
function _resolveDefaultAnimationDriver() {
    if (getDOM().supportsWebAnimation()) {
        return new WebAnimationsDriver();
    }
    return AnimationDriver.NOOP;
}
/**
 * The ng module for the browser.
 *
 * @stable
 */
var BrowserModule = (function () {
    function BrowserModule(parentModule) {
        if (parentModule) {
            throw new Error("BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.");
        }
    }
    BrowserModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        BROWSER_SANITIZATION_PROVIDERS, { provide: ErrorHandler, useFactory: errorHandler, deps: [] },
                        { provide: DOCUMENT, useFactory: _document, deps: [] },
                        { provide: EVENT_MANAGER_PLUGINS, useClass: DomEventsPlugin, multi: true },
                        { provide: EVENT_MANAGER_PLUGINS, useClass: KeyEventsPlugin, multi: true },
                        { provide: EVENT_MANAGER_PLUGINS, useClass: HammerGesturesPlugin, multi: true },
                        { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig },
                        { provide: DomRootRenderer, useClass: DomRootRenderer_ },
                        { provide: RootRenderer, useExisting: DomRootRenderer },
                        { provide: SharedStylesHost, useExisting: DomSharedStylesHost },
                        { provide: AnimationDriver, useFactory: _resolveDefaultAnimationDriver }, DomSharedStylesHost,
                        Testability, EventManager, ELEMENT_PROBE_PROVIDERS, Title
                    ],
                    exports: [CommonModule, ApplicationModule]
                },] },
    ];
    /** @nocollapse */
    BrowserModule.ctorParameters = [
        { type: BrowserModule, decorators: [{ type: Optional }, { type: SkipSelf },] },
    ];
    return BrowserModule;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * JS version of browser APIs. This library can only run in the browser.
 */
var win = typeof window !== 'undefined' && window || {};

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var ChangeDetectionPerfRecord = (function () {
    function ChangeDetectionPerfRecord(msPerTick, numTicks) {
        this.msPerTick = msPerTick;
        this.numTicks = numTicks;
    }
    return ChangeDetectionPerfRecord;
}());
/**
 * Entry point for all Angular debug tools. This object corresponds to the `ng`
 * global variable accessible in the dev console.
 */
var AngularTools = (function () {
    function AngularTools(ref) {
        this.profiler = new AngularProfiler(ref);
    }
    return AngularTools;
}());
/**
 * Entry point for all Angular profiling-related debug tools. This object
 * corresponds to the `ng.profiler` in the dev console.
 */
var AngularProfiler = (function () {
    function AngularProfiler(ref) {
        this.appRef = ref.injector.get(ApplicationRef);
    }
    /**
     * Exercises change detection in a loop and then prints the average amount of
     * time in milliseconds how long a single round of change detection takes for
     * the current state of the UI. It runs a minimum of 5 rounds for a minimum
     * of 500 milliseconds.
     *
     * Optionally, a user may pass a `config` parameter containing a map of
     * options. Supported options are:
     *
     * `record` (boolean) - causes the profiler to record a CPU profile while
     * it exercises the change detector. Example:
     *
     * ```
     * ng.profiler.timeChangeDetection({record: true})
     * ```
     */
    AngularProfiler.prototype.timeChangeDetection = function (config) {
        var record = isPresent$2(config) && config['record'];
        var profileName = 'Change Detection';
        // Profiler is not available in Android browsers, nor in IE 9 without dev tools opened
        var isProfilerAvailable = isPresent$2(win.console.profile);
        if (record && isProfilerAvailable) {
            win.console.profile(profileName);
        }
        var start = getDOM().performanceNow();
        var numTicks = 0;
        while (numTicks < 5 || (getDOM().performanceNow() - start) < 500) {
            this.appRef.tick();
            numTicks++;
        }
        var end = getDOM().performanceNow();
        if (record && isProfilerAvailable) {
            // need to cast to <any> because type checker thinks there's no argument
            // while in fact there is:
            //
            // https://developer.mozilla.org/en-US/docs/Web/API/Console/profileEnd
            win.console.profileEnd(profileName);
        }
        var msPerTick = (end - start) / numTicks;
        win.console.log("ran " + numTicks + " change detection cycles");
        win.console.log(NumberWrapper$2.toFixed(msPerTick, 2) + " ms per check");
        return new ChangeDetectionPerfRecord(msPerTick, numTicks);
    };
    return AngularProfiler;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var context = _global$2;
/**
 * Enabled Angular 2 debug tools that are accessible via your browser's
 * developer console.
 *
 * Usage:
 *
 * 1. Open developer console (e.g. in Chrome Ctrl + Shift + j)
 * 1. Type `ng.` (usually the console will show auto-complete suggestion)
 * 1. Try the change detection profiler `ng.profiler.timeChangeDetection()`
 *    then hit Enter.
 *
 * @experimental All debugging apis are currently experimental.
 */

/**
 * Disables Angular 2 tools.
 *
 * @experimental All debugging apis are currently experimental.
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Predicates for use with {@link DebugElement}'s query functions.
 *
 * @experimental All debugging apis are currently experimental.
 */

var __platform_browser_private__ = {
    BrowserPlatformLocation: BrowserPlatformLocation,
    DomAdapter: DomAdapter,
    BrowserDomAdapter: BrowserDomAdapter,
    BrowserGetTestability: BrowserGetTestability,
    getDOM: getDOM,
    setRootDomAdapter: setRootDomAdapter,
    DomRootRenderer_: DomRootRenderer_,
    DomRootRenderer: DomRootRenderer,
    DomSharedStylesHost: DomSharedStylesHost,
    SharedStylesHost: SharedStylesHost,
    ELEMENT_PROBE_PROVIDERS: ELEMENT_PROBE_PROVIDERS,
    DomEventsPlugin: DomEventsPlugin,
    KeyEventsPlugin: KeyEventsPlugin,
    HammerGesturesPlugin: HammerGesturesPlugin,
    initDomAdapter: initDomAdapter,
    INTERNAL_BROWSER_PLATFORM_PROVIDERS: INTERNAL_BROWSER_PLATFORM_PROVIDERS,
    BROWSER_SANITIZATION_PROVIDERS: BROWSER_SANITIZATION_PROVIDERS
};

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the platform-browser package.
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A backend for http that uses the `XMLHttpRequest` browser API.
 *
 * Take care not to evaluate this in non-browser contexts.
 *
 * @experimental
 */
var BrowserXhr = (function () {
    function BrowserXhr() {
    }
    BrowserXhr.prototype.build = function () { return (new XMLHttpRequest()); };
    BrowserXhr.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BrowserXhr.ctorParameters = [];
    return BrowserXhr;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var globalScope$3;
if (typeof window === 'undefined') {
    if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
        // TODO: Replace any with WorkerGlobalScope from lib.webworker.d.ts #3492
        globalScope$3 = self;
    }
    else {
        globalScope$3 = global;
    }
}
else {
    globalScope$3 = window;
}

// Need to declare a new variable for global here since TypeScript
// exports the original value of the symbol.
var _global$3 = globalScope$3;


var Date$4 = _global$3.Date;
// TODO: remove calls to assert in production environment
// Note: Can't just export this and import in in other files
// as `assert` is a reserved keyword in Dart
_global$3.assert = function assert(condition) {
    // TODO: to be fixed properly via #2830, noop for now
};
function isPresent$3(obj) {
    return obj !== undefined && obj !== null;
}
function isBlank$3(obj) {
    return obj === undefined || obj === null;
}


function isString$3(obj) {
    return typeof obj === 'string';
}





function isArray$5(obj) {
    return Array.isArray(obj);
}



// serialize / deserialize enum exist only for consistency with dart API
// enums in typescript don't need to be serialized



var StringWrapper$3 = (function () {
    function StringWrapper() {
    }
    StringWrapper.fromCharCode = function (code) { return String.fromCharCode(code); };
    StringWrapper.charCodeAt = function (s, index) { return s.charCodeAt(index); };
    StringWrapper.split = function (s, regExp) { return s.split(regExp); };
    StringWrapper.equals = function (s, s2) { return s === s2; };
    StringWrapper.stripLeft = function (s, charVal) {
        if (s && s.length) {
            var pos = 0;
            for (var i = 0; i < s.length; i++) {
                if (s[i] != charVal)
                    break;
                pos++;
            }
            s = s.substring(pos);
        }
        return s;
    };
    StringWrapper.stripRight = function (s, charVal) {
        if (s && s.length) {
            var pos = s.length;
            for (var i = s.length - 1; i >= 0; i--) {
                if (s[i] != charVal)
                    break;
                pos--;
            }
            s = s.substring(0, pos);
        }
        return s;
    };
    StringWrapper.replace = function (s, from, replace) {
        return s.replace(from, replace);
    };
    StringWrapper.replaceAll = function (s, from, replace) {
        return s.replace(from, replace);
    };
    StringWrapper.slice = function (s, from, to) {
        if (from === void 0) { from = 0; }
        if (to === void 0) { to = null; }
        return s.slice(from, to === null ? undefined : to);
    };
    StringWrapper.replaceAllMapped = function (s, from, cb) {
        return s.replace(from, function () {
            var matches = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                matches[_i - 0] = arguments[_i];
            }
            // Remove offset & string from the result array
            matches.splice(-2, 2);
            // The callback receives match, p1, ..., pn
            return cb(matches);
        });
    };
    StringWrapper.contains = function (s, substr) { return s.indexOf(substr) != -1; };
    StringWrapper.compare = function (a, b) {
        if (a < b) {
            return -1;
        }
        else if (a > b) {
            return 1;
        }
        else {
            return 0;
        }
    };
    return StringWrapper;
}());

var NumberWrapper$3 = (function () {
    function NumberWrapper() {
    }
    NumberWrapper.toFixed = function (n, fractionDigits) { return n.toFixed(fractionDigits); };
    NumberWrapper.equal = function (a, b) { return a === b; };
    NumberWrapper.parseIntAutoRadix = function (text) {
        var result = parseInt(text);
        if (isNaN(result)) {
            throw new Error('Invalid integer literal when parsing ' + text);
        }
        return result;
    };
    NumberWrapper.parseInt = function (text, radix) {
        if (radix == 10) {
            if (/^(\-|\+)?[0-9]+$/.test(text)) {
                return parseInt(text, radix);
            }
        }
        else if (radix == 16) {
            if (/^(\-|\+)?[0-9ABCDEFabcdef]+$/.test(text)) {
                return parseInt(text, radix);
            }
        }
        else {
            var result = parseInt(text, radix);
            if (!isNaN(result)) {
                return result;
            }
        }
        throw new Error('Invalid integer literal when parsing ' + text + ' in base ' + radix);
    };
    Object.defineProperty(NumberWrapper, "NaN", {
        get: function () { return NaN; },
        enumerable: true,
        configurable: true
    });
    NumberWrapper.isNumeric = function (value) { return !isNaN(value - parseFloat(value)); };
    NumberWrapper.isNaN = function (value) { return isNaN(value); };
    NumberWrapper.isInteger = function (value) { return Number.isInteger(value); };
    return NumberWrapper;
}());


// JS has NaN !== NaN

// JS considers NaN is the same as NaN for map Key (while NaN !== NaN otherwise)
// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map



function isJsObject$3(o) {
    return o !== null && (typeof o === 'function' || typeof o === 'object');
}


// Can't be all uppercase as our transpiler would think it is a special directive...
var Json$3 = (function () {
    function Json() {
    }
    Json.parse = function (s) { return _global$3.JSON.parse(s); };
    Json.stringify = function (data) {
        // Dart doesn't take 3 arguments
        return _global$3.JSON.stringify(data, null, 2);
    };
    return Json;
}());


var _symbolIterator$3 = null;
function getSymbolIterator$3() {
    if (isBlank$3(_symbolIterator$3)) {
        if (isPresent$3(globalScope$3.Symbol) && isPresent$3(Symbol.iterator)) {
            _symbolIterator$3 = Symbol.iterator;
        }
        else {
            // es6-shim specific logic
            var keys = Object.getOwnPropertyNames(Map.prototype);
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                if (key !== 'entries' && key !== 'size' &&
                    Map.prototype[key] === Map.prototype['entries']) {
                    _symbolIterator$3 = key;
                }
            }
        }
    }
    return _symbolIterator$3;
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Supported http methods.
 * @experimental
 */
var RequestMethod;
(function (RequestMethod) {
    RequestMethod[RequestMethod["Get"] = 0] = "Get";
    RequestMethod[RequestMethod["Post"] = 1] = "Post";
    RequestMethod[RequestMethod["Put"] = 2] = "Put";
    RequestMethod[RequestMethod["Delete"] = 3] = "Delete";
    RequestMethod[RequestMethod["Options"] = 4] = "Options";
    RequestMethod[RequestMethod["Head"] = 5] = "Head";
    RequestMethod[RequestMethod["Patch"] = 6] = "Patch";
})(RequestMethod || (RequestMethod = {}));
/**
 * All possible states in which a connection can be, based on
 * [States](http://www.w3.org/TR/XMLHttpRequest/#states) from the `XMLHttpRequest` spec, but with an
 * additional "CANCELLED" state.
 * @experimental
 */
var ReadyState;
(function (ReadyState) {
    ReadyState[ReadyState["Unsent"] = 0] = "Unsent";
    ReadyState[ReadyState["Open"] = 1] = "Open";
    ReadyState[ReadyState["HeadersReceived"] = 2] = "HeadersReceived";
    ReadyState[ReadyState["Loading"] = 3] = "Loading";
    ReadyState[ReadyState["Done"] = 4] = "Done";
    ReadyState[ReadyState["Cancelled"] = 5] = "Cancelled";
})(ReadyState || (ReadyState = {}));
/**
 * Acceptable response types to be associated with a {@link Response}, based on
 * [ResponseType](https://fetch.spec.whatwg.org/#responsetype) from the Fetch spec.
 * @experimental
 */
var ResponseType;
(function (ResponseType) {
    ResponseType[ResponseType["Basic"] = 0] = "Basic";
    ResponseType[ResponseType["Cors"] = 1] = "Cors";
    ResponseType[ResponseType["Default"] = 2] = "Default";
    ResponseType[ResponseType["Error"] = 3] = "Error";
    ResponseType[ResponseType["Opaque"] = 4] = "Opaque";
})(ResponseType || (ResponseType = {}));
/**
 * Supported content type to be automatically associated with a {@link Request}.
 * @experimental
 */
var ContentType;
(function (ContentType) {
    ContentType[ContentType["NONE"] = 0] = "NONE";
    ContentType[ContentType["JSON"] = 1] = "JSON";
    ContentType[ContentType["FORM"] = 2] = "FORM";
    ContentType[ContentType["FORM_DATA"] = 3] = "FORM_DATA";
    ContentType[ContentType["TEXT"] = 4] = "TEXT";
    ContentType[ContentType["BLOB"] = 5] = "BLOB";
    ContentType[ContentType["ARRAY_BUFFER"] = 6] = "ARRAY_BUFFER";
})(ContentType || (ContentType = {}));
/**
 * Define which buffer to use to store the response
 * @experimental
 */
var ResponseContentType;
(function (ResponseContentType) {
    ResponseContentType[ResponseContentType["Text"] = 0] = "Text";
    ResponseContentType[ResponseContentType["Json"] = 1] = "Json";
    ResponseContentType[ResponseContentType["ArrayBuffer"] = 2] = "ArrayBuffer";
    ResponseContentType[ResponseContentType["Blob"] = 3] = "Blob";
})(ResponseContentType || (ResponseContentType = {}));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var Map$4 = _global$3.Map;
var Set$4 = _global$3.Set;
// Safari and Internet Explorer do not support the iterable parameter to the
// Map constructor.  We work around that by manually adding the items.
var createMapFromPairs$3 = (function () {
    try {
        if (new Map$4([[1, 2]]).size === 1) {
            return function createMapFromPairs$3(pairs) { return new Map$4(pairs); };
        }
    }
    catch (e) {
    }
    return function createMapAndPopulateFromPairs(pairs) {
        var map = new Map$4();
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            map.set(pair[0], pair[1]);
        }
        return map;
    };
})();
var createMapFromMap$3 = (function () {
    try {
        if (new Map$4(new Map$4())) {
            return function createMapFromMap$3(m) { return new Map$4(m); };
        }
    }
    catch (e) {
    }
    return function createMapAndPopulateFromMap(m) {
        var map = new Map$4();
        m.forEach(function (v, k) { map.set(k, v); });
        return map;
    };
})();
var _clearValues$3 = (function () {
    if ((new Map$4()).keys().next) {
        return function _clearValues$3(m) {
            var keyIterator = m.keys();
            var k;
            while (!((k = keyIterator.next()).done)) {
                m.set(k.value, null);
            }
        };
    }
    else {
        return function _clearValuesWithForeEach(m) {
            m.forEach(function (v, k) { m.set(k, null); });
        };
    }
})();
// Safari doesn't implement MapIterator.next(), which is used is Traceur's polyfill of Array.from
// TODO(mlaval): remove the work around once we have a working polyfill of Array.from
var _arrayFromMap$3 = (function () {
    try {
        if ((new Map$4()).values().next) {
            return function createArrayFromMap(m, getValues) {
                return getValues ? Array.from(m.values()) : Array.from(m.keys());
            };
        }
    }
    catch (e) {
    }
    return function createArrayFromMapWithForeach(m, getValues) {
        var res = ListWrapper$3.createFixedSize(m.size), i = 0;
        m.forEach(function (v, k) {
            res[i] = getValues ? v : k;
            i++;
        });
        return res;
    };
})();
var MapWrapper$3 = (function () {
    function MapWrapper() {
    }
    MapWrapper.clone = function (m) { return createMapFromMap$3(m); };
    MapWrapper.createFromStringMap = function (stringMap) {
        var result = new Map$4();
        for (var prop in stringMap) {
            result.set(prop, stringMap[prop]);
        }
        return result;
    };
    MapWrapper.toStringMap = function (m) {
        var r = {};
        m.forEach(function (v, k) { return r[k] = v; });
        return r;
    };
    MapWrapper.createFromPairs = function (pairs) { return createMapFromPairs$3(pairs); };
    MapWrapper.clearValues = function (m) { _clearValues$3(m); };
    MapWrapper.iterable = function (m) { return m; };
    MapWrapper.keys = function (m) { return _arrayFromMap$3(m, false); };
    MapWrapper.values = function (m) { return _arrayFromMap$3(m, true); };
    return MapWrapper;
}());
/**
 * Wraps Javascript Objects
 */
var StringMapWrapper$3 = (function () {
    function StringMapWrapper() {
    }
    StringMapWrapper.create = function () {
        // Note: We are not using Object.create(null) here due to
        // performance!
        // http://jsperf.com/ng2-object-create-null
        return {};
    };
    StringMapWrapper.contains = function (map, key) {
        return map.hasOwnProperty(key);
    };
    StringMapWrapper.get = function (map, key) {
        return map.hasOwnProperty(key) ? map[key] : undefined;
    };
    StringMapWrapper.set = function (map, key, value) { map[key] = value; };
    StringMapWrapper.keys = function (map) { return Object.keys(map); };
    StringMapWrapper.values = function (map) {
        return Object.keys(map).map(function (k) { return map[k]; });
    };
    StringMapWrapper.isEmpty = function (map) {
        for (var prop in map) {
            return false;
        }
        return true;
    };
    StringMapWrapper.delete = function (map, key) { delete map[key]; };
    StringMapWrapper.forEach = function (map, callback) {
        for (var _i = 0, _a = Object.keys(map); _i < _a.length; _i++) {
            var k = _a[_i];
            callback(map[k], k);
        }
    };
    StringMapWrapper.merge = function (m1, m2) {
        var m = {};
        for (var _i = 0, _a = Object.keys(m1); _i < _a.length; _i++) {
            var k = _a[_i];
            m[k] = m1[k];
        }
        for (var _b = 0, _c = Object.keys(m2); _b < _c.length; _b++) {
            var k = _c[_b];
            m[k] = m2[k];
        }
        return m;
    };
    StringMapWrapper.equals = function (m1, m2) {
        var k1 = Object.keys(m1);
        var k2 = Object.keys(m2);
        if (k1.length != k2.length) {
            return false;
        }
        for (var i = 0; i < k1.length; i++) {
            var key = k1[i];
            if (m1[key] !== m2[key]) {
                return false;
            }
        }
        return true;
    };
    return StringMapWrapper;
}());
var ListWrapper$3 = (function () {
    function ListWrapper() {
    }
    // JS has no way to express a statically fixed size list, but dart does so we
    // keep both methods.
    ListWrapper.createFixedSize = function (size) { return new Array(size); };
    ListWrapper.createGrowableSize = function (size) { return new Array(size); };
    ListWrapper.clone = function (array) { return array.slice(0); };
    ListWrapper.forEachWithIndex = function (array, fn) {
        for (var i = 0; i < array.length; i++) {
            fn(array[i], i);
        }
    };
    ListWrapper.first = function (array) {
        if (!array)
            return null;
        return array[0];
    };
    ListWrapper.last = function (array) {
        if (!array || array.length == 0)
            return null;
        return array[array.length - 1];
    };
    ListWrapper.indexOf = function (array, value, startIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        return array.indexOf(value, startIndex);
    };
    ListWrapper.contains = function (list, el) { return list.indexOf(el) !== -1; };
    ListWrapper.reversed = function (array) {
        var a = ListWrapper.clone(array);
        return a.reverse();
    };
    ListWrapper.concat = function (a, b) { return a.concat(b); };
    ListWrapper.insert = function (list, index, value) { list.splice(index, 0, value); };
    ListWrapper.removeAt = function (list, index) {
        var res = list[index];
        list.splice(index, 1);
        return res;
    };
    ListWrapper.removeAll = function (list, items) {
        for (var i = 0; i < items.length; ++i) {
            var index = list.indexOf(items[i]);
            list.splice(index, 1);
        }
    };
    ListWrapper.remove = function (list, el) {
        var index = list.indexOf(el);
        if (index > -1) {
            list.splice(index, 1);
            return true;
        }
        return false;
    };
    ListWrapper.clear = function (list) { list.length = 0; };
    ListWrapper.isEmpty = function (list) { return list.length == 0; };
    ListWrapper.fill = function (list, value, start, end) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = null; }
        list.fill(value, start, end === null ? list.length : end);
    };
    ListWrapper.equals = function (a, b) {
        if (a.length != b.length)
            return false;
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    };
    ListWrapper.slice = function (l, from, to) {
        if (from === void 0) { from = 0; }
        if (to === void 0) { to = null; }
        return l.slice(from, to === null ? undefined : to);
    };
    ListWrapper.splice = function (l, from, length) { return l.splice(from, length); };
    ListWrapper.sort = function (l, compareFn) {
        if (isPresent$3(compareFn)) {
            l.sort(compareFn);
        }
        else {
            l.sort();
        }
    };
    ListWrapper.toString = function (l) { return l.toString(); };
    ListWrapper.toJSON = function (l) { return JSON.stringify(l); };
    ListWrapper.maximum = function (list, predicate) {
        if (list.length == 0) {
            return null;
        }
        var solution = null;
        var maxValue = -Infinity;
        for (var index = 0; index < list.length; index++) {
            var candidate = list[index];
            if (isBlank$3(candidate)) {
                continue;
            }
            var candidateValue = predicate(candidate);
            if (candidateValue > maxValue) {
                solution = candidate;
                maxValue = candidateValue;
            }
        }
        return solution;
    };
    ListWrapper.flatten = function (list) {
        var target = [];
        _flattenArray$3(list, target);
        return target;
    };
    ListWrapper.addAll = function (list, source) {
        for (var i = 0; i < source.length; i++) {
            list.push(source[i]);
        }
    };
    return ListWrapper;
}());
function _flattenArray$3(source, target) {
    if (isPresent$3(source)) {
        for (var i = 0; i < source.length; i++) {
            var item = source[i];
            if (isArray$5(item)) {
                _flattenArray$3(item, target);
            }
            else {
                target.push(item);
            }
        }
    }
    return target;
}
function isListLikeIterable$3(obj) {
    if (!isJsObject$3(obj))
        return false;
    return isArray$5(obj) ||
        (!(obj instanceof Map$4) &&
            getSymbolIterator$3() in obj); // JS Iterable have a Symbol.iterator prop
}

function iterateListLike$3(obj, fn) {
    if (isArray$5(obj)) {
        for (var i = 0; i < obj.length; i++) {
            fn(obj[i]);
        }
    }
    else {
        var iterator = obj[getSymbolIterator$3()]();
        var item;
        while (!((item = iterator.next()).done)) {
            fn(item.value);
        }
    }
}
// Safari and Internet Explorer do not support the iterable parameter to the
// Set constructor.  We work around that by manually adding the items.
var createSetFromList$3 = (function () {
    var test = new Set$4([1, 2, 3]);
    if (test.size === 3) {
        return function createSetFromList$3(lst) { return new Set$4(lst); };
    }
    else {
        return function createSetAndPopulateFromList(lst) {
            var res = new Set$4(lst);
            if (res.size !== lst.length) {
                for (var i = 0; i < lst.length; i++) {
                    res.add(lst[i]);
                }
            }
            return res;
        };
    }
})();

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Polyfill for [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers), as
 * specified in the [Fetch Spec](https://fetch.spec.whatwg.org/#headers-class).
 *
 * The only known difference between this `Headers` implementation and the spec is the
 * lack of an `entries` method.
 *
 * ### Example ([live demo](http://plnkr.co/edit/MTdwT6?p=preview))
 *
 * ```
 * import {Headers} from '@angular/http';
 *
 * var firstHeaders = new Headers();
 * firstHeaders.append('Content-Type', 'image/jpeg');
 * console.log(firstHeaders.get('Content-Type')) //'image/jpeg'
 *
 * // Create headers from Plain Old JavaScript Object
 * var secondHeaders = new Headers({
 *   'X-My-Custom-Header': 'Angular'
 * });
 * console.log(secondHeaders.get('X-My-Custom-Header')); //'Angular'
 *
 * var thirdHeaders = new Headers(secondHeaders);
 * console.log(thirdHeaders.get('X-My-Custom-Header')); //'Angular'
 * ```
 *
 * @experimental
 */
var Headers = (function () {
    function Headers(headers) {
        var _this = this;
        if (headers instanceof Headers) {
            this._headersMap = new Map$4(headers._headersMap);
            return;
        }
        this._headersMap = new Map$4();
        if (isBlank$3(headers)) {
            return;
        }
        // headers instanceof StringMap
        StringMapWrapper$3.forEach(headers, function (v, k) {
            _this._headersMap.set(normalize(k), isListLikeIterable$3(v) ? v : [v]);
        });
    }
    /**
     * Returns a new Headers instance from the given DOMString of Response Headers
     */
    Headers.fromResponseHeaderString = function (headersString) {
        var headers = new Headers();
        headersString.split('\n').forEach(function (line) {
            var index = line.indexOf(':');
            if (index > 0) {
                var key = line.substring(0, index);
                var value = line.substring(index + 1).trim();
                headers.set(key, value);
            }
        });
        return headers;
    };
    /**
     * Appends a header to existing list of header values for a given header name.
     */
    Headers.prototype.append = function (name, value) {
        name = normalize(name);
        var mapName = this._headersMap.get(name);
        var list = isListLikeIterable$3(mapName) ? mapName : [];
        list.push(value);
        this._headersMap.set(name, list);
    };
    /**
     * Deletes all header values for the given name.
     */
    Headers.prototype.delete = function (name) { this._headersMap.delete(normalize(name)); };
    Headers.prototype.forEach = function (fn) {
        this._headersMap.forEach(fn);
    };
    /**
     * Returns first header that matches given name.
     */
    Headers.prototype.get = function (header) { return ListWrapper$3.first(this._headersMap.get(normalize(header))); };
    /**
     * Check for existence of header by given name.
     */
    Headers.prototype.has = function (header) { return this._headersMap.has(normalize(header)); };
    /**
     * Provides names of set headers
     */
    Headers.prototype.keys = function () { return MapWrapper$3.keys(this._headersMap); };
    /**
     * Sets or overrides header value for given name.
     */
    Headers.prototype.set = function (header, value) {
        var list = [];
        if (isListLikeIterable$3(value)) {
            var pushValue = value.join(',');
            list.push(pushValue);
        }
        else {
            list.push(value);
        }
        this._headersMap.set(normalize(header), list);
    };
    /**
     * Returns values of all headers.
     */
    Headers.prototype.values = function () { return MapWrapper$3.values(this._headersMap); };
    /**
     * Returns string of all headers.
     */
    Headers.prototype.toJSON = function () {
        var serializableHeaders = {};
        this._headersMap.forEach(function (values, name) {
            var list = [];
            iterateListLike$3(values, function (val /** TODO #9100 */) { return list = ListWrapper$3.concat(list, val.split(',')); });
            serializableHeaders[normalize(name)] = list;
        });
        return serializableHeaders;
    };
    /**
     * Returns list of header values for a given name.
     */
    Headers.prototype.getAll = function (header) {
        var headers = this._headersMap.get(normalize(header));
        return isListLikeIterable$3(headers) ? headers : [];
    };
    /**
     * This method is not implemented.
     */
    Headers.prototype.entries = function () { throw new Error('"entries" method is not implemented on Headers class'); };
    return Headers;
}());
// "HTTP character sets are identified by case-insensitive tokens"
// Spec at https://tools.ietf.org/html/rfc2616
// This implementation is same as NodeJS.
// see https://nodejs.org/dist/latest-v6.x/docs/api/http.html#http_message_headers
function normalize(name) {
    return name.toLowerCase();
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$38 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Creates a response options object to be optionally provided when instantiating a
 * {@link Response}.
 *
 * This class is based on the `ResponseInit` description in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#responseinit).
 *
 * All values are null by default. Typical defaults can be found in the
 * {@link BaseResponseOptions} class, which sub-classes `ResponseOptions`.
 *
 * This class may be used in tests to build {@link Response Responses} for
 * mock responses (see {@link MockBackend}).
 *
 * ### Example ([live demo](http://plnkr.co/edit/P9Jkk8e8cz6NVzbcxEsD?p=preview))
 *
 * ```typescript
 * import {ResponseOptions, Response} from '@angular/http';
 *
 * var options = new ResponseOptions({
 *   body: '{"name":"Jeff"}'
 * });
 * var res = new Response(options);
 *
 * console.log('res.json():', res.json()); // Object {name: "Jeff"}
 * ```
 *
 * @experimental
 */
var ResponseOptions = (function () {
    function ResponseOptions(_a) {
        var _b = _a === void 0 ? {} : _a, body = _b.body, status = _b.status, headers = _b.headers, statusText = _b.statusText, type = _b.type, url = _b.url;
        this.body = isPresent$3(body) ? body : null;
        this.status = isPresent$3(status) ? status : null;
        this.headers = isPresent$3(headers) ? headers : null;
        this.statusText = isPresent$3(statusText) ? statusText : null;
        this.type = isPresent$3(type) ? type : null;
        this.url = isPresent$3(url) ? url : null;
    }
    /**
     * Creates a copy of the `ResponseOptions` instance, using the optional input as values to
     * override
     * existing values. This method will not change the values of the instance on which it is being
     * called.
     *
     * This may be useful when sharing a base `ResponseOptions` object inside tests,
     * where certain properties may change from test to test.
     *
     * ### Example ([live demo](http://plnkr.co/edit/1lXquqFfgduTFBWjNoRE?p=preview))
     *
     * ```typescript
     * import {ResponseOptions, Response} from '@angular/http';
     *
     * var options = new ResponseOptions({
     *   body: {name: 'Jeff'}
     * });
     * var res = new Response(options.merge({
     *   url: 'https://google.com'
     * }));
     * console.log('options.url:', options.url); // null
     * console.log('res.json():', res.json()); // Object {name: "Jeff"}
     * console.log('res.url:', res.url); // https://google.com
     * ```
     */
    ResponseOptions.prototype.merge = function (options) {
        return new ResponseOptions({
            body: isPresent$3(options) && isPresent$3(options.body) ? options.body : this.body,
            status: isPresent$3(options) && isPresent$3(options.status) ? options.status : this.status,
            headers: isPresent$3(options) && isPresent$3(options.headers) ? options.headers : this.headers,
            statusText: isPresent$3(options) && isPresent$3(options.statusText) ? options.statusText :
                this.statusText,
            type: isPresent$3(options) && isPresent$3(options.type) ? options.type : this.type,
            url: isPresent$3(options) && isPresent$3(options.url) ? options.url : this.url,
        });
    };
    return ResponseOptions;
}());
/**
 * Subclass of {@link ResponseOptions}, with default values.
 *
 * Default values:
 *  * status: 200
 *  * headers: empty {@link Headers} object
 *
 * This class could be extended and bound to the {@link ResponseOptions} class
 * when configuring an {@link Injector}, in order to override the default options
 * used by {@link Http} to create {@link Response Responses}.
 *
 * ### Example ([live demo](http://plnkr.co/edit/qv8DLT?p=preview))
 *
 * ```typescript
 * import {provide} from '@angular/core';
 * import {bootstrap} from '@angular/platform-browser/browser';
 * import {HTTP_PROVIDERS, Headers, Http, BaseResponseOptions, ResponseOptions} from
 * '@angular/http';
 * import {App} from './myapp';
 *
 * class MyOptions extends BaseResponseOptions {
 *   headers:Headers = new Headers({network: 'github'});
 * }
 *
 * bootstrap(App, [HTTP_PROVIDERS, {provide: ResponseOptions, useClass: MyOptions}]);
 * ```
 *
 * The options could also be extended when manually creating a {@link Response}
 * object.
 *
 * ### Example ([live demo](http://plnkr.co/edit/VngosOWiaExEtbstDoix?p=preview))
 *
 * ```
 * import {BaseResponseOptions, Response} from '@angular/http';
 *
 * var options = new BaseResponseOptions();
 * var res = new Response(options.merge({
 *   body: 'Angular',
 *   headers: new Headers({framework: 'angular'})
 * }));
 * console.log('res.headers.get("framework"):', res.headers.get('framework')); // angular
 * console.log('res.text():', res.text()); // Angular;
 * ```
 *
 * @experimental
 */
var BaseResponseOptions = (function (_super) {
    __extends$38(BaseResponseOptions, _super);
    function BaseResponseOptions() {
        _super.call(this, { status: 200, statusText: 'Ok', type: ResponseType.Default, headers: new Headers() });
    }
    BaseResponseOptions.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BaseResponseOptions.ctorParameters = [];
    return BaseResponseOptions;
}(ResponseOptions));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Abstract class from which real backends are derived.
 *
 * The primary purpose of a `ConnectionBackend` is to create new connections to fulfill a given
 * {@link Request}.
 *
 * @experimental
 */
var ConnectionBackend = (function () {
    function ConnectionBackend() {
    }
    return ConnectionBackend;
}());
/**
 * Abstract class from which real connections are derived.
 *
 * @experimental
 */
var Connection = (function () {
    function Connection() {
    }
    return Connection;
}());
/**
 * An XSRFStrategy configures XSRF protection (e.g. via headers) on an HTTP request.
 *
 * @experimental
 */
var XSRFStrategy = (function () {
    function XSRFStrategy() {
    }
    return XSRFStrategy;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function normalizeMethodName(method) {
    if (isString$3(method)) {
        var originalMethod = method;
        method = method
            .replace(/(\w)(\w*)/g, function (g0, g1, g2) { return g1.toUpperCase() + g2.toLowerCase(); });
        method = RequestMethod[method];
        if (typeof method !== 'number')
            throw new Error("Invalid request method. The method \"" + originalMethod + "\" is not supported.");
    }
    return method;
}
var isSuccess = function (status) { return (status >= 200 && status < 300); };
function getResponseURL(xhr) {
    if ('responseURL' in xhr) {
        return xhr.responseURL;
    }
    if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
        return xhr.getResponseHeader('X-Request-URL');
    }
    return;
}
function stringToArrayBuffer(input) {
    var view = new Uint16Array(input.length);
    for (var i = 0, strLen = input.length; i < strLen; i++) {
        view[i] = input.charCodeAt(i);
    }
    return view.buffer;
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function paramParser(rawParams) {
    if (rawParams === void 0) { rawParams = ''; }
    var map = new Map$4();
    if (rawParams.length > 0) {
        var params = rawParams.split('&');
        params.forEach(function (param) {
            var eqIdx = param.indexOf('=');
            var _a = eqIdx == -1 ? [param, ''] : [param.slice(0, eqIdx), param.slice(eqIdx + 1)], key = _a[0], val = _a[1];
            var list = map.get(key) || [];
            list.push(val);
            map.set(key, list);
        });
    }
    return map;
}
/**
 * @experimental
 **/
var QueryEncoder = (function () {
    function QueryEncoder() {
    }
    QueryEncoder.prototype.encodeKey = function (k) { return standardEncoding(k); };
    QueryEncoder.prototype.encodeValue = function (v) { return standardEncoding(v); };
    return QueryEncoder;
}());
function standardEncoding(v) {
    return encodeURIComponent(v)
        .replace(/%40/gi, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/gi, '$')
        .replace(/%2C/gi, ',')
        .replace(/%3B/gi, ';')
        .replace(/%2B/gi, '+')
        .replace(/%3D/gi, '=')
        .replace(/%3F/gi, '?')
        .replace(/%2F/gi, '/');
}
/**
 * Map-like representation of url search parameters, based on
 * [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams) in the url living standard,
 * with several extensions for merging URLSearchParams objects:
 *   - setAll()
 *   - appendAll()
 *   - replaceAll()
 *
 * This class accepts an optional second parameter of ${@link QueryEncoder},
 * which is used to serialize parameters before making a request. By default,
 * `QueryEncoder` encodes keys and values of parameters using `encodeURIComponent`,
 * and then un-encodes certain characters that are allowed to be part of the query
 * according to IETF RFC 3986: https://tools.ietf.org/html/rfc3986.
 *
 * These are the characters that are not encoded: `! $ \' ( ) * + , ; A 9 - . _ ~ ? /`
 *
 * If the set of allowed query characters is not acceptable for a particular backend,
 * `QueryEncoder` can be subclassed and provided as the 2nd argument to URLSearchParams.
 *
 * ```
 * import {URLSearchParams, QueryEncoder} from '@angular/http';
 * class MyQueryEncoder extends QueryEncoder {
 *   encodeKey(k: string): string {
 *     return myEncodingFunction(k);
 *   }
 *
 *   encodeValue(v: string): string {
 *     return myEncodingFunction(v);
 *   }
 * }
 *
 * let params = new URLSearchParams('', new MyQueryEncoder());
 * ```
 * @experimental
 */
var URLSearchParams = (function () {
    function URLSearchParams(rawParams, queryEncoder) {
        if (rawParams === void 0) { rawParams = ''; }
        if (queryEncoder === void 0) { queryEncoder = new QueryEncoder(); }
        this.rawParams = rawParams;
        this.queryEncoder = queryEncoder;
        this.paramsMap = paramParser(rawParams);
    }
    URLSearchParams.prototype.clone = function () {
        var clone = new URLSearchParams('', this.queryEncoder);
        clone.appendAll(this);
        return clone;
    };
    URLSearchParams.prototype.has = function (param) { return this.paramsMap.has(param); };
    URLSearchParams.prototype.get = function (param) {
        var storedParam = this.paramsMap.get(param);
        if (isListLikeIterable$3(storedParam)) {
            return ListWrapper$3.first(storedParam);
        }
        else {
            return null;
        }
    };
    URLSearchParams.prototype.getAll = function (param) {
        var mapParam = this.paramsMap.get(param);
        return isPresent$3(mapParam) ? mapParam : [];
    };
    URLSearchParams.prototype.set = function (param, val) {
        var mapParam = this.paramsMap.get(param);
        var list = isPresent$3(mapParam) ? mapParam : [];
        ListWrapper$3.clear(list);
        list.push(val);
        this.paramsMap.set(param, list);
    };
    // A merge operation
    // For each name-values pair in `searchParams`, perform `set(name, values[0])`
    //
    // E.g: "a=[1,2,3], c=[8]" + "a=[4,5,6], b=[7]" = "a=[4], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    URLSearchParams.prototype.setAll = function (searchParams) {
        var _this = this;
        searchParams.paramsMap.forEach(function (value, param) {
            var mapParam = _this.paramsMap.get(param);
            var list = isPresent$3(mapParam) ? mapParam : [];
            ListWrapper$3.clear(list);
            list.push(value[0]);
            _this.paramsMap.set(param, list);
        });
    };
    URLSearchParams.prototype.append = function (param, val) {
        var mapParam = this.paramsMap.get(param);
        var list = isPresent$3(mapParam) ? mapParam : [];
        list.push(val);
        this.paramsMap.set(param, list);
    };
    // A merge operation
    // For each name-values pair in `searchParams`, perform `append(name, value)`
    // for each value in `values`.
    //
    // E.g: "a=[1,2], c=[8]" + "a=[3,4], b=[7]" = "a=[1,2,3,4], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    URLSearchParams.prototype.appendAll = function (searchParams) {
        var _this = this;
        searchParams.paramsMap.forEach(function (value, param) {
            var mapParam = _this.paramsMap.get(param);
            var list = isPresent$3(mapParam) ? mapParam : [];
            for (var i = 0; i < value.length; ++i) {
                list.push(value[i]);
            }
            _this.paramsMap.set(param, list);
        });
    };
    // A merge operation
    // For each name-values pair in `searchParams`, perform `delete(name)`,
    // followed by `set(name, values)`
    //
    // E.g: "a=[1,2,3], c=[8]" + "a=[4,5,6], b=[7]" = "a=[4,5,6], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    URLSearchParams.prototype.replaceAll = function (searchParams) {
        var _this = this;
        searchParams.paramsMap.forEach(function (value, param) {
            var mapParam = _this.paramsMap.get(param);
            var list = isPresent$3(mapParam) ? mapParam : [];
            ListWrapper$3.clear(list);
            for (var i = 0; i < value.length; ++i) {
                list.push(value[i]);
            }
            _this.paramsMap.set(param, list);
        });
    };
    URLSearchParams.prototype.toString = function () {
        var _this = this;
        var paramsList = [];
        this.paramsMap.forEach(function (values, k) {
            values.forEach(function (v) { return paramsList.push(_this.queryEncoder.encodeKey(k) + '=' + _this.queryEncoder.encodeValue(v)); });
        });
        return paramsList.join('&');
    };
    URLSearchParams.prototype.delete = function (param) { this.paramsMap.delete(param); };
    return URLSearchParams;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * HTTP request body used by both {@link Request} and {@link Response}
 * https://fetch.spec.whatwg.org/#body
 */
var Body = (function () {
    function Body() {
    }
    /**
     * Attempts to return body as parsed `JSON` object, or raises an exception.
     */
    Body.prototype.json = function () {
        if (isString$3(this._body)) {
            return Json$3.parse(this._body);
        }
        if (this._body instanceof ArrayBuffer) {
            return Json$3.parse(this.text());
        }
        return this._body;
    };
    /**
     * Returns the body as a string, presuming `toString()` can be called on the response body.
     */
    Body.prototype.text = function () {
        if (this._body instanceof URLSearchParams) {
            return this._body.toString();
        }
        if (this._body instanceof ArrayBuffer) {
            return String.fromCharCode.apply(null, new Uint16Array(this._body));
        }
        if (this._body === null) {
            return '';
        }
        if (isJsObject$3(this._body)) {
            return Json$3.stringify(this._body);
        }
        return this._body.toString();
    };
    /**
     * Return the body as an ArrayBuffer
     */
    Body.prototype.arrayBuffer = function () {
        if (this._body instanceof ArrayBuffer) {
            return this._body;
        }
        return stringToArrayBuffer(this.text());
    };
    /**
      * Returns the request's body as a Blob, assuming that body exists.
      */
    Body.prototype.blob = function () {
        if (this._body instanceof Blob) {
            return this._body;
        }
        if (this._body instanceof ArrayBuffer) {
            return new Blob([this._body]);
        }
        throw new Error('The request body isn\'t either a blob or an array buffer');
    };
    return Body;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$39 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Creates `Response` instances from provided values.
 *
 * Though this object isn't
 * usually instantiated by end-users, it is the primary object interacted with when it comes time to
 * add data to a view.
 *
 * ### Example
 *
 * ```
 * http.request('my-friends.txt').subscribe(response => this.friends = response.text());
 * ```
 *
 * The Response's interface is inspired by the Response constructor defined in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#response-class), but is considered a static value whose body
 * can be accessed many times. There are other differences in the implementation, but this is the
 * most significant.
 *
 * @experimental
 */
var Response = (function (_super) {
    __extends$39(Response, _super);
    function Response(responseOptions) {
        _super.call(this);
        this._body = responseOptions.body;
        this.status = responseOptions.status;
        this.ok = (this.status >= 200 && this.status <= 299);
        this.statusText = responseOptions.statusText;
        this.headers = responseOptions.headers;
        this.type = responseOptions.type;
        this.url = responseOptions.url;
    }
    Response.prototype.toString = function () {
        return "Response with status: " + this.status + " " + this.statusText + " for URL: " + this.url;
    };
    return Response;
}(Body));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var _nextRequestId = 0;
var JSONP_HOME = '__ng_jsonp__';
var _jsonpConnections = null;
function _getJsonpConnections() {
    if (_jsonpConnections === null) {
        _jsonpConnections = _global$3[JSONP_HOME] = {};
    }
    return _jsonpConnections;
}
// Make sure not to evaluate this in a non-browser environment!
var BrowserJsonp = (function () {
    function BrowserJsonp() {
    }
    // Construct a <script> element with the specified URL
    BrowserJsonp.prototype.build = function (url) {
        var node = document.createElement('script');
        node.src = url;
        return node;
    };
    BrowserJsonp.prototype.nextRequestID = function () { return "__req" + _nextRequestId++; };
    BrowserJsonp.prototype.requestCallback = function (id) { return JSONP_HOME + "." + id + ".finished"; };
    BrowserJsonp.prototype.exposeConnection = function (id, connection) {
        var connections = _getJsonpConnections();
        connections[id] = connection;
    };
    BrowserJsonp.prototype.removeConnection = function (id) {
        var connections = _getJsonpConnections();
        connections[id] = null;
    };
    // Attach the <script> element to the DOM
    BrowserJsonp.prototype.send = function (node) { document.body.appendChild((node)); };
    // Remove <script> element from the DOM
    BrowserJsonp.prototype.cleanup = function (node) {
        if (node.parentNode) {
            node.parentNode.removeChild((node));
        }
    };
    BrowserJsonp.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BrowserJsonp.ctorParameters = [];
    return BrowserJsonp;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$37 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JSONP_ERR_NO_CALLBACK = 'JSONP injected script did not invoke callback.';
var JSONP_ERR_WRONG_METHOD = 'JSONP requests must use GET request method.';
/**
 * Abstract base class for an in-flight JSONP request.
 *
 * @experimental
 */
var JSONPConnection = (function () {
    function JSONPConnection() {
    }
    return JSONPConnection;
}());
var JSONPConnection_ = (function (_super) {
    __extends$37(JSONPConnection_, _super);
    function JSONPConnection_(req, _dom, baseResponseOptions) {
        var _this = this;
        _super.call(this);
        this._dom = _dom;
        this.baseResponseOptions = baseResponseOptions;
        this._finished = false;
        if (req.method !== RequestMethod.Get) {
            throw new TypeError(JSONP_ERR_WRONG_METHOD);
        }
        this.request = req;
        this.response = new Observable_2(function (responseObserver) {
            _this.readyState = ReadyState.Loading;
            var id = _this._id = _dom.nextRequestID();
            _dom.exposeConnection(id, _this);
            // Workaround Dart
            // url = url.replace(/=JSONP_CALLBACK(&|$)/, `generated method`);
            var callback = _dom.requestCallback(_this._id);
            var url = req.url;
            if (url.indexOf('=JSONP_CALLBACK&') > -1) {
                url = StringWrapper$3.replace(url, '=JSONP_CALLBACK&', "=" + callback + "&");
            }
            else if (url.lastIndexOf('=JSONP_CALLBACK') === url.length - '=JSONP_CALLBACK'.length) {
                url = url.substring(0, url.length - '=JSONP_CALLBACK'.length) + ("=" + callback);
            }
            var script = _this._script = _dom.build(url);
            var onLoad = function (event) {
                if (_this.readyState === ReadyState.Cancelled)
                    return;
                _this.readyState = ReadyState.Done;
                _dom.cleanup(script);
                if (!_this._finished) {
                    var responseOptions_1 = new ResponseOptions({ body: JSONP_ERR_NO_CALLBACK, type: ResponseType.Error, url: url });
                    if (isPresent$3(baseResponseOptions)) {
                        responseOptions_1 = baseResponseOptions.merge(responseOptions_1);
                    }
                    responseObserver.error(new Response(responseOptions_1));
                    return;
                }
                var responseOptions = new ResponseOptions({ body: _this._responseData, url: url });
                if (isPresent$3(_this.baseResponseOptions)) {
                    responseOptions = _this.baseResponseOptions.merge(responseOptions);
                }
                responseObserver.next(new Response(responseOptions));
                responseObserver.complete();
            };
            var onError = function (error) {
                if (_this.readyState === ReadyState.Cancelled)
                    return;
                _this.readyState = ReadyState.Done;
                _dom.cleanup(script);
                var responseOptions = new ResponseOptions({ body: error.message, type: ResponseType.Error });
                if (isPresent$3(baseResponseOptions)) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                responseObserver.error(new Response(responseOptions));
            };
            script.addEventListener('load', onLoad);
            script.addEventListener('error', onError);
            _dom.send(script);
            return function () {
                _this.readyState = ReadyState.Cancelled;
                script.removeEventListener('load', onLoad);
                script.removeEventListener('error', onError);
                if (isPresent$3(script)) {
                    _this._dom.cleanup(script);
                }
            };
        });
    }
    JSONPConnection_.prototype.finished = function (data) {
        // Don't leak connections
        this._finished = true;
        this._dom.removeConnection(this._id);
        if (this.readyState === ReadyState.Cancelled)
            return;
        this._responseData = data;
    };
    return JSONPConnection_;
}(JSONPConnection));
/**
 * A {@link ConnectionBackend} that uses the JSONP strategy of making requests.
 *
 * @experimental
 */
var JSONPBackend = (function (_super) {
    __extends$37(JSONPBackend, _super);
    function JSONPBackend() {
        _super.apply(this, arguments);
    }
    return JSONPBackend;
}(ConnectionBackend));
var JSONPBackend_ = (function (_super) {
    __extends$37(JSONPBackend_, _super);
    function JSONPBackend_(_browserJSONP, _baseResponseOptions) {
        _super.call(this);
        this._browserJSONP = _browserJSONP;
        this._baseResponseOptions = _baseResponseOptions;
    }
    JSONPBackend_.prototype.createConnection = function (request) {
        return new JSONPConnection_(request, this._browserJSONP, this._baseResponseOptions);
    };
    JSONPBackend_.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    JSONPBackend_.ctorParameters = [
        { type: BrowserJsonp, },
        { type: ResponseOptions, },
    ];
    return JSONPBackend_;
}(JSONPBackend));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var XSSI_PREFIX = /^\)\]\}',?\n/;
/**
 * Creates connections using `XMLHttpRequest`. Given a fully-qualified
 * request, an `XHRConnection` will immediately create an `XMLHttpRequest` object and send the
 * request.
 *
 * This class would typically not be created or interacted with directly inside applications, though
 * the {@link MockConnection} may be interacted with in tests.
 *
 * @experimental
 */
var XHRConnection = (function () {
    function XHRConnection(req, browserXHR, baseResponseOptions) {
        var _this = this;
        this.request = req;
        this.response = new Observable_2(function (responseObserver) {
            var _xhr = browserXHR.build();
            _xhr.open(RequestMethod[req.method].toUpperCase(), req.url);
            if (isPresent$3(req.withCredentials)) {
                _xhr.withCredentials = req.withCredentials;
            }
            // load event handler
            var onLoad = function () {
                // responseText is the old-school way of retrieving response (supported by IE8 & 9)
                // response/responseType properties were introduced in ResourceLoader Level2 spec (supported
                // by
                // IE10)
                var body = isPresent$3(_xhr.response) ? _xhr.response : _xhr.responseText;
                // Implicitly strip a potential XSSI prefix.
                if (isString$3(body))
                    body = body.replace(XSSI_PREFIX, '');
                var headers = Headers.fromResponseHeaderString(_xhr.getAllResponseHeaders());
                var url = getResponseURL(_xhr);
                // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
                var status = _xhr.status === 1223 ? 204 : _xhr.status;
                // fix status code when it is 0 (0 status is undocumented).
                // Occurs when accessing file resources or on Android 4.1 stock browser
                // while retrieving files from application cache.
                if (status === 0) {
                    status = body ? 200 : 0;
                }
                var statusText = _xhr.statusText || 'OK';
                var responseOptions = new ResponseOptions({ body: body, status: status, headers: headers, statusText: statusText, url: url });
                if (isPresent$3(baseResponseOptions)) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                var response = new Response(responseOptions);
                response.ok = isSuccess(status);
                if (response.ok) {
                    responseObserver.next(response);
                    // TODO(gdi2290): defer complete if array buffer until done
                    responseObserver.complete();
                    return;
                }
                responseObserver.error(response);
            };
            // error event handler
            var onError = function (err) {
                var responseOptions = new ResponseOptions({
                    body: err,
                    type: ResponseType.Error,
                    status: _xhr.status,
                    statusText: _xhr.statusText,
                });
                if (isPresent$3(baseResponseOptions)) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                responseObserver.error(new Response(responseOptions));
            };
            _this.setDetectedContentType(req, _xhr);
            if (isPresent$3(req.headers)) {
                req.headers.forEach(function (values, name) { return _xhr.setRequestHeader(name, values.join(',')); });
            }
            // Select the correct buffer type to store the response
            if (isPresent$3(req.responseType) && isPresent$3(_xhr.responseType)) {
                switch (req.responseType) {
                    case ResponseContentType.ArrayBuffer:
                        _xhr.responseType = 'arraybuffer';
                        break;
                    case ResponseContentType.Json:
                        _xhr.responseType = 'json';
                        break;
                    case ResponseContentType.Text:
                        _xhr.responseType = 'text';
                        break;
                    case ResponseContentType.Blob:
                        _xhr.responseType = 'blob';
                        break;
                    default:
                        throw new Error('The selected responseType is not supported');
                }
            }
            _xhr.addEventListener('load', onLoad);
            _xhr.addEventListener('error', onError);
            _xhr.send(_this.request.getBody());
            return function () {
                _xhr.removeEventListener('load', onLoad);
                _xhr.removeEventListener('error', onError);
                _xhr.abort();
            };
        });
    }
    XHRConnection.prototype.setDetectedContentType = function (req /** TODO #9100 */, _xhr /** TODO #9100 */) {
        // Skip if a custom Content-Type header is provided
        if (isPresent$3(req.headers) && isPresent$3(req.headers.get('Content-Type'))) {
            return;
        }
        // Set the detected content type
        switch (req.contentType) {
            case ContentType.NONE:
                break;
            case ContentType.JSON:
                _xhr.setRequestHeader('content-type', 'application/json');
                break;
            case ContentType.FORM:
                _xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
                break;
            case ContentType.TEXT:
                _xhr.setRequestHeader('content-type', 'text/plain');
                break;
            case ContentType.BLOB:
                var blob = req.blob();
                if (blob.type) {
                    _xhr.setRequestHeader('content-type', blob.type);
                }
                break;
        }
    };
    return XHRConnection;
}());
/**
 * `XSRFConfiguration` sets up Cross Site Request Forgery (XSRF) protection for the application
 * using a cookie. See {@link https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)}
 * for more information on XSRF.
 *
 * Applications can configure custom cookie and header names by binding an instance of this class
 * with different `cookieName` and `headerName` values. See the main HTTP documentation for more
 * details.
 *
 * @experimental
 */
var CookieXSRFStrategy = (function () {
    function CookieXSRFStrategy(_cookieName, _headerName) {
        if (_cookieName === void 0) { _cookieName = 'XSRF-TOKEN'; }
        if (_headerName === void 0) { _headerName = 'X-XSRF-TOKEN'; }
        this._cookieName = _cookieName;
        this._headerName = _headerName;
    }
    CookieXSRFStrategy.prototype.configureRequest = function (req) {
        var xsrfToken = __platform_browser_private__.getDOM().getCookie(this._cookieName);
        if (xsrfToken && !req.headers.has(this._headerName)) {
            req.headers.set(this._headerName, xsrfToken);
        }
    };
    return CookieXSRFStrategy;
}());
/**
 * Creates {@link XHRConnection} instances.
 *
 * This class would typically not be used by end users, but could be
 * overridden if a different backend implementation should be used,
 * such as in a node backend.
 *
 * ### Example
 *
 * ```
 * import {Http, MyNodeBackend, HTTP_PROVIDERS, BaseRequestOptions} from '@angular/http';
 * @Component({
 *   viewProviders: [
 *     HTTP_PROVIDERS,
 *     {provide: Http, useFactory: (backend, options) => {
 *       return new Http(backend, options);
 *     }, deps: [MyNodeBackend, BaseRequestOptions]}]
 * })
 * class MyComponent {
 *   constructor(http:Http) {
 *     http.request('people.json').subscribe(res => this.people = res.json());
 *   }
 * }
 * ```
 * @experimental
 */
var XHRBackend = (function () {
    function XHRBackend(_browserXHR, _baseResponseOptions, _xsrfStrategy) {
        this._browserXHR = _browserXHR;
        this._baseResponseOptions = _baseResponseOptions;
        this._xsrfStrategy = _xsrfStrategy;
    }
    XHRBackend.prototype.createConnection = function (request) {
        this._xsrfStrategy.configureRequest(request);
        return new XHRConnection(request, this._browserXHR, this._baseResponseOptions);
    };
    XHRBackend.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    XHRBackend.ctorParameters = [
        { type: BrowserXhr, },
        { type: ResponseOptions, },
        { type: XSRFStrategy, },
    ];
    return XHRBackend;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$40 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Creates a request options object to be optionally provided when instantiating a
 * {@link Request}.
 *
 * This class is based on the `RequestInit` description in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#requestinit).
 *
 * All values are null by default. Typical defaults can be found in the {@link BaseRequestOptions}
 * class, which sub-classes `RequestOptions`.
 *
 * ### Example ([live demo](http://plnkr.co/edit/7Wvi3lfLq41aQPKlxB4O?p=preview))
 *
 * ```typescript
 * import {RequestOptions, Request, RequestMethod} from '@angular/http';
 *
 * var options = new RequestOptions({
 *   method: RequestMethod.Post,
 *   url: 'https://google.com'
 * });
 * var req = new Request(options);
 * console.log('req.method:', RequestMethod[req.method]); // Post
 * console.log('options.url:', options.url); // https://google.com
 * ```
 *
 * @experimental
 */
var RequestOptions = (function () {
    function RequestOptions(_a) {
        var _b = _a === void 0 ? {} : _a, method = _b.method, headers = _b.headers, body = _b.body, url = _b.url, search = _b.search, withCredentials = _b.withCredentials, responseType = _b.responseType;
        this.method = isPresent$3(method) ? normalizeMethodName(method) : null;
        this.headers = isPresent$3(headers) ? headers : null;
        this.body = isPresent$3(body) ? body : null;
        this.url = isPresent$3(url) ? url : null;
        this.search = isPresent$3(search) ?
            (isString$3(search) ? new URLSearchParams((search)) : (search)) :
            null;
        this.withCredentials = isPresent$3(withCredentials) ? withCredentials : null;
        this.responseType = isPresent$3(responseType) ? responseType : null;
    }
    /**
     * Creates a copy of the `RequestOptions` instance, using the optional input as values to override
     * existing values. This method will not change the values of the instance on which it is being
     * called.
     *
     * Note that `headers` and `search` will override existing values completely if present in
     * the `options` object. If these values should be merged, it should be done prior to calling
     * `merge` on the `RequestOptions` instance.
     *
     * ### Example ([live demo](http://plnkr.co/edit/6w8XA8YTkDRcPYpdB9dk?p=preview))
     *
     * ```typescript
     * import {RequestOptions, Request, RequestMethod} from '@angular/http';
     *
     * var options = new RequestOptions({
     *   method: RequestMethod.Post
     * });
     * var req = new Request(options.merge({
     *   url: 'https://google.com'
     * }));
     * console.log('req.method:', RequestMethod[req.method]); // Post
     * console.log('options.url:', options.url); // null
     * console.log('req.url:', req.url); // https://google.com
     * ```
     */
    RequestOptions.prototype.merge = function (options) {
        return new RequestOptions({
            method: isPresent$3(options) && isPresent$3(options.method) ? options.method : this.method,
            headers: isPresent$3(options) && isPresent$3(options.headers) ? options.headers : this.headers,
            body: isPresent$3(options) && isPresent$3(options.body) ? options.body : this.body,
            url: isPresent$3(options) && isPresent$3(options.url) ? options.url : this.url,
            search: isPresent$3(options) && isPresent$3(options.search) ?
                (isString$3(options.search) ? new URLSearchParams((options.search)) :
                    (options.search).clone()) :
                this.search,
            withCredentials: isPresent$3(options) && isPresent$3(options.withCredentials) ?
                options.withCredentials :
                this.withCredentials,
            responseType: isPresent$3(options) && isPresent$3(options.responseType) ? options.responseType :
                this.responseType
        });
    };
    return RequestOptions;
}());
/**
 * Subclass of {@link RequestOptions}, with default values.
 *
 * Default values:
 *  * method: {@link RequestMethod RequestMethod.Get}
 *  * headers: empty {@link Headers} object
 *
 * This class could be extended and bound to the {@link RequestOptions} class
 * when configuring an {@link Injector}, in order to override the default options
 * used by {@link Http} to create and send {@link Request Requests}.
 *
 * ### Example ([live demo](http://plnkr.co/edit/LEKVSx?p=preview))
 *
 * ```typescript
 * import {provide} from '@angular/core';
 * import {bootstrap} from '@angular/platform-browser/browser';
 * import {HTTP_PROVIDERS, Http, BaseRequestOptions, RequestOptions} from '@angular/http';
 * import {App} from './myapp';
 *
 * class MyOptions extends BaseRequestOptions {
 *   search: string = 'coreTeam=true';
 * }
 *
 * bootstrap(App, [HTTP_PROVIDERS, {provide: RequestOptions, useClass: MyOptions}]);
 * ```
 *
 * The options could also be extended when manually creating a {@link Request}
 * object.
 *
 * ### Example ([live demo](http://plnkr.co/edit/oyBoEvNtDhOSfi9YxaVb?p=preview))
 *
 * ```
 * import {BaseRequestOptions, Request, RequestMethod} from '@angular/http';
 *
 * var options = new BaseRequestOptions();
 * var req = new Request(options.merge({
 *   method: RequestMethod.Post,
 *   url: 'https://google.com'
 * }));
 * console.log('req.method:', RequestMethod[req.method]); // Post
 * console.log('options.url:', options.url); // null
 * console.log('req.url:', req.url); // https://google.com
 * ```
 *
 * @experimental
 */
var BaseRequestOptions = (function (_super) {
    __extends$40(BaseRequestOptions, _super);
    function BaseRequestOptions() {
        _super.call(this, { method: RequestMethod.Get, headers: new Headers() });
    }
    BaseRequestOptions.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BaseRequestOptions.ctorParameters = [];
    return BaseRequestOptions;
}(RequestOptions));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$42 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TODO(jeffbcross): properly implement body accessors
/**
 * Creates `Request` instances from provided values.
 *
 * The Request's interface is inspired by the Request constructor defined in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#request-class),
 * but is considered a static value whose body can be accessed many times. There are other
 * differences in the implementation, but this is the most significant.
 *
 * `Request` instances are typically created by higher-level classes, like {@link Http} and
 * {@link Jsonp}, but it may occasionally be useful to explicitly create `Request` instances.
 * One such example is when creating services that wrap higher-level services, like {@link Http},
 * where it may be useful to generate a `Request` with arbitrary headers and search params.
 *
 * ```typescript
 * import {Injectable, Injector} from '@angular/core';
 * import {HTTP_PROVIDERS, Http, Request, RequestMethod} from '@angular/http';
 *
 * @Injectable()
 * class AutoAuthenticator {
 *   constructor(public http:Http) {}
 *   request(url:string) {
 *     return this.http.request(new Request({
 *       method: RequestMethod.Get,
 *       url: url,
 *       search: 'password=123'
 *     }));
 *   }
 * }
 *
 * var injector = Injector.resolveAndCreate([HTTP_PROVIDERS, AutoAuthenticator]);
 * var authenticator = injector.get(AutoAuthenticator);
 * authenticator.request('people.json').subscribe(res => {
 *   //URL should have included '?password=123'
 *   console.log('people', res.json());
 * });
 * ```
 *
 * @experimental
 */
var Request = (function (_super) {
    __extends$42(Request, _super);
    function Request(requestOptions) {
        _super.call(this);
        // TODO: assert that url is present
        var url = requestOptions.url;
        this.url = requestOptions.url;
        if (isPresent$3(requestOptions.search)) {
            var search = requestOptions.search.toString();
            if (search.length > 0) {
                var prefix = '?';
                if (StringWrapper$3.contains(this.url, '?')) {
                    prefix = (this.url[this.url.length - 1] == '&') ? '' : '&';
                }
                // TODO: just delete search-query-looking string in url?
                this.url = url + prefix + search;
            }
        }
        this._body = requestOptions.body;
        this.method = normalizeMethodName(requestOptions.method);
        // TODO(jeffbcross): implement behavior
        // Defaults to 'omit', consistent with browser
        // TODO(jeffbcross): implement behavior
        this.headers = new Headers(requestOptions.headers);
        this.contentType = this.detectContentType();
        this.withCredentials = requestOptions.withCredentials;
        this.responseType = requestOptions.responseType;
    }
    /**
     * Returns the content type enum based on header options.
     */
    Request.prototype.detectContentType = function () {
        switch (this.headers.get('content-type')) {
            case 'application/json':
                return ContentType.JSON;
            case 'application/x-www-form-urlencoded':
                return ContentType.FORM;
            case 'multipart/form-data':
                return ContentType.FORM_DATA;
            case 'text/plain':
            case 'text/html':
                return ContentType.TEXT;
            case 'application/octet-stream':
                return ContentType.BLOB;
            default:
                return this.detectContentTypeFromBody();
        }
    };
    /**
     * Returns the content type of request's body based on its type.
     */
    Request.prototype.detectContentTypeFromBody = function () {
        if (this._body == null) {
            return ContentType.NONE;
        }
        else if (this._body instanceof URLSearchParams) {
            return ContentType.FORM;
        }
        else if (this._body instanceof FormData) {
            return ContentType.FORM_DATA;
        }
        else if (this._body instanceof Blob$1) {
            return ContentType.BLOB;
        }
        else if (this._body instanceof ArrayBuffer$1) {
            return ContentType.ARRAY_BUFFER;
        }
        else if (this._body && typeof this._body == 'object') {
            return ContentType.JSON;
        }
        else {
            return ContentType.TEXT;
        }
    };
    /**
     * Returns the request's body according to its type. If body is undefined, return
     * null.
     */
    Request.prototype.getBody = function () {
        switch (this.contentType) {
            case ContentType.JSON:
                return this.text();
            case ContentType.FORM:
                return this.text();
            case ContentType.FORM_DATA:
                return this._body;
            case ContentType.TEXT:
                return this.text();
            case ContentType.BLOB:
                return this.blob();
            case ContentType.ARRAY_BUFFER:
                return this.arrayBuffer();
            default:
                return null;
        }
    };
    return Request;
}(Body));
var noop$4 = function () { };
var w = typeof window == 'object' ? window : noop$4;
var FormData = w['FormData'] || noop$4;
var Blob$1 = w['Blob'] || noop$4;
var ArrayBuffer$1 = w['ArrayBuffer'] || noop$4;

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends$41 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function httpRequest(backend, request) {
    return backend.createConnection(request).response;
}
function mergeOptions(defaultOpts, providedOpts, method, url) {
    var newOptions = defaultOpts;
    if (isPresent$3(providedOpts)) {
        // Hack so Dart can used named parameters
        return newOptions.merge(new RequestOptions({
            method: providedOpts.method || method,
            url: providedOpts.url || url,
            search: providedOpts.search,
            headers: providedOpts.headers,
            body: providedOpts.body,
            withCredentials: providedOpts.withCredentials,
            responseType: providedOpts.responseType
        }));
    }
    if (isPresent$3(method)) {
        return newOptions.merge(new RequestOptions({ method: method, url: url }));
    }
    else {
        return newOptions.merge(new RequestOptions({ url: url }));
    }
}
/**
 * Performs http requests using `XMLHttpRequest` as the default backend.
 *
 * `Http` is available as an injectable class, with methods to perform http requests. Calling
 * `request` returns an `Observable` which will emit a single {@link Response} when a
 * response is received.
 *
 * ### Example
 *
 * ```typescript
 * import {Http, HTTP_PROVIDERS} from '@angular/http';
 * import 'rxjs/add/operator/map'
 * @Component({
 *   selector: 'http-app',
 *   viewProviders: [HTTP_PROVIDERS],
 *   templateUrl: 'people.html'
 * })
 * class PeopleComponent {
 *   constructor(http: Http) {
 *     http.get('people.json')
 *       // Call map on the response observable to get the parsed people object
 *       .map(res => res.json())
 *       // Subscribe to the observable to get the parsed people object and attach it to the
 *       // component
 *       .subscribe(people => this.people = people);
 *   }
 * }
 * ```
 *
 *
 * ### Example
 *
 * ```
 * http.get('people.json').subscribe((res:Response) => this.people = res.json());
 * ```
 *
 * The default construct used to perform requests, `XMLHttpRequest`, is abstracted as a "Backend" (
 * {@link XHRBackend} in this case), which could be mocked with dependency injection by replacing
 * the {@link XHRBackend} provider, as in the following example:
 *
 * ### Example
 *
 * ```typescript
 * import {BaseRequestOptions, Http} from '@angular/http';
 * import {MockBackend} from '@angular/http/testing';
 * var injector = Injector.resolveAndCreate([
 *   BaseRequestOptions,
 *   MockBackend,
 *   {provide: Http, useFactory:
 *       function(backend, defaultOptions) {
 *         return new Http(backend, defaultOptions);
 *       },
 *       deps: [MockBackend, BaseRequestOptions]}
 * ]);
 * var http = injector.get(Http);
 * http.get('request-from-mock-backend.json').subscribe((res:Response) => doSomething(res));
 * ```
 *
 * @experimental
 */
var Http = (function () {
    function Http(_backend, _defaultOptions) {
        this._backend = _backend;
        this._defaultOptions = _defaultOptions;
    }
    /**
     * Performs any type of http request. First argument is required, and can either be a url or
     * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
     * object can be provided as the 2nd argument. The options object will be merged with the values
     * of {@link BaseRequestOptions} before performing the request.
     */
    Http.prototype.request = function (url, options) {
        var responseObservable;
        if (isString$3(url)) {
            responseObservable = httpRequest(this._backend, new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Get, url)));
        }
        else if (url instanceof Request) {
            responseObservable = httpRequest(this._backend, url);
        }
        else {
            throw new Error('First argument must be a url string or Request instance.');
        }
        return responseObservable;
    };
    /**
     * Performs a request with `get` http method.
     */
    Http.prototype.get = function (url, options) {
        return httpRequest(this._backend, new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Get, url)));
    };
    /**
     * Performs a request with `post` http method.
     */
    Http.prototype.post = function (url, body, options) {
        return httpRequest(this._backend, new Request(mergeOptions(this._defaultOptions.merge(new RequestOptions({ body: body })), options, RequestMethod.Post, url)));
    };
    /**
     * Performs a request with `put` http method.
     */
    Http.prototype.put = function (url, body, options) {
        return httpRequest(this._backend, new Request(mergeOptions(this._defaultOptions.merge(new RequestOptions({ body: body })), options, RequestMethod.Put, url)));
    };
    /**
     * Performs a request with `delete` http method.
     */
    Http.prototype.delete = function (url, options) {
        return httpRequest(this._backend, new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Delete, url)));
    };
    /**
     * Performs a request with `patch` http method.
     */
    Http.prototype.patch = function (url, body, options) {
        return httpRequest(this._backend, new Request(mergeOptions(this._defaultOptions.merge(new RequestOptions({ body: body })), options, RequestMethod.Patch, url)));
    };
    /**
     * Performs a request with `head` http method.
     */
    Http.prototype.head = function (url, options) {
        return httpRequest(this._backend, new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Head, url)));
    };
    /**
     * Performs a request with `options` http method.
     */
    Http.prototype.options = function (url, options) {
        return httpRequest(this._backend, new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Options, url)));
    };
    Http.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Http.ctorParameters = [
        { type: ConnectionBackend, },
        { type: RequestOptions, },
    ];
    return Http;
}());
/**
 * @experimental
 */
var Jsonp = (function (_super) {
    __extends$41(Jsonp, _super);
    function Jsonp(backend, defaultOptions) {
        _super.call(this, backend, defaultOptions);
    }
    /**
     * Performs any type of http request. First argument is required, and can either be a url or
     * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
     * object can be provided as the 2nd argument. The options object will be merged with the values
     * of {@link BaseRequestOptions} before performing the request.
     *
     * @security Regular XHR is the safest alternative to JSONP for most applications, and is
     * supported by all current browsers. Because JSONP creates a `<script>` element with
     * contents retrieved from a remote source, attacker-controlled data introduced by an untrusted
     * source could expose your application to XSS risks. Data exposed by JSONP may also be
     * readable by malicious third-party websites. In addition, JSONP introduces potential risk for
     * future security issues (e.g. content sniffing).  For more detail, see the
     * [Security Guide](http://g.co/ng/security).
     */
    Jsonp.prototype.request = function (url, options) {
        var responseObservable;
        if (isString$3(url)) {
            url =
                new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Get, url));
        }
        if (url instanceof Request) {
            if (url.method !== RequestMethod.Get) {
                throw new Error('JSONP requests must use GET request method.');
            }
            responseObservable = httpRequest(this._backend, url);
        }
        else {
            throw new Error('First argument must be a url string or Request instance.');
        }
        return responseObservable;
    };
    Jsonp.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Jsonp.ctorParameters = [
        { type: ConnectionBackend, },
        { type: RequestOptions, },
    ];
    return Jsonp;
}(Http));

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function _createDefaultCookieXSRFStrategy() {
    return new CookieXSRFStrategy();
}
function httpFactory(xhrBackend, requestOptions) {
    return new Http(xhrBackend, requestOptions);
}
function jsonpFactory(jsonpBackend, requestOptions) {
    return new Jsonp(jsonpBackend, requestOptions);
}
/**
 * The module that includes http's providers
 *
 * @experimental
 */
var HttpModule = (function () {
    function HttpModule() {
    }
    HttpModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        // TODO(pascal): use factory type annotations once supported in DI
                        // issue: https://github.com/angular/angular/issues/3183
                        { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] },
                        BrowserXhr,
                        { provide: RequestOptions, useClass: BaseRequestOptions },
                        { provide: ResponseOptions, useClass: BaseResponseOptions },
                        XHRBackend,
                        { provide: XSRFStrategy, useFactory: _createDefaultCookieXSRFStrategy },
                    ],
                },] },
    ];
    /** @nocollapse */
    HttpModule.ctorParameters = [];
    return HttpModule;
}());
/**
 * The module that includes jsonp's providers
 *
 * @experimental
 */
var JsonpModule = (function () {
    function JsonpModule() {
    }
    JsonpModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        // TODO(pascal): use factory type annotations once supported in DI
                        // issue: https://github.com/angular/angular/issues/3183
                        { provide: Jsonp, useFactory: jsonpFactory, deps: [JSONPBackend, RequestOptions] },
                        BrowserJsonp,
                        { provide: RequestOptions, useClass: BaseRequestOptions },
                        { provide: ResponseOptions, useClass: BaseResponseOptions },
                        { provide: JSONPBackend, useClass: JSONPBackend_ },
                    ],
                },] },
    ];
    /** @nocollapse */
    JsonpModule.ctorParameters = [];
    return JsonpModule;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the http package.
 */



var index$1 = Object.freeze({
	BrowserXhr: BrowserXhr,
	JSONPBackend: JSONPBackend,
	JSONPConnection: JSONPConnection,
	CookieXSRFStrategy: CookieXSRFStrategy,
	XHRBackend: XHRBackend,
	XHRConnection: XHRConnection,
	BaseRequestOptions: BaseRequestOptions,
	RequestOptions: RequestOptions,
	BaseResponseOptions: BaseResponseOptions,
	ResponseOptions: ResponseOptions,
	get ReadyState () { return ReadyState; },
	get RequestMethod () { return RequestMethod; },
	get ResponseContentType () { return ResponseContentType; },
	get ResponseType () { return ResponseType; },
	Headers: Headers,
	Http: Http,
	Jsonp: Jsonp,
	HttpModule: HttpModule,
	JsonpModule: JsonpModule,
	Connection: Connection,
	ConnectionBackend: ConnectionBackend,
	XSRFStrategy: XSRFStrategy,
	Request: Request,
	Response: Response,
	QueryEncoder: QueryEncoder,
	URLSearchParams: URLSearchParams
});

var __extends$45 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1$5 = Subscription_1$2;
/**
 * A unit of work to be executed in a {@link Scheduler}. An action is typically
 * created from within a Scheduler and an RxJS user does not need to concern
 * themselves about creating and manipulating an Action.
 *
 * ```ts
 * class Action<T> extends Subscription {
 *   new (scheduler: Scheduler, work: (state?: T) => void);
 *   schedule(state?: T, delay: number = 0): Subscription;
 * }
 * ```
 *
 * @class Action<T>
 */
var Action = (function (_super) {
    __extends$45(Action, _super);
    function Action(scheduler, work) {
        _super.call(this);
    }
    /**
     * Schedules this action on its parent Scheduler for execution. May be passed
     * some context object, `state`. May happen at some point in the future,
     * according to the `delay` parameter, if specified.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler.
     * @return {void}
     */
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        return this;
    };
    return Action;
}(Subscription_1$5.Subscription));
var Action_2 = Action;

var Action_1$1 = {
	Action: Action_2
};

var __extends$44 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1$4 = root;
var Action_1 = Action_1$1;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AsyncAction = (function (_super) {
    __extends$44(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
        this.pending = false;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        // Always replace the current state with the new state.
        this.state = state;
        // Set the pending flag indicating that this action has been scheduled, or
        // has recursively rescheduled itself.
        this.pending = true;
        var id = this.id;
        var scheduler = this.scheduler;
        //
        // Important implementation note:
        //
        // Actions only execute once by default, unless rescheduled from within the
        // scheduled callback. This allows us to implement single and repeat
        // actions via the same code path, without adding API surface area, as well
        // as mimic traditional recursion but across asynchronous boundaries.
        //
        // However, JS runtimes and timers distinguish between intervals achieved by
        // serial `setTimeout` calls vs. a single `setInterval` call. An interval of
        // serial `setTimeout` calls can be individually delayed, which delays
        // scheduling the next `setTimeout`, and so on. `setInterval` attempts to
        // guarantee the interval callback will be invoked more precisely to the
        // interval period, regardless of load.
        //
        // Therefore, we use `setInterval` to schedule single and repeat actions.
        // If the action reschedules itself with the same delay, the interval is not
        // canceled. If the action doesn't reschedule, or reschedules with a
        // different delay, the interval will be canceled after scheduled callback
        // execution.
        //
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.delay = delay;
        // If this action has already an async Id, don't request a new one.
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        return root_1$4.root.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        // If this action is rescheduled with the same delay time, don't clear the interval id.
        if (delay !== null && this.delay === delay) {
            return id;
        }
        // Otherwise, if the action's delay time is different from the current delay,
        // clear the interval id
        return root_1$4.root.clearInterval(id) && undefined || undefined;
    };
    /**
     * Immediately executes this action and the `work` it contains.
     * @return {any}
     */
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            // Dequeue if the action didn't reschedule itself. Don't call
            // unsubscribe(), because the action could reschedule later.
            // For example:
            // ```
            // scheduler.schedule(function doWork(counter) {
            //   /* ... I'm a busy worker bee ... */
            //   var originalAction = this;
            //   /* wait 100ms before rescheduling the action */
            //   setTimeout(function () {
            //     originalAction.schedule(counter + 1);
            //   }, 100);
            // }, 1000);
            // ```
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, delay) {
        var errored = false;
        var errorValue = undefined;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = !!e && e || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype._unsubscribe = function () {
        var id = this.id;
        var scheduler = this.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        this.work = null;
        this.delay = null;
        this.state = null;
        this.pending = false;
        this.scheduler = null;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, null);
        }
    };
    return AsyncAction;
}(Action_1.Action));
var AsyncAction_2 = AsyncAction;

var AsyncAction_1$1 = {
	AsyncAction: AsyncAction_2
};

/**
 * An execution context and a data structure to order tasks and schedule their
 * execution. Provides a notion of (potentially virtual) time, through the
 * `now()` getter method.
 *
 * Each unit of work in a Scheduler is called an {@link Action}.
 *
 * ```ts
 * class Scheduler {
 *   now(): number;
 *   schedule(work, delay?, state?): Subscription;
 * }
 * ```
 *
 * @class Scheduler
 */
var Scheduler = (function () {
    function Scheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.SchedulerAction = SchedulerAction;
        this.now = now;
    }
    /**
     * Schedules a function, `work`, for execution. May happen at some point in
     * the future, according to the `delay` parameter, if specified. May be passed
     * some context object, `state`, which will be passed to the `work` function.
     *
     * The given arguments will be processed an stored as an Action object in a
     * queue of actions.
     *
     * @param {function(state: ?T): ?Subscription} work A function representing a
     * task, or some unit of work to be executed by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler itself.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @return {Subscription} A subscription in order to be able to unsubscribe
     * the scheduled work.
     */
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.SchedulerAction(this, work).schedule(state, delay);
    };
    Scheduler.now = Date.now ? Date.now : function () { return +new Date(); };
    return Scheduler;
}());
var Scheduler_2 = Scheduler;

var Scheduler_1$1 = {
	Scheduler: Scheduler_2
};

var __extends$46 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Scheduler_1 = Scheduler_1$1;
var AsyncScheduler = (function (_super) {
    __extends$46(AsyncScheduler, _super);
    function AsyncScheduler() {
        _super.apply(this, arguments);
        this.actions = [];
        /**
         * A flag to indicate whether the Scheduler is currently executing a batch of
         * queued actions.
         * @type {boolean}
         */
        this.active = false;
        /**
         * An internal ID used to track the latest asynchronous task such as those
         * coming from `setTimeout`, `setInterval`, `requestAnimationFrame`, and
         * others.
         * @type {any}
         */
        this.scheduled = undefined;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this.active) {
            actions.push(action);
            return;
        }
        var error;
        this.active = true;
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (action = actions.shift()); // exhaust the scheduler queue
        this.active = false;
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler_1.Scheduler));
var AsyncScheduler_2 = AsyncScheduler;

var AsyncScheduler_1$1 = {
	AsyncScheduler: AsyncScheduler_2
};

var AsyncAction_1 = AsyncAction_1$1;
var AsyncScheduler_1 = AsyncScheduler_1$1;
var async_1$1 = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);

var async = {
	async: async_1$1
};

function isDate$4(value) {
    return value instanceof Date && !isNaN(+value);
}
var isDate_2 = isDate$4;

var isDate_1$1 = {
	isDate: isDate_2
};

var Observable_1$4 = Observable_1$1;
/**
 * Represents a push-based event or value that an {@link Observable} can emit.
 * This class is particularly useful for operators that manage notifications,
 * like {@link materialize}, {@link dematerialize}, {@link observeOn}, and
 * others. Besides wrapping the actual delivered value, it also annotates it
 * with metadata of, for instance, what type of push message it is (`next`,
 * `error`, or `complete`).
 *
 * @see {@link materialize}
 * @see {@link dematerialize}
 * @see {@link observeOn}
 *
 * @class Notification<T>
 */
var Notification = (function () {
    function Notification(kind, value, exception) {
        this.kind = kind;
        this.value = value;
        this.exception = exception;
        this.hasValue = kind === 'N';
    }
    /**
     * Delivers to the given `observer` the value wrapped by this Notification.
     * @param {Observer} observer
     * @return
     */
    Notification.prototype.observe = function (observer) {
        switch (this.kind) {
            case 'N':
                return observer.next && observer.next(this.value);
            case 'E':
                return observer.error && observer.error(this.exception);
            case 'C':
                return observer.complete && observer.complete();
        }
    };
    /**
     * Given some {@link Observer} callbacks, deliver the value represented by the
     * current Notification to the correctly corresponding callback.
     * @param {function(value: T): void} next An Observer `next` callback.
     * @param {function(err: any): void} [error] An Observer `error` callback.
     * @param {function(): void} [complete] An Observer `complete` callback.
     * @return {any}
     */
    Notification.prototype.do = function (next, error, complete) {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return next && next(this.value);
            case 'E':
                return error && error(this.exception);
            case 'C':
                return complete && complete();
        }
    };
    /**
     * Takes an Observer or its individual callback functions, and calls `observe`
     * or `do` methods accordingly.
     * @param {Observer|function(value: T): void} nextOrObserver An Observer or
     * the `next` callback.
     * @param {function(err: any): void} [error] An Observer `error` callback.
     * @param {function(): void} [complete] An Observer `complete` callback.
     * @return {any}
     */
    Notification.prototype.accept = function (nextOrObserver, error, complete) {
        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
            return this.observe(nextOrObserver);
        }
        else {
            return this.do(nextOrObserver, error, complete);
        }
    };
    /**
     * Returns a simple Observable that just delivers the notification represented
     * by this Notification instance.
     * @return {any}
     */
    Notification.prototype.toObservable = function () {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return Observable_1$4.Observable.of(this.value);
            case 'E':
                return Observable_1$4.Observable.throw(this.exception);
            case 'C':
                return Observable_1$4.Observable.empty();
        }
        throw new Error('unexpected notification kind value');
    };
    /**
     * A shortcut to create a Notification instance of the type `next` from a
     * given value.
     * @param {T} value The `next` value.
     * @return {Notification<T>} The "next" Notification representing the
     * argument.
     */
    Notification.createNext = function (value) {
        if (typeof value !== 'undefined') {
            return new Notification('N', value);
        }
        return this.undefinedValueNotification;
    };
    /**
     * A shortcut to create a Notification instance of the type `error` from a
     * given error.
     * @param {any} [err] The `error` exception.
     * @return {Notification<T>} The "error" Notification representing the
     * argument.
     */
    Notification.createError = function (err) {
        return new Notification('E', undefined, err);
    };
    /**
     * A shortcut to create a Notification instance of the type `complete`.
     * @return {Notification<any>} The valueless "complete" Notification.
     */
    Notification.createComplete = function () {
        return this.completeNotification;
    };
    Notification.completeNotification = new Notification('C');
    Notification.undefinedValueNotification = new Notification('N', undefined);
    return Notification;
}());
var Notification_2 = Notification;

var Notification_1$1 = {
	Notification: Notification_2
};

var __extends$43 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var async_1 = async;
var isDate_1 = isDate_1$1;
var Subscriber_1$4 = Subscriber_1$2;
var Notification_1 = Notification_1$1;
/**
 * Delays the emission of items from the source Observable by a given timeout or
 * until a given Date.
 *
 * <span class="informal">Time shifts each item by some specified amount of
 * milliseconds.</span>
 *
 * <img src="./img/delay.png" width="100%">
 *
 * If the delay argument is a Number, this operator time shifts the source
 * Observable by that amount of time expressed in milliseconds. The relative
 * time intervals between the values are preserved.
 *
 * If the delay argument is a Date, this operator time shifts the start of the
 * Observable execution until the given date occurs.
 *
 * @example <caption>Delay each click by one second</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var delayedClicks = clicks.delay(1000); // each click emitted after 1 second
 * delayedClicks.subscribe(x => console.log(x));
 *
 * @example <caption>Delay all clicks until a future date happens</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var date = new Date('March 15, 2050 12:00:00'); // in the future
 * var delayedClicks = clicks.delay(date); // click emitted only after that date
 * delayedClicks.subscribe(x => console.log(x));
 *
 * @see {@link debounceTime}
 * @see {@link delayWhen}
 *
 * @param {number|Date} delay The delay duration in milliseconds (a `number`) or
 * a `Date` until which the emission of the source items is delayed.
 * @param {Scheduler} [scheduler=async] The Scheduler to use for
 * managing the timers that handle the time-shift for each item.
 * @return {Observable} An Observable that delays the emissions of the source
 * Observable by the specified timeout or Date.
 * @method delay
 * @owner Observable
 */
function delay$2(delay, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    var absoluteDelay = isDate_1.isDate(delay);
    var delayFor = absoluteDelay ? (+delay - scheduler.now()) : Math.abs(delay);
    return this.lift(new DelayOperator(delayFor, scheduler));
}
var delay_2 = delay$2;
var DelayOperator = (function () {
    function DelayOperator(delay, scheduler) {
        this.delay = delay;
        this.scheduler = scheduler;
    }
    DelayOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new DelaySubscriber(subscriber, this.delay, this.scheduler));
    };
    return DelayOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DelaySubscriber = (function (_super) {
    __extends$43(DelaySubscriber, _super);
    function DelaySubscriber(destination, delay, scheduler) {
        _super.call(this, destination);
        this.delay = delay;
        this.scheduler = scheduler;
        this.queue = [];
        this.active = false;
        this.errored = false;
    }
    DelaySubscriber.dispatch = function (state) {
        var source = state.source;
        var queue = source.queue;
        var scheduler = state.scheduler;
        var destination = state.destination;
        while (queue.length > 0 && (queue[0].time - scheduler.now()) <= 0) {
            queue.shift().notification.observe(destination);
        }
        if (queue.length > 0) {
            var delay_1 = Math.max(0, queue[0].time - scheduler.now());
            this.schedule(state, delay_1);
        }
        else {
            source.active = false;
        }
    };
    DelaySubscriber.prototype._schedule = function (scheduler) {
        this.active = true;
        this.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
            source: this, destination: this.destination, scheduler: scheduler
        }));
    };
    DelaySubscriber.prototype.scheduleNotification = function (notification) {
        if (this.errored === true) {
            return;
        }
        var scheduler = this.scheduler;
        var message = new DelayMessage(scheduler.now() + this.delay, notification);
        this.queue.push(message);
        if (this.active === false) {
            this._schedule(scheduler);
        }
    };
    DelaySubscriber.prototype._next = function (value) {
        this.scheduleNotification(Notification_1.Notification.createNext(value));
    };
    DelaySubscriber.prototype._error = function (err) {
        this.errored = true;
        this.queue = [];
        this.destination.error(err);
    };
    DelaySubscriber.prototype._complete = function () {
        this.scheduleNotification(Notification_1.Notification.createComplete());
    };
    return DelaySubscriber;
}(Subscriber_1$4.Subscriber));
var DelayMessage = (function () {
    function DelayMessage(time, notification) {
        this.time = time;
        this.notification = notification;
    }
    return DelayMessage;
}());

var delay_1$1 = {
	delay: delay_2
};

var Observable_1$3 = Observable_1$1;
var delay_1 = delay_1$1;
Observable_1$3.Observable.prototype.delay = delay_1.delay;

var STATUS = {
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,
    MULTIPLE_CHOICES: 300,
    MOVED_PERMANTENTLY: 301,
    FOUND: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    USE_PROXY: 305,
    TEMPORARY_REDIRECT: 307,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    PAYLOAD_TO_LARGE: 413,
    URI_TOO_LONG: 414,
    UNSUPPORTED_MEDIA_TYPE: 415,
    RANGE_NOT_SATISFIABLE: 416,
    EXPECTATION_FAILED: 417,
    IM_A_TEAPOT: 418,
    UPGRADE_REQUIRED: 426,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505,
    PROCESSING: 102,
    MULTI_STATUS: 207,
    IM_USED: 226,
    PERMANENT_REDIRECT: 308,
    UNPROCESSABLE_ENTRY: 422,
    LOCKED: 423,
    FAILED_DEPENDENCY: 424,
    PRECONDITION_REQUIRED: 428,
    TOO_MANY_REQUESTS: 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
    UNAVAILABLE_FOR_LEGAL_REASONS: 451,
    VARIANT_ALSO_NEGOTIATES: 506,
    INSUFFICIENT_STORAGE: 507,
    NETWORK_AUTHENTICATION_REQUIRED: 511
};
/*tslint:disable:quotemark max-line-length one-line */
var STATUS_CODE_INFO = {
    "100": {
        "code": 100,
        "text": "Continue",
        "description": "\"The initial part of a request has been received and has not yet been rejected by the server.\"",
        "spec_title": "RFC7231#6.2.1",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.2.1"
    },
    "101": {
        "code": 101,
        "text": "Switching Protocols",
        "description": "\"The server understands and is willing to comply with the client's request, via the Upgrade header field, for a change in the application protocol being used on this connection.\"",
        "spec_title": "RFC7231#6.2.2",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.2.2"
    },
    "200": {
        "code": 200,
        "text": "OK",
        "description": "\"The request has succeeded.\"",
        "spec_title": "RFC7231#6.3.1",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.3.1"
    },
    "201": {
        "code": 201,
        "text": "Created",
        "description": "\"The request has been fulfilled and has resulted in one or more new resources being created.\"",
        "spec_title": "RFC7231#6.3.2",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.3.2"
    },
    "202": {
        "code": 202,
        "text": "Accepted",
        "description": "\"The request has been accepted for processing, but the processing has not been completed.\"",
        "spec_title": "RFC7231#6.3.3",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.3.3"
    },
    "203": {
        "code": 203,
        "text": "Non-Authoritative Information",
        "description": "\"The request was successful but the enclosed payload has been modified from that of the origin server's 200 (OK) response by a transforming proxy.\"",
        "spec_title": "RFC7231#6.3.4",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.3.4"
    },
    "204": {
        "code": 204,
        "text": "No Content",
        "description": "\"The server has successfully fulfilled the request and that there is no additional content to send in the response payload body.\"",
        "spec_title": "RFC7231#6.3.5",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.3.5"
    },
    "205": {
        "code": 205,
        "text": "Reset Content",
        "description": "\"The server has fulfilled the request and desires that the user agent reset the \"document view\", which caused the request to be sent, to its original state as received from the origin server.\"",
        "spec_title": "RFC7231#6.3.6",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.3.6"
    },
    "206": {
        "code": 206,
        "text": "Partial Content",
        "description": "\"The server is successfully fulfilling a range request for the target resource by transferring one or more parts of the selected representation that correspond to the satisfiable ranges found in the requests's Range header field.\"",
        "spec_title": "RFC7233#4.1",
        "spec_href": "http://tools.ietf.org/html/rfc7233#section-4.1"
    },
    "300": {
        "code": 300,
        "text": "Multiple Choices",
        "description": "\"The target resource has more than one representation, each with its own more specific identifier, and information about the alternatives is being provided so that the user (or user agent) can select a preferred representation by redirecting its request to one or more of those identifiers.\"",
        "spec_title": "RFC7231#6.4.1",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.4.1"
    },
    "301": {
        "code": 301,
        "text": "Moved Permanently",
        "description": "\"The target resource has been assigned a new permanent URI and any future references to this resource ought to use one of the enclosed URIs.\"",
        "spec_title": "RFC7231#6.4.2",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.4.2"
    },
    "302": {
        "code": 302,
        "text": "Found",
        "description": "\"The target resource resides temporarily under a different URI.\"",
        "spec_title": "RFC7231#6.4.3",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.4.3"
    },
    "303": {
        "code": 303,
        "text": "See Other",
        "description": "\"The server is redirecting the user agent to a different resource, as indicated by a URI in the Location header field, that is intended to provide an indirect response to the original request.\"",
        "spec_title": "RFC7231#6.4.4",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.4.4"
    },
    "304": {
        "code": 304,
        "text": "Not Modified",
        "description": "\"A conditional GET request has been received and would have resulted in a 200 (OK) response if it were not for the fact that the condition has evaluated to false.\"",
        "spec_title": "RFC7232#4.1",
        "spec_href": "http://tools.ietf.org/html/rfc7232#section-4.1"
    },
    "305": {
        "code": 305,
        "text": "Use Proxy",
        "description": "*deprecated*",
        "spec_title": "RFC7231#6.4.5",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.4.5"
    },
    "307": {
        "code": 307,
        "text": "Temporary Redirect",
        "description": "\"The target resource resides temporarily under a different URI and the user agent MUST NOT change the request method if it performs an automatic redirection to that URI.\"",
        "spec_title": "RFC7231#6.4.7",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.4.7"
    },
    "400": {
        "code": 400,
        "text": "Bad Request",
        "description": "\"The server cannot or will not process the request because the received syntax is invalid, nonsensical, or exceeds some limitation on what the server is willing to process.\"",
        "spec_title": "RFC7231#6.5.1",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.1"
    },
    "401": {
        "code": 401,
        "text": "Unauthorized",
        "description": "\"The request has not been applied because it lacks valid authentication credentials for the target resource.\"",
        "spec_title": "RFC7235#6.3.1",
        "spec_href": "http://tools.ietf.org/html/rfc7235#section-3.1"
    },
    "402": {
        "code": 402,
        "text": "Payment Required",
        "description": "*reserved*",
        "spec_title": "RFC7231#6.5.2",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.2"
    },
    "403": {
        "code": 403,
        "text": "Forbidden",
        "description": "\"The server understood the request but refuses to authorize it.\"",
        "spec_title": "RFC7231#6.5.3",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.3"
    },
    "404": {
        "code": 404,
        "text": "Not Found",
        "description": "\"The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.\"",
        "spec_title": "RFC7231#6.5.4",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.4"
    },
    "405": {
        "code": 405,
        "text": "Method Not Allowed",
        "description": "\"The method specified in the request-line is known by the origin server but not supported by the target resource.\"",
        "spec_title": "RFC7231#6.5.5",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.5"
    },
    "406": {
        "code": 406,
        "text": "Not Acceptable",
        "description": "\"The target resource does not have a current representation that would be acceptable to the user agent, according to the proactive negotiation header fields received in the request, and the server is unwilling to supply a default representation.\"",
        "spec_title": "RFC7231#6.5.6",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.6"
    },
    "407": {
        "code": 407,
        "text": "Proxy Authentication Required",
        "description": "\"The client needs to authenticate itself in order to use a proxy.\"",
        "spec_title": "RFC7231#6.3.2",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.3.2"
    },
    "408": {
        "code": 408,
        "text": "Request Timeout",
        "description": "\"The server did not receive a complete request message within the time that it was prepared to wait.\"",
        "spec_title": "RFC7231#6.5.7",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.7"
    },
    "409": {
        "code": 409,
        "text": "Conflict",
        "description": "\"The request could not be completed due to a conflict with the current state of the resource.\"",
        "spec_title": "RFC7231#6.5.8",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.8"
    },
    "410": {
        "code": 410,
        "text": "Gone",
        "description": "\"Access to the target resource is no longer available at the origin server and that this condition is likely to be permanent.\"",
        "spec_title": "RFC7231#6.5.9",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.9"
    },
    "411": {
        "code": 411,
        "text": "Length Required",
        "description": "\"The server refuses to accept the request without a defined Content-Length.\"",
        "spec_title": "RFC7231#6.5.10",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.10"
    },
    "412": {
        "code": 412,
        "text": "Precondition Failed",
        "description": "\"One or more preconditions given in the request header fields evaluated to false when tested on the server.\"",
        "spec_title": "RFC7232#4.2",
        "spec_href": "http://tools.ietf.org/html/rfc7232#section-4.2"
    },
    "413": {
        "code": 413,
        "text": "Payload Too Large",
        "description": "\"The server is refusing to process a request because the request payload is larger than the server is willing or able to process.\"",
        "spec_title": "RFC7231#6.5.11",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.11"
    },
    "414": {
        "code": 414,
        "text": "URI Too Long",
        "description": "\"The server is refusing to service the request because the request-target is longer than the server is willing to interpret.\"",
        "spec_title": "RFC7231#6.5.12",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.12"
    },
    "415": {
        "code": 415,
        "text": "Unsupported Media Type",
        "description": "\"The origin server is refusing to service the request because the payload is in a format not supported by the target resource for this method.\"",
        "spec_title": "RFC7231#6.5.13",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.13"
    },
    "416": {
        "code": 416,
        "text": "Range Not Satisfiable",
        "description": "\"None of the ranges in the request's Range header field overlap the current extent of the selected resource or that the set of ranges requested has been rejected due to invalid ranges or an excessive request of small or overlapping ranges.\"",
        "spec_title": "RFC7233#4.4",
        "spec_href": "http://tools.ietf.org/html/rfc7233#section-4.4"
    },
    "417": {
        "code": 417,
        "text": "Expectation Failed",
        "description": "\"The expectation given in the request's Expect header field could not be met by at least one of the inbound servers.\"",
        "spec_title": "RFC7231#6.5.14",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.14"
    },
    "418": {
        "code": 418,
        "text": "I'm a teapot",
        "description": "\"1988 April Fools Joke. Returned by tea pots requested to brew coffee.\"",
        "spec_title": "RFC 2324",
        "spec_href": "https://tools.ietf.org/html/rfc2324"
    },
    "426": {
        "code": 426,
        "text": "Upgrade Required",
        "description": "\"The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol.\"",
        "spec_title": "RFC7231#6.5.15",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.5.15"
    },
    "500": {
        "code": 500,
        "text": "Internal Server Error",
        "description": "\"The server encountered an unexpected condition that prevented it from fulfilling the request.\"",
        "spec_title": "RFC7231#6.6.1",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.6.1"
    },
    "501": {
        "code": 501,
        "text": "Not Implemented",
        "description": "\"The server does not support the functionality required to fulfill the request.\"",
        "spec_title": "RFC7231#6.6.2",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.6.2"
    },
    "502": {
        "code": 502,
        "text": "Bad Gateway",
        "description": "\"The server, while acting as a gateway or proxy, received an invalid response from an inbound server it accessed while attempting to fulfill the request.\"",
        "spec_title": "RFC7231#6.6.3",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.6.3"
    },
    "503": {
        "code": 503,
        "text": "Service Unavailable",
        "description": "\"The server is currently unable to handle the request due to a temporary overload or scheduled maintenance, which will likely be alleviated after some delay.\"",
        "spec_title": "RFC7231#6.6.4",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.6.4"
    },
    "504": {
        "code": 504,
        "text": "Gateway Time-out",
        "description": "\"The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server it needed to access in order to complete the request.\"",
        "spec_title": "RFC7231#6.6.5",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.6.5"
    },
    "505": {
        "code": 505,
        "text": "HTTP Version Not Supported",
        "description": "\"The server does not support, or refuses to support, the protocol version that was used in the request message.\"",
        "spec_title": "RFC7231#6.6.6",
        "spec_href": "http://tools.ietf.org/html/rfc7231#section-6.6.6"
    },
    "102": {
        "code": 102,
        "text": "Processing",
        "description": "\"An interim response to inform the client that the server has accepted the complete request, but has not yet completed it.\"",
        "spec_title": "RFC5218#10.1",
        "spec_href": "http://tools.ietf.org/html/rfc2518#section-10.1"
    },
    "207": {
        "code": 207,
        "text": "Multi-Status",
        "description": "\"Status for multiple independent operations.\"",
        "spec_title": "RFC5218#10.2",
        "spec_href": "http://tools.ietf.org/html/rfc2518#section-10.2"
    },
    "226": {
        "code": 226,
        "text": "IM Used",
        "description": "\"The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.\"",
        "spec_title": "RFC3229#10.4.1",
        "spec_href": "http://tools.ietf.org/html/rfc3229#section-10.4.1"
    },
    "308": {
        "code": 308,
        "text": "Permanent Redirect",
        "description": "\"The target resource has been assigned a new permanent URI and any future references to this resource SHOULD use one of the returned URIs. [...] This status code is similar to 301 Moved Permanently (Section 7.3.2 of rfc7231), except that it does not allow rewriting the request method from POST to GET.\"",
        "spec_title": "RFC7238",
        "spec_href": "http://tools.ietf.org/html/rfc7238"
    },
    "422": {
        "code": 422,
        "text": "Unprocessable Entity",
        "description": "\"The server understands the content type of the request entity (hence a 415(Unsupported Media Type) status code is inappropriate), and the syntax of the request entity is correct (thus a 400 (Bad Request) status code is inappropriate) but was unable to process the contained instructions.\"",
        "spec_title": "RFC5218#10.3",
        "spec_href": "http://tools.ietf.org/html/rfc2518#section-10.3"
    },
    "423": {
        "code": 423,
        "text": "Locked",
        "description": "\"The source or destination resource of a method is locked.\"",
        "spec_title": "RFC5218#10.4",
        "spec_href": "http://tools.ietf.org/html/rfc2518#section-10.4"
    },
    "424": {
        "code": 424,
        "text": "Failed Dependency",
        "description": "\"The method could not be performed on the resource because the requested action depended on another action and that action failed.\"",
        "spec_title": "RFC5218#10.5",
        "spec_href": "http://tools.ietf.org/html/rfc2518#section-10.5"
    },
    "428": {
        "code": 428,
        "text": "Precondition Required",
        "description": "\"The origin server requires the request to be conditional.\"",
        "spec_title": "RFC6585#3",
        "spec_href": "http://tools.ietf.org/html/rfc6585#section-3"
    },
    "429": {
        "code": 429,
        "text": "Too Many Requests",
        "description": "\"The user has sent too many requests in a given amount of time (\"rate limiting\").\"",
        "spec_title": "RFC6585#4",
        "spec_href": "http://tools.ietf.org/html/rfc6585#section-4"
    },
    "431": {
        "code": 431,
        "text": "Request Header Fields Too Large",
        "description": "\"The server is unwilling to process the request because its header fields are too large.\"",
        "spec_title": "RFC6585#5",
        "spec_href": "http://tools.ietf.org/html/rfc6585#section-5"
    },
    "451": {
        "code": 451,
        "text": "Unavailable For Legal Reasons",
        "description": "\"The server is denying access to the resource in response to a legal demand.\"",
        "spec_title": "draft-ietf-httpbis-legally-restricted-status",
        "spec_href": "http://tools.ietf.org/html/draft-ietf-httpbis-legally-restricted-status"
    },
    "506": {
        "code": 506,
        "text": "Variant Also Negotiates",
        "description": "\"The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.\"",
        "spec_title": "RFC2295#8.1",
        "spec_href": "http://tools.ietf.org/html/rfc2295#section-8.1"
    },
    "507": {
        "code": 507,
        "text": "Insufficient Storage",
        "description": "\The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.\"",
        "spec_title": "RFC5218#10.6",
        "spec_href": "http://tools.ietf.org/html/rfc2518#section-10.6"
    },
    "511": {
        "code": 511,
        "text": "Network Authentication Required",
        "description": "\"The client needs to authenticate to gain network access.\"",
        "spec_title": "RFC6585#6",
        "spec_href": "http://tools.ietf.org/html/rfc6585#section-6"
    }
};

var httpStatusCodes = {
	STATUS: STATUS,
	STATUS_CODE_INFO: STATUS_CODE_INFO
};

var require$$4$1 = ( index && index['default'] ) || index;

var require$$3$2 = ( index$1 && index$1['default'] ) || index$1;

var inMemoryBackend_service = createCommonjsModule(function (module, exports) {
"use strict";
var core_1 = require$$4$1;
var http_1 = require$$3$2;
var Observable_1 = Observable_1$1;

var http_status_codes_1 = httpStatusCodes;
/**
* Interface for a class that creates an in-memory database
*
* Its `createDb` method creates a hash of named collections that represents the database
*
* For maximum flexibility, the service may define HTTP method overrides.
* Such methods must match the spelling of an HTTP method in lower case (e.g, "get").
* If a request has a matching method, it will be called as in
* `get(info: requestInfo, db: {})` where `db` is the database object described above.
*/
var InMemoryDbService = (function () {
    function InMemoryDbService() {
    }
    return InMemoryDbService;
}());
exports.InMemoryDbService = InMemoryDbService;
/**
*  InMemoryBackendService configuration options
*  Usage:
*    InMemoryWebApiModule.forRoot(InMemHeroService, {delay: 600})
*
*  or if providing separately:
*    provide(InMemoryBackendConfig, {useValue: {delay: 600}}),
*/
var InMemoryBackendConfig = (function () {
    function InMemoryBackendConfig(config) {
        if (config === void 0) { config = {}; }
        Object.assign(this, {
            // default config:
            caseSensitiveSearch: false,
            defaultResponseOptions: new http_1.BaseResponseOptions(),
            delay: 500,
            delete404: false,
            passThruUnknownUrl: false,
            host: '',
            rootPath: ''
        }, config);
    }
    return InMemoryBackendConfig;
}());
exports.InMemoryBackendConfig = InMemoryBackendConfig;
exports.isSuccess = function (status) { return (status >= 200 && status < 300); };
/**
 * Simulate the behavior of a RESTy web api
 * backed by the simple in-memory data store provided by the injected InMemoryDataService service.
 * Conforms mostly to behavior described here:
 * http://www.restapitutorial.com/lessons/httpmethods.html
 *
 * ### Usage
 *
 * Create `InMemoryDataService` class that implements `InMemoryDataService`.
 * Call `forRoot` static method with this service class and optional configuration object:
 * ```
 * // other imports
 * import { HttpModule }           from '@angular/http';
 * import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
 *
 * import { InMemHeroService, inMemConfig } from '../api/in-memory-hero.service';
 * @NgModule({
 *  imports: [
 *    HttpModule,
 *    InMemoryWebApiModule.forRoot(InMemHeroService, inMemConfig),
 *    ...
 *  ],
 *  ...
 * })
 * export class AppModule { ... }
 * ```
 */
var InMemoryBackendService = (function () {
    function InMemoryBackendService(injector, inMemDbService, config) {
        this.injector = injector;
        this.inMemDbService = inMemDbService;
        this.config = new InMemoryBackendConfig();
        this.resetDb();
        var loc = this.getLocation('./');
        this.config.host = loc.host;
        this.config.rootPath = loc.pathname;
        Object.assign(this.config, config || {});
        this.setPassThruBackend();
    }
    InMemoryBackendService.prototype.createConnection = function (req) {
        var response = this.handleRequest(req);
        return {
            readyState: http_1.ReadyState.Done,
            request: req,
            response: response
        };
    };
    ////  protected /////
    /**
     * Process Request and return an Observable of Http Response object
     * in the manner of a RESTy web api.
     *
     * Expect URI pattern in the form :base/:collectionName/:id?
     * Examples:
     *   // for store with a 'characters' collection
     *   GET api/characters          // all characters
     *   GET api/characters/42       // the character with id=42
     *   GET api/characters?name=^j  // 'j' is a regex; returns characters whose name starts with 'j' or 'J'
     *   GET api/characters.json/42  // ignores the ".json"
     *
     * Also accepts
     *   "commands":
     *     POST "resetDb",
     *     GET/POST "config"" - get or (re)set the config
     *
     *   HTTP overrides:
     *     If the injected inMemDbService defines an HTTP method (lowercase)
     *     The request is forwarded to that method as in
     *     `inMemDbService.get(httpMethodInterceptorArgs)`
     *     which must return an `Observable<Response>`
     */
    InMemoryBackendService.prototype.handleRequest = function (req) {
        var _a = this.parseUrl(req.url), base = _a.base, collectionName = _a.collectionName, id = _a.id, resourceUrl = _a.resourceUrl, query = _a.query;
        var collection = this.db[collectionName];
        var reqInfo = {
            req: req,
            base: base,
            collection: collection,
            collectionName: collectionName,
            headers: new http_1.Headers({ 'Content-Type': 'application/json' }),
            id: this.parseId(collection, id),
            query: query,
            resourceUrl: resourceUrl
        };
        var reqMethodName = http_1.RequestMethod[req.method || 0].toLowerCase();
        var resOptions;
        try {
            if ('commands' === reqInfo.base.toLowerCase()) {
                return this.commands(reqInfo);
            }
            else if (this.inMemDbService[reqMethodName]) {
                // If service has an interceptor for an HTTP method, call it
                var interceptorArgs = {
                    requestInfo: reqInfo,
                    db: this.db,
                    config: this.config,
                    passThruBackend: this.passThruBackend
                };
                // The result which must be Observable<Response>
                return this.inMemDbService[reqMethodName](interceptorArgs);
            }
            else if (reqInfo.collection) {
                return this.collectionHandler(reqInfo);
            }
            else if (this.passThruBackend) {
                // Passes request thru to a "real" backend which returns an Observable<Response>
                // BAIL OUT with this Observable<Response>
                return this.passThruBackend.createConnection(req).response;
            }
            else {
                resOptions = this.createErrorResponse(http_status_codes_1.STATUS.NOT_FOUND, "Collection '" + collectionName + "' not found");
                return this.createObservableResponse(resOptions);
            }
        }
        catch (error) {
            var err = error.message || error;
            resOptions = this.createErrorResponse(http_status_codes_1.STATUS.INTERNAL_SERVER_ERROR, "" + err);
            return this.createObservableResponse(resOptions);
        }
    };
    /**
     * Apply query/search parameters as a filter over the collection
     * This impl only supports RegExp queries on string properties of the collection
     * ANDs the conditions together
     */
    InMemoryBackendService.prototype.applyQuery = function (collection, query) {
        // extract filtering conditions - {propertyName, RegExps) - from query/search parameters
        var conditions = [];
        var caseSensitive = this.config.caseSensitiveSearch ? undefined : 'i';
        query.paramsMap.forEach(function (value, name) {
            value.forEach(function (v) { return conditions.push({ name: name, rx: new RegExp(decodeURI(v), caseSensitive) }); });
        });
        var len = conditions.length;
        if (!len) {
            return collection;
        }
        // AND the RegExp conditions
        return collection.filter(function (row) {
            var ok = true;
            var i = len;
            while (ok && i) {
                i -= 1;
                var cond = conditions[i];
                ok = cond.rx.test(row[cond.name]);
            }
            return ok;
        });
    };
    InMemoryBackendService.prototype.clone = function (data) {
        return JSON.parse(JSON.stringify(data));
    };
    InMemoryBackendService.prototype.collectionHandler = function (reqInfo) {
        var req = reqInfo.req;
        var resOptions;
        switch (req.method) {
            case http_1.RequestMethod.Get:
                resOptions = this.get(reqInfo);
                break;
            case http_1.RequestMethod.Post:
                resOptions = this.post(reqInfo);
                break;
            case http_1.RequestMethod.Put:
                resOptions = this.put(reqInfo);
                break;
            case http_1.RequestMethod.Delete:
                resOptions = this.delete(reqInfo);
                break;
            default:
                resOptions = this.createErrorResponse(http_status_codes_1.STATUS.METHOD_NOT_ALLOWED, 'Method not allowed');
                break;
        }
        return this.createObservableResponse(resOptions);
    };
    /**
     * When the `base`="commands", the `collectionName` is the command
     * Example URLs:
     *   commands/resetdb   // Reset the "database" to its original state
     *   commands/config (GET) // Return this service's config object
     *   commands/config (!GET) // Update the config (e.g. delay)
     *
     * Usage:
     *   http.post('commands/resetdb', null);
     *   http.get('commands/config');
     *   http.post('commands/config', '{"delay":1000}');
     */
    InMemoryBackendService.prototype.commands = function (reqInfo) {
        var command = reqInfo.collectionName.toLowerCase();
        var method = reqInfo.req.method;
        var resOptions;
        switch (command) {
            case 'resetdb':
                this.resetDb();
                resOptions = new http_1.ResponseOptions({ status: http_status_codes_1.STATUS.OK });
                break;
            case 'config':
                if (method === http_1.RequestMethod.Get) {
                    resOptions = new http_1.ResponseOptions({
                        body: this.clone(this.config),
                        status: http_status_codes_1.STATUS.OK
                    });
                }
                else {
                    // Be nice ... any other method is a config update
                    var body = JSON.parse(reqInfo.req.text() || '{}');
                    Object.assign(this.config, body);
                    this.setPassThruBackend();
                    resOptions = new http_1.ResponseOptions({ status: http_status_codes_1.STATUS.NO_CONTENT });
                }
                break;
            default:
                resOptions = this.createErrorResponse(http_status_codes_1.STATUS.INTERNAL_SERVER_ERROR, "Unknown command \"" + command + "\"");
        }
        return this.createObservableResponse(resOptions);
    };
    InMemoryBackendService.prototype.createErrorResponse = function (status, message) {
        return new http_1.ResponseOptions({
            body: { 'error': "" + message },
            headers: new http_1.Headers({ 'Content-Type': 'application/json' }),
            status: status
        });
    };
    InMemoryBackendService.prototype.createObservableResponse = function (resOptions) {
        resOptions = this.setStatusText(resOptions);
        if (this.config.defaultResponseOptions) {
            resOptions = this.config.defaultResponseOptions.merge(resOptions);
        }
        var res = new http_1.Response(resOptions);
        return new Observable_1.Observable(function (responseObserver) {
            if (exports.isSuccess(res.status)) {
                responseObserver.next(res);
                responseObserver.complete();
            }
            else {
                responseObserver.error(res);
            }
            return function () { }; // unsubscribe function
        })
            .delay(this.config.delay || 500);
    };
    InMemoryBackendService.prototype.delete = function (_a) {
        var id = _a.id, collection = _a.collection, collectionName = _a.collectionName, headers = _a.headers;
        if (!id) {
            return this.createErrorResponse(http_status_codes_1.STATUS.NOT_FOUND, "Missing \"" + collectionName + "\" id");
        }
        var exists = this.removeById(collection, id);
        return new http_1.ResponseOptions({
            headers: headers,
            status: (exists || !this.config.delete404) ? http_status_codes_1.STATUS.NO_CONTENT : http_status_codes_1.STATUS.NOT_FOUND
        });
    };
    InMemoryBackendService.prototype.findById = function (collection, id) {
        return collection.find(function (item) { return item.id === id; });
    };
    InMemoryBackendService.prototype.genId = function (collection) {
        // assumes numeric ids
        var maxId = 0;
        collection.reduce(function (prev, item) {
            maxId = Math.max(maxId, typeof item.id === 'number' ? item.id : maxId);
        }, null);
        return maxId + 1;
    };
    InMemoryBackendService.prototype.get = function (_a) {
        var id = _a.id, query = _a.query, collection = _a.collection, collectionName = _a.collectionName, headers = _a.headers;
        var data = collection;
        if (id) {
            data = this.findById(collection, id);
        }
        else if (query) {
            data = this.applyQuery(collection, query);
        }
        if (!data) {
            return this.createErrorResponse(http_status_codes_1.STATUS.NOT_FOUND, "'" + collectionName + "' with id='" + id + "' not found");
        }
        return new http_1.ResponseOptions({
            body: { data: this.clone(data) },
            headers: headers,
            status: http_status_codes_1.STATUS.OK
        });
    };
    InMemoryBackendService.prototype.getLocation = function (href) {
        var l = document.createElement('a');
        l.href = href;
        return l;
    };
    
    InMemoryBackendService.prototype.indexOf = function (collection, id) {
        return collection.findIndex(function (item) { return item.id === id; });
    };
    // tries to parse id as number if collection item.id is a number.
    // returns the original param id otherwise.
    InMemoryBackendService.prototype.parseId = function (collection, id) {
        if (!id) {
            return null;
        }
        var isNumberId = collection[0] && typeof collection[0].id === 'number';
        if (isNumberId) {
            var idNum = parseFloat(id);
            return isNaN(idNum) ? id : idNum;
        }
        return id;
    };
    InMemoryBackendService.prototype.parseUrl = function (url) {
        try {
            var loc = this.getLocation(url);
            var drop = this.config.rootPath.length;
            var urlRoot = '';
            if (loc.host !== this.config.host) {
                // url for a server on a different host!
                // assume it's collection is actually here too.
                drop = 1; // the leading slash
                urlRoot = loc.protocol + '//' + loc.host + '/';
            }
            var path = loc.pathname.substring(drop);
            var _a = path.split('/'), base = _a[0], collectionName = _a[1], id = _a[2];
            var resourceUrl = urlRoot + base + '/' + collectionName + '/';
            collectionName = collectionName.split('.')[0]; // ignore anything after the '.', e.g., '.json'
            var query = loc.search && new http_1.URLSearchParams(loc.search.substr(1));
            return { base: base, id: id, collectionName: collectionName, resourceUrl: resourceUrl, query: query };
        }
        catch (err) {
            var msg = "unable to parse url '" + url + "'; original error: " + err.message;
            throw new Error(msg);
        }
    };
    InMemoryBackendService.prototype.post = function (_a) {
        var collection = _a.collection, headers = _a.headers, id = _a.id, req = _a.req, resourceUrl = _a.resourceUrl;
        var item = JSON.parse(req.text());
        if (!item.id) {
            item.id = id || this.genId(collection);
        }
        // ignore the request id, if any. Alternatively,
        // could reject request if id differs from item.id
        id = item.id;
        var existingIx = this.indexOf(collection, id);
        if (existingIx > -1) {
            collection[existingIx] = item;
            return new http_1.ResponseOptions({
                headers: headers,
                status: http_status_codes_1.STATUS.NO_CONTENT
            });
        }
        else {
            collection.push(item);
            headers.set('Location', resourceUrl + '/' + id);
            return new http_1.ResponseOptions({
                headers: headers,
                body: { data: this.clone(item) },
                status: http_status_codes_1.STATUS.CREATED
            });
        }
    };
    InMemoryBackendService.prototype.put = function (_a) {
        var id = _a.id, collection = _a.collection, collectionName = _a.collectionName, headers = _a.headers, req = _a.req;
        var item = JSON.parse(req.text());
        if (!id) {
            return this.createErrorResponse(http_status_codes_1.STATUS.NOT_FOUND, "Missing '" + collectionName + "' id");
        }
        if (id !== item.id) {
            return this.createErrorResponse(http_status_codes_1.STATUS.BAD_REQUEST, "\"" + collectionName + "\" id does not match item.id");
        }
        var existingIx = this.indexOf(collection, id);
        if (existingIx > -1) {
            collection[existingIx] = item;
            return new http_1.ResponseOptions({
                headers: headers,
                status: http_status_codes_1.STATUS.NO_CONTENT // successful; no content
            });
        }
        else {
            collection.push(item);
            return new http_1.ResponseOptions({
                body: { data: this.clone(item) },
                headers: headers,
                status: http_status_codes_1.STATUS.CREATED
            });
        }
    };
    InMemoryBackendService.prototype.removeById = function (collection, id) {
        var ix = this.indexOf(collection, id);
        if (ix > -1) {
            collection.splice(ix, 1);
            return true;
        }
        return false;
    };
    /**
     * Reset the "database" to its original state
     */
    InMemoryBackendService.prototype.resetDb = function () {
        this.db = this.inMemDbService.createDb();
    };
    InMemoryBackendService.prototype.setPassThruBackend = function () {
        this.passThruBackend = undefined;
        if (this.config.passThruUnknownUrl) {
            try {
                // copied from @angular/http/backends/xhr_backend
                var browserXhr = this.injector.get(http_1.BrowserXhr);
                var baseResponseOptions = this.injector.get(http_1.ResponseOptions);
                var xsrfStrategy = this.injector.get(http_1.XSRFStrategy);
                this.passThruBackend = new http_1.XHRBackend(browserXhr, baseResponseOptions, xsrfStrategy);
            }
            catch (ex) {
                ex.message = 'Cannot create passThru404 backend; ' + (ex.message || '');
                throw ex;
            }
        }
    };
    InMemoryBackendService.prototype.setStatusText = function (options) {
        try {
            var statusCode = http_status_codes_1.STATUS_CODE_INFO[options.status];
            options['statusText'] = statusCode ? statusCode.text : 'Unknown Status';
            return options;
        }
        catch (err) {
            return new http_1.ResponseOptions({
                status: http_status_codes_1.STATUS.INTERNAL_SERVER_ERROR,
                statusText: 'Invalid Server Operation'
            });
        }
    };
    /** @nocollapse */
    InMemoryBackendService.ctorParameters = [
        { type: core_1.Injector, },
        { type: InMemoryDbService, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [InMemoryBackendConfig,] }, { type: core_1.Optional },] },
    ];
    return InMemoryBackendService;
}());
exports.InMemoryBackendService = InMemoryBackendService;
});



var InMemoryBackendConfig = inMemoryBackend_service.InMemoryBackendConfig;
var InMemoryDbService = inMemoryBackend_service.InMemoryDbService;

var core_1 = require$$4$1;
var http_1 = require$$3$2;
var in_memory_backend_service_1 = inMemoryBackend_service;
// AoT requires factory to be exported
function inMemoryBackendServiceFactory(injector, dbService, options) {
    var backend = new in_memory_backend_service_1.InMemoryBackendService(injector, dbService, options);
    return backend;
}
var inMemoryBackendServiceFactory_1 = inMemoryBackendServiceFactory;
var InMemoryWebApiModule = (function () {
    function InMemoryWebApiModule() {
    }
    /**
    *  Prepare in-memory-web-api in the root/boot application module
    *  with class that implements InMemoryDbService and creates an in-memory database.
    *
    * @param {Type} dbCreator - Class that creates seed data for in-memory database. Must implement InMemoryDbService.
    * @param {InMemoryBackendConfigArgs} [options]
    *
    * @example
    * InMemoryWebApiModule.forRoot(dbCreator);
    * InMemoryWebApiModule.forRoot(dbCreator, {useValue: {delay:600}});
    */
    InMemoryWebApiModule.forRoot = function (dbCreator, options) {
        return {
            ngModule: InMemoryWebApiModule,
            providers: [
                { provide: in_memory_backend_service_1.InMemoryDbService, useClass: dbCreator },
                { provide: in_memory_backend_service_1.InMemoryBackendConfig, useValue: options },
            ]
        };
    };
    InMemoryWebApiModule.decorators = [
        { type: core_1.NgModule, args: [{
                    // Must useFactory for AoT
                    // https://github.com/angular/angular/issues/11178
                    providers: [{ provide: http_1.XHRBackend,
                            useFactory: inMemoryBackendServiceFactory,
                            deps: [core_1.Injector, in_memory_backend_service_1.InMemoryDbService, in_memory_backend_service_1.InMemoryBackendConfig] }]
                },] },
    ];
    /** @nocollapse */
    InMemoryWebApiModule.ctorParameters = [];
    return InMemoryWebApiModule;
}());
var InMemoryWebApiModule_1 = InMemoryWebApiModule;

var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var heroes = [
            { id: 11, name: 'Mr. Nice' },
            { id: 12, name: 'Narco' },
            { id: 13, name: 'Bombasto' },
            { id: 14, name: 'Celeritas' },
            { id: 15, name: 'Magneta' },
            { id: 16, name: 'RubberMan' },
            { id: 17, name: 'Dynama' },
            { id: 18, name: 'Dr IQ' },
            { id: 19, name: 'Magma' },
            { id: 20, name: 'Tornado' }
        ];
        return { heroes: heroes };
    };
    return InMemoryDataService;
}());

var root_1$5 = root;
/**
 * @param PromiseCtor
 * @return {Promise<T>}
 * @method toPromise
 * @owner Observable
 */
function toPromise$2(PromiseCtor) {
    var _this = this;
    if (!PromiseCtor) {
        if (root_1$5.root.Rx && root_1$5.root.Rx.config && root_1$5.root.Rx.config.Promise) {
            PromiseCtor = root_1$5.root.Rx.config.Promise;
        }
        else if (root_1$5.root.Promise) {
            PromiseCtor = root_1$5.root.Promise;
        }
    }
    if (!PromiseCtor) {
        throw new Error('no Promise impl found');
    }
    return new PromiseCtor(function (resolve, reject) {
        var value;
        _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
    });
}
var toPromise_2 = toPromise$2;

var toPromise_1$1 = {
	toPromise: toPromise_2
};

var Observable_1$5 = Observable_1$1;
var toPromise_1 = toPromise_1$1;
Observable_1$5.Observable.prototype.toPromise = toPromise_1.toPromise;

var TestComponent = (function () {
    function TestComponent(http) {
        this.http = http;
    }
    TestComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get('/api/heroes').toPromise().then(function (r) {
            _this.heroes = r.json().data;
            console.log(_this.heroes);
        });
    };
    TestComponent.decorators = [
        { type: Component, args: [{
                    selector: 'test',
                    template: '<div *ngFor="let hero of heroes">{{hero.name}}</div>'
                },] },
    ];
    /** @nocollapse */
    TestComponent.ctorParameters = [
        { type: Http, },
    ];
    return TestComponent;
}());

var AppModule = (function () {
    function AppModule() {
    }
    AppModule.decorators = [
        { type: NgModule, args: [{
                    imports: [BrowserModule, HttpModule, InMemoryWebApiModule_1.forRoot(InMemoryDataService)],
                    bootstrap: [TestComponent],
                    declarations: [TestComponent]
                },] },
    ];
    /** @nocollapse */
    AppModule.ctorParameters = [];
    return AppModule;
}());

/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
/* tslint:disable */
var __extends$47 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var renderType_TestComponent_Host = null;
var _View_TestComponent_Host0 = (function (_super) {
    __extends$47(_View_TestComponent_Host0, _super);
    function _View_TestComponent_Host0(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_TestComponent_Host0, renderType_TestComponent_Host, ViewType.HOST, viewUtils, parentInjector, declarationEl, ChangeDetectorStatus.CheckAlways);
    }
    _View_TestComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = this.selectOrCreateHostElement('test', rootSelector, null);
        this._appEl_0 = new AppElement(0, null, this, this._el_0);
        var compView_0 = viewFactory_TestComponent0(this.viewUtils, this.injector(0), this._appEl_0);
        this._TestComponent_0_4 = new TestComponent(this.parentInjector.get(Http));
        this._appEl_0.initComponent(this._TestComponent_0_4, [], compView_0);
        compView_0.create(this._TestComponent_0_4, this.projectableNodes, null);
        this.init([].concat([this._el_0]), [this._el_0], [], []);
        return this._appEl_0;
    };
    _View_TestComponent_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === TestComponent) && (0 === requestNodeIndex))) {
            return this._TestComponent_0_4;
        }
        return notFoundResult;
    };
    _View_TestComponent_Host0.prototype.detectChangesInternal = function (throwOnChange) {
        if (((this.numberOfChecks === 0) && !throwOnChange)) {
            this._TestComponent_0_4.ngOnInit();
        }
        this.detectContentChildrenChanges(throwOnChange);
        this.detectViewChildrenChanges(throwOnChange);
    };
    return _View_TestComponent_Host0;
}(AppView));
function viewFactory_TestComponent_Host0(viewUtils, parentInjector, declarationEl) {
    if ((renderType_TestComponent_Host === null)) {
        (renderType_TestComponent_Host = viewUtils.createRenderComponentType('', 0, ViewEncapsulation.None, [], {}));
    }
    return new _View_TestComponent_Host0(viewUtils, parentInjector, declarationEl);
}
var TestComponentNgFactory = new ComponentFactory('test', viewFactory_TestComponent_Host0, TestComponent);
var styles_TestComponent = [];
var renderType_TestComponent = null;
var _View_TestComponent0 = (function (_super) {
    __extends$47(_View_TestComponent0, _super);
    function _View_TestComponent0(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_TestComponent0, renderType_TestComponent, ViewType.COMPONENT, viewUtils, parentInjector, declarationEl, ChangeDetectorStatus.CheckAlways);
    }
    _View_TestComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.declarationAppElement.nativeElement);
        this._anchor_0 = this.renderer.createTemplateAnchor(parentRenderNode, null);
        this._appEl_0 = new AppElement(0, null, this, this._anchor_0);
        this._TemplateRef_0_5 = new TemplateRef_(this._appEl_0, viewFactory_TestComponent1);
        this._NgFor_0_6 = new NgFor(this._appEl_0.vcRef, this._TemplateRef_0_5, this.parentInjector.get(IterableDiffers), this.ref);
        this._expr_0 = UNINITIALIZED;
        this.init([], [this._anchor_0], [], []);
        return null;
    };
    _View_TestComponent0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === TemplateRef) && (0 === requestNodeIndex))) {
            return this._TemplateRef_0_5;
        }
        if (((token === NgFor) && (0 === requestNodeIndex))) {
            return this._NgFor_0_6;
        }
        return notFoundResult;
    };
    _View_TestComponent0.prototype.detectChangesInternal = function (throwOnChange) {
        var changes = null;
        changes = null;
        var currVal_0 = this.context.heroes;
        if (checkBinding(throwOnChange, this._expr_0, currVal_0)) {
            this._NgFor_0_6.ngForOf = currVal_0;
            if ((changes === null)) {
                (changes = {});
            }
            changes['ngForOf'] = new SimpleChange(this._expr_0, currVal_0);
            this._expr_0 = currVal_0;
        }
        if ((changes !== null)) {
            this._NgFor_0_6.ngOnChanges(changes);
        }
        if (!throwOnChange) {
            this._NgFor_0_6.ngDoCheck();
        }
        this.detectContentChildrenChanges(throwOnChange);
        this.detectViewChildrenChanges(throwOnChange);
    };
    return _View_TestComponent0;
}(AppView));
function viewFactory_TestComponent0(viewUtils, parentInjector, declarationEl) {
    if ((renderType_TestComponent === null)) {
        (renderType_TestComponent = viewUtils.createRenderComponentType('/Users/tor/Development/in-mem-web-api-aot/app.component.ts class TestComponent - inline template', 0, ViewEncapsulation.None, styles_TestComponent, {}));
    }
    return new _View_TestComponent0(viewUtils, parentInjector, declarationEl);
}
var _View_TestComponent1 = (function (_super) {
    __extends$47(_View_TestComponent1, _super);
    function _View_TestComponent1(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_TestComponent1, renderType_TestComponent, ViewType.EMBEDDED, viewUtils, parentInjector, declarationEl, ChangeDetectorStatus.CheckAlways);
    }
    _View_TestComponent1.prototype.createInternal = function (rootSelector) {
        this._el_0 = this.renderer.createElement(null, 'div', null);
        this._text_1 = this.renderer.createText(this._el_0, '', null);
        this._expr_0 = UNINITIALIZED;
        this.init([].concat([this._el_0]), [
            this._el_0,
            this._text_1
        ], [], []);
        return null;
    };
    _View_TestComponent1.prototype.detectChangesInternal = function (throwOnChange) {
        this.detectContentChildrenChanges(throwOnChange);
        var currVal_0 = interpolate(1, '', this.context.$implicit.name, '');
        if (checkBinding(throwOnChange, this._expr_0, currVal_0)) {
            this.renderer.setText(this._text_1, currVal_0);
            this._expr_0 = currVal_0;
        }
        this.detectViewChildrenChanges(throwOnChange);
    };
    return _View_TestComponent1;
}(AppView));
function viewFactory_TestComponent1(viewUtils, parentInjector, declarationEl) {
    return new _View_TestComponent1(viewUtils, parentInjector, declarationEl);
}

/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
/* tslint:disable */
var __extends$36 = (undefined && undefined.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AppModuleInjector = (function (_super) {
    __extends$36(AppModuleInjector, _super);
    function AppModuleInjector(parent) {
        _super.call(this, parent, [TestComponentNgFactory], [TestComponentNgFactory]);
    }
    Object.defineProperty(AppModuleInjector.prototype, "_LOCALE_ID_6", {
        get: function () {
            if ((this.__LOCALE_ID_6 == null)) {
                (this.__LOCALE_ID_6 = null);
            }
            return this.__LOCALE_ID_6;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_NgLocalization_7", {
        get: function () {
            if ((this.__NgLocalization_7 == null)) {
                (this.__NgLocalization_7 = new NgLocaleLocalization(this._LOCALE_ID_6));
            }
            return this.__NgLocalization_7;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ApplicationRef_12", {
        get: function () {
            if ((this.__ApplicationRef_12 == null)) {
                (this.__ApplicationRef_12 = this._ApplicationRef__11);
            }
            return this.__ApplicationRef_12;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Compiler_13", {
        get: function () {
            if ((this.__Compiler_13 == null)) {
                (this.__Compiler_13 = new Compiler());
            }
            return this.__Compiler_13;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_APP_ID_14", {
        get: function () {
            if ((this.__APP_ID_14 == null)) {
                (this.__APP_ID_14 = _appIdRandomProviderFactory());
            }
            return this.__APP_ID_14;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_DOCUMENT_15", {
        get: function () {
            if ((this.__DOCUMENT_15 == null)) {
                (this.__DOCUMENT_15 = _document());
            }
            return this.__DOCUMENT_15;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_HAMMER_GESTURE_CONFIG_16", {
        get: function () {
            if ((this.__HAMMER_GESTURE_CONFIG_16 == null)) {
                (this.__HAMMER_GESTURE_CONFIG_16 = new HammerGestureConfig());
            }
            return this.__HAMMER_GESTURE_CONFIG_16;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_EVENT_MANAGER_PLUGINS_17", {
        get: function () {
            if ((this.__EVENT_MANAGER_PLUGINS_17 == null)) {
                (this.__EVENT_MANAGER_PLUGINS_17 = [
                    new DomEventsPlugin(),
                    new KeyEventsPlugin(),
                    new HammerGesturesPlugin(this._HAMMER_GESTURE_CONFIG_16)
                ]);
            }
            return this.__EVENT_MANAGER_PLUGINS_17;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_EventManager_18", {
        get: function () {
            if ((this.__EventManager_18 == null)) {
                (this.__EventManager_18 = new EventManager(this._EVENT_MANAGER_PLUGINS_17, this.parent.get(NgZone)));
            }
            return this.__EventManager_18;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_DomSharedStylesHost_19", {
        get: function () {
            if ((this.__DomSharedStylesHost_19 == null)) {
                (this.__DomSharedStylesHost_19 = new DomSharedStylesHost(this._DOCUMENT_15));
            }
            return this.__DomSharedStylesHost_19;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_AnimationDriver_20", {
        get: function () {
            if ((this.__AnimationDriver_20 == null)) {
                (this.__AnimationDriver_20 = _resolveDefaultAnimationDriver());
            }
            return this.__AnimationDriver_20;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_DomRootRenderer_21", {
        get: function () {
            if ((this.__DomRootRenderer_21 == null)) {
                (this.__DomRootRenderer_21 = new DomRootRenderer_(this._DOCUMENT_15, this._EventManager_18, this._DomSharedStylesHost_19, this._AnimationDriver_20));
            }
            return this.__DomRootRenderer_21;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_RootRenderer_22", {
        get: function () {
            if ((this.__RootRenderer_22 == null)) {
                (this.__RootRenderer_22 = _createConditionalRootRenderer(this._DomRootRenderer_21, this.parent.get(NgProbeToken, null)));
            }
            return this.__RootRenderer_22;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_DomSanitizer_23", {
        get: function () {
            if ((this.__DomSanitizer_23 == null)) {
                (this.__DomSanitizer_23 = new DomSanitizerImpl());
            }
            return this.__DomSanitizer_23;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Sanitizer_24", {
        get: function () {
            if ((this.__Sanitizer_24 == null)) {
                (this.__Sanitizer_24 = this._DomSanitizer_23);
            }
            return this.__Sanitizer_24;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ViewUtils_25", {
        get: function () {
            if ((this.__ViewUtils_25 == null)) {
                (this.__ViewUtils_25 = new ViewUtils(this._RootRenderer_22, this._APP_ID_14, this._Sanitizer_24));
            }
            return this.__ViewUtils_25;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_IterableDiffers_26", {
        get: function () {
            if ((this.__IterableDiffers_26 == null)) {
                (this.__IterableDiffers_26 = _iterableDiffersFactory());
            }
            return this.__IterableDiffers_26;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_KeyValueDiffers_27", {
        get: function () {
            if ((this.__KeyValueDiffers_27 == null)) {
                (this.__KeyValueDiffers_27 = _keyValueDiffersFactory());
            }
            return this.__KeyValueDiffers_27;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_SharedStylesHost_28", {
        get: function () {
            if ((this.__SharedStylesHost_28 == null)) {
                (this.__SharedStylesHost_28 = this._DomSharedStylesHost_19);
            }
            return this.__SharedStylesHost_28;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Title_29", {
        get: function () {
            if ((this.__Title_29 == null)) {
                (this.__Title_29 = new Title());
            }
            return this.__Title_29;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_InMemoryDbService_30", {
        get: function () {
            if ((this.__InMemoryDbService_30 == null)) {
                (this.__InMemoryDbService_30 = new InMemoryDataService());
            }
            return this.__InMemoryDbService_30;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_InMemoryBackendConfig_31", {
        get: function () {
            if ((this.__InMemoryBackendConfig_31 == null)) {
                (this.__InMemoryBackendConfig_31 = null);
            }
            return this.__InMemoryBackendConfig_31;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_XHRBackend_32", {
        get: function () {
            if ((this.__XHRBackend_32 == null)) {
                (this.__XHRBackend_32 = inMemoryBackendServiceFactory_1(this, this._InMemoryDbService_30, this._InMemoryBackendConfig_31));
            }
            return this.__XHRBackend_32;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_RequestOptions_33", {
        get: function () {
            if ((this.__RequestOptions_33 == null)) {
                (this.__RequestOptions_33 = new BaseRequestOptions());
            }
            return this.__RequestOptions_33;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_Http_34", {
        get: function () {
            if ((this.__Http_34 == null)) {
                (this.__Http_34 = httpFactory(this._XHRBackend_32, this._RequestOptions_33));
            }
            return this.__Http_34;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_BrowserXhr_35", {
        get: function () {
            if ((this.__BrowserXhr_35 == null)) {
                (this.__BrowserXhr_35 = new BrowserXhr());
            }
            return this.__BrowserXhr_35;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_ResponseOptions_36", {
        get: function () {
            if ((this.__ResponseOptions_36 == null)) {
                (this.__ResponseOptions_36 = new BaseResponseOptions());
            }
            return this.__ResponseOptions_36;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_XSRFStrategy_37", {
        get: function () {
            if ((this.__XSRFStrategy_37 == null)) {
                (this.__XSRFStrategy_37 = _createDefaultCookieXSRFStrategy());
            }
            return this.__XSRFStrategy_37;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppModuleInjector.prototype, "_TRANSLATIONS_FORMAT_38", {
        get: function () {
            if ((this.__TRANSLATIONS_FORMAT_38 == null)) {
                (this.__TRANSLATIONS_FORMAT_38 = null);
            }
            return this.__TRANSLATIONS_FORMAT_38;
        },
        enumerable: true,
        configurable: true
    });
    AppModuleInjector.prototype.createInternal = function () {
        this._CommonModule_0 = new CommonModule();
        this._ApplicationModule_1 = new ApplicationModule();
        this._BrowserModule_2 = new BrowserModule(this.parent.get(BrowserModule, null));
        this._HttpModule_3 = new HttpModule();
        this._InMemoryWebApiModule_4 = new InMemoryWebApiModule_1();
        this._AppModule_5 = new AppModule();
        this._ErrorHandler_8 = errorHandler();
        this._ApplicationInitStatus_9 = new ApplicationInitStatus(this.parent.get(APP_INITIALIZER, null));
        this._Testability_10 = new Testability(this.parent.get(NgZone));
        this._ApplicationRef__11 = new ApplicationRef_(this.parent.get(NgZone), this.parent.get(Console), this, this._ErrorHandler_8, this, this._ApplicationInitStatus_9, this.parent.get(TestabilityRegistry, null), this._Testability_10);
        return this._AppModule_5;
    };
    AppModuleInjector.prototype.getInternal = function (token, notFoundResult) {
        if ((token === CommonModule)) {
            return this._CommonModule_0;
        }
        if ((token === ApplicationModule)) {
            return this._ApplicationModule_1;
        }
        if ((token === BrowserModule)) {
            return this._BrowserModule_2;
        }
        if ((token === HttpModule)) {
            return this._HttpModule_3;
        }
        if ((token === InMemoryWebApiModule_1)) {
            return this._InMemoryWebApiModule_4;
        }
        if ((token === AppModule)) {
            return this._AppModule_5;
        }
        if ((token === LOCALE_ID)) {
            return this._LOCALE_ID_6;
        }
        if ((token === NgLocalization)) {
            return this._NgLocalization_7;
        }
        if ((token === ErrorHandler)) {
            return this._ErrorHandler_8;
        }
        if ((token === ApplicationInitStatus)) {
            return this._ApplicationInitStatus_9;
        }
        if ((token === Testability)) {
            return this._Testability_10;
        }
        if ((token === ApplicationRef_)) {
            return this._ApplicationRef__11;
        }
        if ((token === ApplicationRef)) {
            return this._ApplicationRef_12;
        }
        if ((token === Compiler)) {
            return this._Compiler_13;
        }
        if ((token === APP_ID)) {
            return this._APP_ID_14;
        }
        if ((token === DOCUMENT)) {
            return this._DOCUMENT_15;
        }
        if ((token === HAMMER_GESTURE_CONFIG)) {
            return this._HAMMER_GESTURE_CONFIG_16;
        }
        if ((token === EVENT_MANAGER_PLUGINS)) {
            return this._EVENT_MANAGER_PLUGINS_17;
        }
        if ((token === EventManager)) {
            return this._EventManager_18;
        }
        if ((token === DomSharedStylesHost)) {
            return this._DomSharedStylesHost_19;
        }
        if ((token === AnimationDriver)) {
            return this._AnimationDriver_20;
        }
        if ((token === DomRootRenderer)) {
            return this._DomRootRenderer_21;
        }
        if ((token === RootRenderer)) {
            return this._RootRenderer_22;
        }
        if ((token === DomSanitizer)) {
            return this._DomSanitizer_23;
        }
        if ((token === Sanitizer)) {
            return this._Sanitizer_24;
        }
        if ((token === ViewUtils)) {
            return this._ViewUtils_25;
        }
        if ((token === IterableDiffers)) {
            return this._IterableDiffers_26;
        }
        if ((token === KeyValueDiffers)) {
            return this._KeyValueDiffers_27;
        }
        if ((token === SharedStylesHost)) {
            return this._SharedStylesHost_28;
        }
        if ((token === Title)) {
            return this._Title_29;
        }
        if ((token === InMemoryDbService)) {
            return this._InMemoryDbService_30;
        }
        if ((token === InMemoryBackendConfig)) {
            return this._InMemoryBackendConfig_31;
        }
        if ((token === XHRBackend)) {
            return this._XHRBackend_32;
        }
        if ((token === RequestOptions)) {
            return this._RequestOptions_33;
        }
        if ((token === Http)) {
            return this._Http_34;
        }
        if ((token === BrowserXhr)) {
            return this._BrowserXhr_35;
        }
        if ((token === ResponseOptions)) {
            return this._ResponseOptions_36;
        }
        if ((token === XSRFStrategy)) {
            return this._XSRFStrategy_37;
        }
        if ((token === TRANSLATIONS_FORMAT)) {
            return this._TRANSLATIONS_FORMAT_38;
        }
        return notFoundResult;
    };
    AppModuleInjector.prototype.destroyInternal = function () {
        this._ApplicationRef__11.ngOnDestroy();
    };
    return AppModuleInjector;
}(NgModuleInjector));
var AppModuleNgFactory = new NgModuleFactory(AppModuleInjector, AppModule);

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);

}());
