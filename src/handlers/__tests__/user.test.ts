import * as user from '../user'
import {createNewUser} from "../user";
import {before} from "node:test";

describe('user handler', () => {
    it('should create a new user', async () => {
        const req = {body: {username: 'JohnDoe', password: 'password'}}
        const res = {json({token}) {
            expect(token).toBeTruthy()
        }}
        await createNewUser(req, res, () => {})
    })
})