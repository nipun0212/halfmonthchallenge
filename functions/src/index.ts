import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebase from 'firebase';
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
admin.initializeApp()
firebase.initializeApp({
    apiKey: "AIzaSyA5tdlgIiYr_mNysqUtJCQVWJNvL03gYY8",
    authDomain: "onemonthchallenge-fb0e8.firebaseapp.com",
    databaseURL: "https://onemonthchallenge-fb0e8.firebaseio.com",
    projectId: "onemonthchallenge-fb0e8",
    storageBucket: "onemonthchallenge-fb0e8.appspot.com",
    messagingSenderId: "880770890224"
})


// interface data {
//     role: number,
//     email: string,
//     organization: string
// }
// interface roles{
//     1: string;
//     2: string;
//     3: string;
//     4: string;
//     5: string;
//     6: string;
//     [key: number]: string;
// }
export const helloWorld = functions.https.onRequest((request, response) => {
    console.log("nipun")
    // admin.firestore().doc('employees/1').get().then(s => {
    //     const data = s.data()
    firebase.firestore().doc('employees/1').get().then(s => {
        const data = s.data()
        admin.firestore().doc('employees/1').create({
            "Name": "Nipun"
        }).then(x => {
            console.log(x)
            response.send(data)
        }).catch(err => {
            console.log(err)
        })
    }).catch(err => {
        console.log(err)
    })
});

export const employeeAdded = functions.firestore.document('employees/{emp_id}').onCreate((snap, context) => {
    // console.log(snap);
    // console.log(context);
    console.log("A new employee added");
})

export const getEmployee = functions.https.onRequest(async (request, response) => {
    console.log("nipuneee")
    // console.log(request)
    try {
        // const s = await admin.firestore().doc('employees/1').get()
        const s = await firebase.firestore().doc('employees/1').get()
        const data = s.data()
        const n = await admin.firestore().doc('employees/2').set({
            "Name": "nipun"
        }, { merge: false })
        console.log(n)
        // console.log(s)
        response.send(data)
    }
    catch (error) {
        console.log(error)
    }
})
/**
 Set's authentication custom claims for user
 */
// export const sample = functions.https.onRequest(async (data, context) => {
//     console.log("await dsdds")
//     try {
//         // await admin.auth().generateSignInWithEmailLink("annubajaj89@gmail.com", {
//         //     handleCodeInApp: false,
//         //     url: "https://onemonthchallenge-fb0e8.firebaseapp.com"
//         // }).then(x => {
//         //     console.log("generateSignInWithEmailLink")
//         //     console.log(x)
//         // })
//         // await firebase.auth().sendSignInLinkToEmail("annubajaj89@gmail.com", {
//         //     handleCodeInApp: true,
//         //     url: "https://onemonthchallenge-fb0e8.firebaseapp.com"
//         // })

//         const userRecord: any = await admin.auth().getUserByEmail("annubajaj89@gmail.com").catch(async err => {
//             console.log("err")
//             console.log(err)
//             console.log(err.errorInfo)
//             // console.log(err.errorInfo.code)
//             console.log(err["errorInfo"])
//             console.log(err["errorInfo"]["code"])
//             if (err["errorInfo"]["code"] = "auth/user-not-found") {
//                 console.log("New user creation")
//                 return await admin.auth().createUser({
//                     email: "annubajaj89@gmail.com"
//                 }).then(x => {
//                     console.log("Get UUID")
//                     console.log(x)
//                     return x
//                 })
//             }
//             throw new functions.https.HttpsError("internal", err) 
//         });
//         console.log("userRecordsss");
//         console.log(userRecord);
//         await admin.auth().setCustomUserClaims(userRecord.uid, {
//             org: "sjksksj"
//         }).then(x => {
//             console.log("setCustomUserClaims")
//             console.log(x)
//         });
//         console.log(userRecord);
//     }
//     catch (err) {
//         console.log(err)
//         // console.log(err.errorInfo)
//         // console.log(err.errorInfo.code)
//         console.log(err["errorInfo"])
//         console.log(err["errorInfo"]["code"])
//         if (err["errorInfo"]["code"] = "auth/user-not-found") {
//             console.log("Exit Gracefully")
//         }
//         return "dsmd,"
//     }
//     return "dsmd,"
// })
export const sample = functions.https.onRequest(async (data, context) => {
    console.log("await dsdds")
    try {
        // await admin.auth().generateSignInWithEmailLink("annubajaj89@gmail.com", {
        //     handleCodeInApp: false,
        //     url: "https://onemonthchallenge-fb0e8.firebaseapp.com"
        // }).then(x => {
        //     console.log("generateSignInWithEmailLink")
        //     console.log(x)
        // })
        // await firebase.auth().sendSignInLinkToEmail("annubajaj89@gmail.com", {
        //     handleCodeInApp: true,
        //     url: "https://onemonthchallenge-fb0e8.firebaseapp.com"
        // })

        const userRecord: any = await admin.auth().getUserByEmail("annubajaj89@gmail.com").catch(async err => {
            console.log("err")
            console.log(err)
            console.log(err.errorInfo)
            // console.log(err.errorInfo.code)
            console.log(err["errorInfo"])
            console.log(err["errorInfo"]["code"])
            if (err["errorInfo"]["code"] = "auth/user-not-found") {
                console.log("New user creation")
                return await admin.auth().createUser({
                    email: "annubajaj89@gmail.com"
                }).then(x => {
                    console.log("Get UUID")
                    console.log(x)
                    return x
                })
            }
            throw new functions.https.HttpsError("internal", err)
        });
        console.log("userRecordsss");
        console.log(userRecord);
        await admin.auth().setCustomUserClaims(userRecord.uid, {
            org: "sjksksj"
        }).then(x => {
            console.log("setCustomUserClaims")
            console.log(x)
        });
        console.log(userRecord);
    }
    catch (err) {
        console.log(err)
        // console.log(err.errorInfo)
        // console.log(err.errorInfo.code)
        console.log(err["errorInfo"])
        console.log(err["errorInfo"]["code"])
        if (err["errorInfo"]["code"] = "auth/user-not-found") {
            console.log("Exit Gracefully")
        }
        return "dsmd,"
    }
    return "dsmd,"
})



interface roles {
    isOwner?: boolean | undefined;
    isPrincipal?: boolean | undefined;
    isAdmin?: boolean | undefined;
    isTeacher?: boolean | undefined;
    isStudent?: boolean | undefined;
    isGurdian?: boolean | undefined;
    [key: string]: boolean | undefined;
}
// interface setCustomClaims {
//     email: string;
//     customClaims: {
//         organization: string;
//         roles: roles
//         contactNumber?: string
//         studentId?: string;
//         guardianId?: string;
//     }
// }
interface setCustomClaims {
    email: string;
    customClaims: {
        organizationId: string;
        roles: roles
        contactNumber?: string
        studentId?: string;
        guardianId?: string;
    }
}
function checkForMutipleRoles(role: roles) {
    let countTrue = 0
    for (const key in role) {
        if (role.hasOwnProperty(key)) {
            const val = role[key];
            if (val === true) {
                countTrue += 1
            }
            console.log(val);
        }
    }
    if (countTrue !== 1) {
        return -1
    }
    else {
        return 1
    }
}
export const setCustomClaims = functions.https.onCall(async (data: setCustomClaims, context) => {
    console.log("Function Execution Started")
    console.log(data)
    console.log(data.customClaims)
    const customClaimObj = {
        organizationId: data.customClaims.organizationId,
        roles: {
            isOwner: data.customClaims.roles.isOwner,
            isPrincipal: data.customClaims.roles.isPrincipal,
            isAdmin: data.customClaims.roles.isAdmin,
            isTeacher: data.customClaims.roles.isTeacher,
            isStudent: data.customClaims.roles.isStudent,
            isGurdian: data.customClaims.roles.isGurdian
        }
    }
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "You are not logged In");
    }
    try {
        const globalAdmin: any = (await admin.auth().getUserByEmail("nipunmadan19@gmail.com"));
        const effectingUserCustomClaims = context.auth.token
        if (effectingUserCustomClaims.uid !== globalAdmin.uid && customClaimObj.organizationId !== effectingUserCustomClaims.organization) {
            throw new functions.https.HttpsError("invalid-argument", "Invalid organization Id given");
        }
        if (checkForMutipleRoles(data.customClaims.roles) === -1) {
            throw new functions.https.HttpsError("invalid-argument", "Multiple Roles can't be Given");
        }
        const rolesObj = data.customClaims.roles;
        let role: string = ''
        for (const key in rolesObj) {
            if (rolesObj.hasOwnProperty(key)) {
                const val = rolesObj[key];
                role = key
                switch (true) {
                    case (key === "isOwner" && val === true): {
                        if (!(effectingUserCustomClaims.uid === globalAdmin.uid)) {
                            throw new functions.https.HttpsError("invalid-argument", "You done have enough rights to peroform this action");
                        }
                        break;
                    }
                    case (key === "isPrincipal" && val === true): {
                        if (!(effectingUserCustomClaims.uid === globalAdmin.uid || effectingUserCustomClaims.role.isOwner === true)) {
                            throw new functions.https.HttpsError("invalid-argument", "You done have enough rights to peroform this action");
                        }
                        break;
                    }
                    case (key === "isAdmin" && val === true): {
                        if (!(effectingUserCustomClaims.uid === globalAdmin.uid ||
                            effectingUserCustomClaims.role.isOwner === true || effectingUserCustomClaims.role.isPrincipal === true)) {
                            throw new functions.https.HttpsError("invalid-argument", "You done have enough rights to peroform this action");
                        }
                        break;
                    }
                    case (key === "isTeacher" && val === true): {
                        if (!(effectingUserCustomClaims.uid === globalAdmin.uid ||
                            effectingUserCustomClaims.role.isOwner === true || effectingUserCustomClaims.role.isPrincipal === true ||
                            effectingUserCustomClaims.role.isAdmin === true)) {
                            throw new functions.https.HttpsError("invalid-argument", "You done have enough rights to peroform this action");
                        }
                        break;
                    }
                    case (key === "isStudent" && val === true): {
                        if (!(effectingUserCustomClaims.uid === globalAdmin.uid ||
                            effectingUserCustomClaims.role.isOwner === true || effectingUserCustomClaims.role.isPrincipal === true ||
                            effectingUserCustomClaims.role.isAdmin === true)) {
                            throw new functions.https.HttpsError("invalid-argument", "You done have enough rights to peroform this action");
                        }
                        break;
                    }
                    case (key === "isGurdian" && val === true): {
                        if (!(effectingUserCustomClaims.uid === globalAdmin.uid ||
                            effectingUserCustomClaims.role.isOwner === true || effectingUserCustomClaims.role.isPrincipal === true ||
                            effectingUserCustomClaims.role.isAdmin === true)) {
                            throw new functions.https.HttpsError("invalid-argument", "You done have enough rights to peroform this action");
                        }
                        break;
                    }
                }
            }
        }
        const effectedUser = await admin.auth().getUserByEmail(data.email).catch(async err => {
            if (err["errorInfo"]["code"] === "auth/user-not-found") {
                console.log("New user creation")
                return await admin.auth().createUser({
                    email: data.email
                })
            }
            throw new functions.https.HttpsError("internal", "User Creation with email " + data.email + " failed");
        })
        console.log("effectedUser")
        console.log(effectedUser)
        await admin.auth().setCustomUserClaims(effectedUser.uid, customClaimObj)
        return "User with email " + data.email + " given role " + role
    }
    catch (err) {
        throw new functions.https.HttpsError("internal", err)
    }
});

export const registerOrganization = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
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
        const organizationCount = await firebase.firestore().collection('Organizations').doc('counts').get();
        if (organizationCount.exists && organizationCount.data() !== undefined) {
            orgcounts.organizationCount = organizationCount.data()!.organizationCount + 1
            organization.organizationId = (orgcounts.organizationCount).toString()
        }
        await firebase.firestore().collection('Organizations').doc('counts').set(orgcounts, { merge: true })
        await firebase.firestore().collection('Organizations').
            doc((orgcounts.organizationCount).toString()).
            set(organization, { merge: true })
        // await firebase.functions().httpsCallable('setCustomClaims')({
        //     email: organization.email,
        //     customClaims: {
        //         roles: {
        //             isOwner: true
        //         },
        //         organizationId: organization.organizationId
        //     }
        // }).then(x => {
        //     console.log(x)
        // }).catch(err => {
        //     throw new functions.https.HttpsError("internal", err);
        // })
    }
    catch (err) {
        throw new functions.https.HttpsError("internal", "end" + err);
    }
})