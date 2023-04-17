import {expect, assert} from "chai";
import {describe, it} from "mocha";

import MemberHelper from "../helper/MemberHelper.mjs";
import Member from "../model/Member.mjs";

const memberHelper = new MemberHelper('test');


describe('Testing MemberHelper for checking database operations', () => {
    describe('addMember', () => {
        const member = new Member(
            'Test',
            'TestPerson',
            'test.testperson@example.com',
            '12345678',
            1,
            5,
            '2021-01-01'
        );


        it('should return an object with affectedRows 1', async () => {
            const res = await memberHelper.addMember(member);
            assert.strictEqual(typeof res, 'object');
            assert.strictEqual(res.data.affectedRows, 1);
        })
        it('should return duple entry', async function () {
            try {
                await memberHelper.addMember(member);
            } catch (error) {
                assert.strictEqual(error.code, 'ER_DUP_ENTRY');
            }

        });

        after(async () => {
            await memberHelper.deleteMemberByLastname('TestPerson');
        });


    })


    describe('getAllMembers', () => {
        it('should return an array of members', async () => {
            const members = await memberHelper.getAllMembers();
            assert.isArray(members, 'members is an array');
        });
    });


    describe('getMemberById', () => {
        let memberId;

        before(async () => {
            const member = new Member(
                'Test',
                'TestPerson',
                'test.testperson@example.com',
                '12345678',
                1,
                5,
                '2021-01-01'
            );
            const res = await memberHelper.addMember(member);
            memberId = parseInt(res.data.insertId);

        });
        it('should return a member by id', async () => {
            const member = await memberHelper.getMemberById(memberId);
            assert.strictEqual(typeof member, 'object');
            assert.strictEqual(typeof member.data[0], 'object');
            assert.strictEqual(member.data[0].id, memberId);
        });
        after(async () => {
                await memberHelper.deleteMemberByLastname('TestPerson');
            }
        );
    });
    describe('deleteMemberById', async () => {
        let memberId;
        before(async () => {
            const member = new Member(
                'Test',
                'TestPerson',
                'test.testperson@example.com',
                '12345678',
                1,
                5,
                '2021-01-01'
            );
            const res = await memberHelper.addMember(member);
            memberId = parseInt(res.data.insertId);
        });
        it('should delete a member by id', async () => {
            const res = await memberHelper.deleteMemberById(memberId);
            assert.strictEqual(typeof res, 'object');
            assert.strictEqual(res.data.affectedRows, 1);
            assert.strictEqual(res.success, true);
        });
        it('should not delete a member if id does not exist', async () => {
            const res = await memberHelper.deleteMemberById(-1);
            assert.strictEqual(res.data.affectedRows, 0);

        });
    });
    describe('deleteMemberByLastname', async () => {
        before(async () => {
            const member = new Member(
                'Test',
                'TestPerson',
                'test.testperson@example.com',
                '12345678',
                1,
                5,
                '2021-01-01'
            );
            await memberHelper.addMember(member);
        });
        it('should delete a member by id', async () => {
            const res = await memberHelper.deleteMemberByLastname('TestPerson');
            assert.strictEqual(typeof res, 'object');
            assert.strictEqual(res.data.affectedRows, 1);
            assert.strictEqual(res.success, true);
        });
        it('should not delete a member if id does not exist', async () => {
            const res = await memberHelper.deleteMemberByLastname('Kessler')
            assert.strictEqual(res.data.affectedRows, 0);
        });
    });

    describe('updateMember', async () => {
        let memberId;
        before(async () => {
            const member = new Member(
                'Test',
                'TestPerson',
                'test.testperson@example.com',
                '12345678',
                1,
                5,
                '2021-01-01'
            );
            const res = await memberHelper.addMember(member);
            memberId = parseInt(res.data.insertId);
        });
        it('should update member information in database', async () => {
            const member = new Member(
                'UpdateTest',
                'UpdateTestPerson',
                'Updatetest.testperson@example.com',
                '000012345678',
                0,
                3,
                '2023-01-01'
            );
            await memberHelper.updateMember(memberId, member);

            const updatedMember = await memberHelper.getMemberById(memberId);
            assert.strictEqual(updatedMember.data[0].firstname, 'UpdateTest');
            assert.strictEqual(updatedMember.data[0].lastname, 'UpdateTestPerson');
            assert.strictEqual(updatedMember.data[0].email, 'Updatetest.testperson@example.com');
            assert.strictEqual(updatedMember.data[0].telephone, '000012345678');
            assert.strictEqual(updatedMember.data[0].active, 0);
            assert.strictEqual(updatedMember.data[0].role_id, 3);
            assert.strictEqual(updatedMember.data[0].entry_date.toISOString().slice(0,10), new Date('2023-01-01').toISOString().slice(0,10));

        });
        it('should member not found and return no data', async function () {
                const updatedMember = await memberHelper.getMemberById(-1);
                assert.strictEqual(updatedMember.data.length, 0);
        });

        after(async () => {
                await memberHelper.deleteMemberById(memberId);
            }
        );
    });
    describe('get all member-roles', async () => {
        it('should return an array of member-roles', async () => {
            const memberroles = await memberHelper.getAllMemberRoles();
            assert.isArray(memberroles, 'member-roles is an array');
        });

    });
    describe("create new member payment period for one member", async () => {
        before(async () => {
            const member = new Member(
                'Test',
                'TestPerson',
                'test.testperson@example.com',
                '12345678',
                1,
                5,
                '2021-01-01'
            );
            await memberHelper.addMember(member);
        });
        it('should create a new payment period for a member', async () => {
            const res = await memberHelper.addMemberPaymentPeriod();
            assert.strictEqual(typeof res, 'object');
            assert.strictEqual(res.data.affectedRows, 1);
            assert.strictEqual(res.success, true);
        });
        it('update the payment should return paid ', async () => {
            await memberHelper.updateMemberPayment(1, 1)
            const payment = await memberHelper.getMemberPaymentById(1);
            assert.strictEqual(payment.data[0].id, 1);
            assert.strictEqual(payment.data[0].paid, 1);
        });

        after(async () => {
            await memberHelper.deleteMemberByLastname('TestPerson');
            await memberHelper.resetMemberPaymentTable();
        });
    });


});
