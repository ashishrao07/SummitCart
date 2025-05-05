var {expressjwt:jwt}=require("express-jwt");

function authJwt(){
    const secret=process.env.JSON_WEBTOKEN_SECRET_KEY;
    return jwt({secret:secret,algorithms:["HS256"]}).unless({
        path: [
            // Public routes that don't need auth
            { url: /\/api\/products(.*)/, methods: ['GET'] },
            { url: /\/api\/category(.*)/, methods: ['GET'] },
            { url: /\/api\/subCat(.*)/, methods: ['GET'] },
            "/api/user/signup",
            "/api/user/signin",
            { url: /\/uploads(.*)/, methods: ['GET'] },
            { url: /\/api\/cart\/add(.*)/, methods: ['GET'] },

            { url: /\/api\/checkout(.*)/, methods: ['GET'] },
          ],
    });
}

module.exports=authJwt