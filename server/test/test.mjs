import {expect, assert} from "chai";
import {describe, it} from "mocha";
import MemberHelper from "../helper/MemberHelper.mjs";
import Member from "../model/Member.mjs";
import {memberDataSanitzer} from "../middleware/inputSanitizer.mjs";
import {
    checkActive,
    checkEmail, checkEntryDate,
    checkFirstname,
    checkLastname,
    checkRoleId,
    checkTelephone
} from "../services/FieldChecker.mjs";

const memberHelper = new MemberHelper('test');

describe('check the memberDataSanitizer', () => {
    it('should sanitize member data fields', () => {
        const req = {
            body: {
                firstname: '<script>alert("XSS attack!");</script>',
                lastname: '<img src="not_an_image.jpg" onerror="alert(\'XSS attack!\');">',
                email: 'example@<script>malicious.com</script>',
                telephone: '1234<script>alert("XSS attack!");</script>'
            }
        };

        const expected = {
            firstname: '',
            lastname: '',
            email: 'example@',
            telephone: '1234'
        };

        memberDataSanitzer(req, null, () => {
            assert.deepEqual(req.body, expected);
        });
    });

})

describe('checkFirstname from validateMemberData', () => {
    it('should return an error if the firstname is missing',  () => {
        const error = checkFirstname('');
        assert.deepEqual(error, {firstname: 'Vorname ist erforderlich.'});
    });
    it('should return an error if the firstname is longer than 50 characters', () => {
        const error = checkFirstname('Thisfirstnameislongerthanfiftycharacterssoitshouldtriggeranerror');
        assert.deepEqual(error, { firstname: 'Vorname darf maximal 50 Zeichen lang sein.' });
    });
    it('should not return an error if the firstname is valid', () => {
        const error = checkFirstname('John');
        assert.deepEqual(error, {});
    });
});

describe('checkLastname from validateMemberData', () => {
    it('should return an error if the lastname is missing', () => {
        const error = checkLastname('');
        assert.deepEqual(error, { lastname: 'Nachname ist erforderlich.' });
    });

    it('should return an error if the lastname is longer than 50 characters', () => {
        const error = checkLastname('Thislastnameislongerthanfiftycharacterssoitshouldtriggeranerror');
        assert.deepEqual(error, { lastname: 'Nachname darf maximal 50 Zeichen lang sein.' });
    });

    it('should not return an error if the lastname is valid', () => {
        const error = checkLastname('Doe');
        assert.deepEqual(error, {});
    });
});
describe('checkEmail from validateMemberData', () => {
    it('should return an error if the email is missing', () => {
        const error = checkEmail('');
        assert.deepEqual(error, { email: 'E-Mail-Adresse ist ungültig.' });
    });

    it('should return an error if the email is invalid', () => {
        const error = checkEmail('invalidemail');
        assert.deepEqual(error, { email: 'E-Mail-Adresse ist ungültig.' });
    });

    it('should not return an error if the email is valid', () => {
        const error = checkEmail('john@example.com');
        assert.deepEqual(error, {});
    });
});
describe('checkTelephone from from validateMemberData', () => {
    it('should not return an error if the telephone is missing', () => {
        const error = checkTelephone('');
        assert.deepEqual(error, {});
    });

    it('should return an error if the telephone is invalid', () => {
        const error = checkTelephone('123');
        assert.deepEqual(error, { telephone: 'Telefonnummer ist ungültig.' });
    });
    it('should return an error if the telephone is invalid with whitespace', () => {
        const error = checkTelephone('123 123');
        assert.deepEqual(error, { telephone: 'Telefonnummer ist ungültig.' });
    });
    it('should return an error if the telephone is invalid with letters', () => {
        const error = checkTelephone('acbdefghij');
        assert.deepEqual(error, { telephone: 'Telefonnummer ist ungültig.' });
    });
    it('should  return an error if the telephone is to long', () => {
        const error = checkTelephone('004941156901');
        assert.deepEqual(error, { telephone: 'Telefonnummer ist ungültig.' });
    });
    it('should not return an error if the telephone is valid', () => {
        const error = checkTelephone('00494115690');
        assert.deepEqual(error, {});
    });

});
describe('checkActive from from validateMemberData', () => {
    it('should not return an error if active is valid',  () =>  {
        assert.deepEqual(checkActive(true), {});
        assert.deepEqual(checkActive(false), {});
        assert.deepEqual(checkActive(0), {});
        assert.deepEqual(checkActive(1), {});
    });

    it('should return an error object if active is an invalid value',  () => {
        assert.deepEqual(checkActive('invalid'), { active: 'Aktives Flag muss true, false, 0 oder 1 sein.' });
        assert.deepEqual(checkActive('1'), { active: 'Aktives Flag muss true, false, 0 oder 1 sein.' });
        assert.deepEqual(checkActive(2), { active: 'Aktives Flag muss true, false, 0 oder 1 sein.' });
        assert.deepEqual(checkActive(-1), { active: 'Aktives Flag muss true, false, 0 oder 1 sein.' });
    });
});
describe('checkRoleId from from validateMemberData', () => {
    it('should return an error object when roleId is not a number', () => {
        const error = checkRoleId('not a number');
        assert.deepEqual(error, { role_id: 'Rolle ist ungültig.' })
    });

    it('should return an error object when roleId is less than 1', () => {
        const error = checkRoleId(0);
        assert.deepEqual(error, { role_id: 'Rolle ist ungültig.' })
    });

    it('should return an error object when roleId is greater than 5', () => {
        const error = checkRoleId(6);
        assert.deepEqual(error, { role_id: 'Rolle ist ungültig.' })
    });

    it('should not return an error object when roleId is valid', () => {
        const result = checkRoleId(3);
        assert.deepEqual(result, {});
    });
});
describe('checkEntryDate from from validateMemberData', () => {
    it('should return an error object when entryDate is not a string', () =>  {
        const error = checkEntryDate(123);
        assert.deepEqual(error, { entry_date: 'Eintrittsdatum ist erforderlich.' })
    });

    it('should return an error object when entryDate is an empty string', () => {
        const error = checkEntryDate('');
        assert.deepEqual(error, { entry_date: 'Eintrittsdatum ist erforderlich.' })
    });

    it('should return an error object when entryDate is too long', () => {
        const error = checkEntryDate('2022-05-15T12:00:00Z');
        assert.deepEqual(error, { entry_date: 'Eintrittsdatum darf maximal 10 Zeichen lang sein.' })
    });

    it('should not return an error object when entryDate is valid', () => {
        const error = checkEntryDate('2022-05-15');
        assert.deepEqual(error, {});
    });
});




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
