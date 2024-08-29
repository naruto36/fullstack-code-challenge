"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
const typeorm_1 = require("typeorm");
let Result = class Result {
    constructor() {
        this.id = 0; // Initialize with a default value, though in practice, this will be auto-generated
        this.status = 'Queued'; // Default value
        this.repositoryName = ''; // Default value or initialization
        this.findings = {}; // Default value or initialization
        this.queuedAt = null; // Default value or initialization
        this.scanningAt = null; // Default value or initialization
        this.finishedAt = null; // Default value or initialization
    }
};
exports.Result = Result;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Result.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['Queued', 'In Progress', 'Success', 'Failure'] }),
    __metadata("design:type", String)
], Result.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Result.prototype, "repositoryName", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", Object)
], Result.prototype, "findings", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], Result.prototype, "queuedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], Result.prototype, "scanningAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], Result.prototype, "finishedAt", void 0);
exports.Result = Result = __decorate([
    (0, typeorm_1.Entity)()
], Result);
