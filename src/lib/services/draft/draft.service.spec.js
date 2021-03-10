"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var draft_service_1 = require("./draft.service");
describe('DraftService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(draft_service_1.DraftService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=draft.service.spec.js.map