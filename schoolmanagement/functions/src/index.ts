import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp()

export const setCustomClaimsForSuperAdmin = functions.https.onRequest(async (request, response) => {
    const customClaimObj = {
        role: 'superAdmin',
    }
    await admin.auth().setCustomUserClaims((await admin.auth().getUserByEmail("nipunmadan19@gmail.com")).uid, customClaimObj)
})
exports.giveOwnerRoleToOrganizationUser = functions.firestore.document('Organizations/{organization}').onWrite(async (change, context) => {
    const effectedUserEmail = change.after.data()!.email;
    console.log("context")
    console.log(context)
    const customClaimObj = {
        role: 'owner',
        organizationId: context.params.organization
    }
    const effectedUser = await admin.auth().getUserByEmail(effectedUserEmail).catch(async err => {
        if (err["errorInfo"]["code"] === "auth/user-not-found") {
            console.log("New user creation")
            return await admin.auth().createUser({
                email: effectedUserEmail
            })
        }
        throw new functions.https.HttpsError("internal", "User Creation with email " + effectedUserEmail + " failed");
    })
    console.log("effectedUser")
    await admin.auth().setCustomUserClaims(effectedUser.uid, customClaimObj)
    await admin.firestore().collection('Organizations').doc(context.params.organization).collection("Users").doc(effectedUser.uid).set({
        email: change.after.data()!.email,
        organizationId: context.params.organization,
        isOwner: true,
        phoneNumber: change.after.data()!.contactNumber,
        uid: effectedUser.uid
    })
    const organization = await admin.firestore().collection('Organizations').doc(context.params.organization).get()
    console.log("organization")
    console.log(organization)
    console.log("User with email " + effectedUserEmail + " given role " + 'owner')
})

export const registerOrganization = functions.https.onCall(async (data, context) => {
    if (!context.auth && context.auth!.uid !== '0Ba2tjJjUlYXFiAD3Zsq8eaFGmf2') {
        throw new functions.https.HttpsError("unauthenticated", "You are not logged In");
    }
    console.log("organizationCount")
    const orgcounts = {
        organizationCount: 0
    }
    // const organization = {
    //     name: 'shivedale',
    //     phoneNumber: '32323',
    //     organizationId: "1",
    //     email: 'dnsndm'

    // }
    const organization = data.organization
    // let organizationCount = await firebase.firestore().doc('Organizations/count/organizationCount').get()
    try {
        await admin.firestore().collection('Organizations').
            doc((orgcounts.organizationCount).toString()).
            set(organization, { merge: true })
    }
    catch (err) {
        throw new functions.https.HttpsError("internal", "end" + err);
    }
})

exports.updateOrganizationCountandId = functions.firestore.document('Organizations/{organization}').onCreate(async (change, context) => {
    const organizationCount = await admin.firestore().collection('Organizations').doc('counts').get();
    if (change.data() === undefined) {
        throw new functions.https.HttpsError("internal", "end");
    }
    const orgcounts = {
        organizationCount: 0
    }
    if (organizationCount.exists && organizationCount.data() !== undefined) {
        orgcounts.organizationCount = organizationCount.data()!.organizationCount + 1
    }
    console.log("context")
    console.log(context)
    console.log("context.params")
    console.log(context.params)
    await admin.firestore().collection('Organizations').doc(context.params.organization).set({
        organizationId: orgcounts.organizationCount,

    }, { merge: true })
    await admin.firestore().collection('Organizations').doc('counts').set(orgcounts,
        { merge: true })
})