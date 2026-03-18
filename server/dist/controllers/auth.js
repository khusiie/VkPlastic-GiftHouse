"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const prisma_1 = require("../prisma");
const bcrypt_1 = require("bcrypt");
const jwt = __importStar(require("jsonwebtoken"));
const secrets_1 = require("../secrets");
const root_1 = require("../exceptions/root");
const bad_requests_1 = require("../exceptions/bad_requests");
const users_1 = require("../schema/users");
const signup = async (req, res) => {
    users_1.SignUpSchema.parse(req.body);
    const { email, password, name } = req.body;
    let user = await prisma_1.prismaClient.user.findFirst({ where: { email } });
    if (user) {
        throw new bad_requests_1.BadRequestsException('User already exists!', root_1.ErrorCode.USER_ALREADY_EXISTS);
    }
    user = await prisma_1.prismaClient.user.create({
        data: {
            name,
            email,
            password: (0, bcrypt_1.hashSync)(password, 10)
        }
    });
    res.json(user);
};
exports.signup = signup;
const login = async (req, res) => {
    const { email, password } = req.body;
    let user = await prisma_1.prismaClient.user.findUnique({ where: { email } });
    if (!user) {
        throw new bad_requests_1.BadRequestsException('User does  not exist!', root_1.ErrorCode.USER_NOT_FOUND);
    }
    if (!(0, bcrypt_1.compareSync)(password, user.password)) {
        throw new bad_requests_1.BadRequestsException('Incorrect Password!', root_1.ErrorCode.INCORRECT_PASSWORD);
    }
    const token = jwt.sign({
        userId: user.id
    }, secrets_1.JWT_SECRET);
    res.json({ user, token });
};
exports.login = login;
