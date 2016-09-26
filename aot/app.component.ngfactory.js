/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
/* tslint:disable */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/linker/element';
import * as import3 from '../app.component';
import * as import4 from '@angular/core/src/linker/view_utils';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/change_detection';
import * as import8 from '@angular/http/src/http';
import * as import9 from '@angular/core/src/metadata/view';
import * as import10 from '@angular/core/src/linker/component_factory';
import * as import11 from '@angular/common/src/directives/ng_for';
import * as import12 from '@angular/core/src/linker/template_ref';
import * as import13 from '@angular/core/src/change_detection/differs/iterable_differs';
var renderType_TestComponent_Host = null;
var _View_TestComponent_Host0 = (function (_super) {
    __extends(_View_TestComponent_Host0, _super);
    function _View_TestComponent_Host0(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_TestComponent_Host0, renderType_TestComponent_Host, import6.ViewType.HOST, viewUtils, parentInjector, declarationEl, import7.ChangeDetectorStatus.CheckAlways);
    }
    _View_TestComponent_Host0.prototype.createInternal = function (rootSelector) {
        this._el_0 = this.selectOrCreateHostElement('test', rootSelector, null);
        this._appEl_0 = new import2.AppElement(0, null, this, this._el_0);
        var compView_0 = viewFactory_TestComponent0(this.viewUtils, this.injector(0), this._appEl_0);
        this._TestComponent_0_4 = new import3.TestComponent(this.parentInjector.get(import8.Http));
        this._appEl_0.initComponent(this._TestComponent_0_4, [], compView_0);
        compView_0.create(this._TestComponent_0_4, this.projectableNodes, null);
        this.init([].concat([this._el_0]), [this._el_0], [], []);
        return this._appEl_0;
    };
    _View_TestComponent_Host0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import3.TestComponent) && (0 === requestNodeIndex))) {
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
}(import1.AppView));
function viewFactory_TestComponent_Host0(viewUtils, parentInjector, declarationEl) {
    if ((renderType_TestComponent_Host === null)) {
        (renderType_TestComponent_Host = viewUtils.createRenderComponentType('', 0, import9.ViewEncapsulation.None, [], {}));
    }
    return new _View_TestComponent_Host0(viewUtils, parentInjector, declarationEl);
}
export var TestComponentNgFactory = new import10.ComponentFactory('test', viewFactory_TestComponent_Host0, import3.TestComponent);
var styles_TestComponent = [];
var renderType_TestComponent = null;
var _View_TestComponent0 = (function (_super) {
    __extends(_View_TestComponent0, _super);
    function _View_TestComponent0(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_TestComponent0, renderType_TestComponent, import6.ViewType.COMPONENT, viewUtils, parentInjector, declarationEl, import7.ChangeDetectorStatus.CheckAlways);
    }
    _View_TestComponent0.prototype.createInternal = function (rootSelector) {
        var parentRenderNode = this.renderer.createViewRoot(this.declarationAppElement.nativeElement);
        this._anchor_0 = this.renderer.createTemplateAnchor(parentRenderNode, null);
        this._appEl_0 = new import2.AppElement(0, null, this, this._anchor_0);
        this._TemplateRef_0_5 = new import12.TemplateRef_(this._appEl_0, viewFactory_TestComponent1);
        this._NgFor_0_6 = new import11.NgFor(this._appEl_0.vcRef, this._TemplateRef_0_5, this.parentInjector.get(import13.IterableDiffers), this.ref);
        this._expr_0 = import7.UNINITIALIZED;
        this.init([], [this._anchor_0], [], []);
        return null;
    };
    _View_TestComponent0.prototype.injectorGetInternal = function (token, requestNodeIndex, notFoundResult) {
        if (((token === import12.TemplateRef) && (0 === requestNodeIndex))) {
            return this._TemplateRef_0_5;
        }
        if (((token === import11.NgFor) && (0 === requestNodeIndex))) {
            return this._NgFor_0_6;
        }
        return notFoundResult;
    };
    _View_TestComponent0.prototype.detectChangesInternal = function (throwOnChange) {
        var changes = null;
        changes = null;
        var currVal_0 = this.context.heroes;
        if (import4.checkBinding(throwOnChange, this._expr_0, currVal_0)) {
            this._NgFor_0_6.ngForOf = currVal_0;
            if ((changes === null)) {
                (changes = {});
            }
            changes['ngForOf'] = new import7.SimpleChange(this._expr_0, currVal_0);
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
}(import1.AppView));
export function viewFactory_TestComponent0(viewUtils, parentInjector, declarationEl) {
    if ((renderType_TestComponent === null)) {
        (renderType_TestComponent = viewUtils.createRenderComponentType('/Users/tor/Development/in-mem-web-api-aot/app.component.ts class TestComponent - inline template', 0, import9.ViewEncapsulation.None, styles_TestComponent, {}));
    }
    return new _View_TestComponent0(viewUtils, parentInjector, declarationEl);
}
var _View_TestComponent1 = (function (_super) {
    __extends(_View_TestComponent1, _super);
    function _View_TestComponent1(viewUtils, parentInjector, declarationEl) {
        _super.call(this, _View_TestComponent1, renderType_TestComponent, import6.ViewType.EMBEDDED, viewUtils, parentInjector, declarationEl, import7.ChangeDetectorStatus.CheckAlways);
    }
    _View_TestComponent1.prototype.createInternal = function (rootSelector) {
        this._el_0 = this.renderer.createElement(null, 'div', null);
        this._text_1 = this.renderer.createText(this._el_0, '', null);
        this._expr_0 = import7.UNINITIALIZED;
        this.init([].concat([this._el_0]), [
            this._el_0,
            this._text_1
        ], [], []);
        return null;
    };
    _View_TestComponent1.prototype.detectChangesInternal = function (throwOnChange) {
        this.detectContentChildrenChanges(throwOnChange);
        var currVal_0 = import4.interpolate(1, '', this.context.$implicit.name, '');
        if (import4.checkBinding(throwOnChange, this._expr_0, currVal_0)) {
            this.renderer.setText(this._text_1, currVal_0);
            this._expr_0 = currVal_0;
        }
        this.detectViewChildrenChanges(throwOnChange);
    };
    return _View_TestComponent1;
}(import1.AppView));
function viewFactory_TestComponent1(viewUtils, parentInjector, declarationEl) {
    return new _View_TestComponent1(viewUtils, parentInjector, declarationEl);
}
//# sourceMappingURL=app.component.ngfactory.js.map