System.config({
    packages: {
        "dist/js": {
            "defaultExtension": "js",
            "main": "config"
        }
    },
    map:{
        'jquery': 'node_modules/jquery/dist/jquery.js'
    }
})

System.import("dist/js");