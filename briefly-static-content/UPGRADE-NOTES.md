
# Overview

The purpose of this file is to capture everything related to deprecation warnings and attempts to upgrade specific
libraries in package.json.

# How to Build

FIRST! Upgrade your version of node to ``5.0``, e.g.:

```
$ node -v
v5.0.0
```

# Build Graph

```
briefly-static-content@1.0.0 /Users/alex/proj/github/briefly/briefly-static-content
├─┬ babel-jest@5.3.0
│ └─┬ babel-core@5.8.35
│   ├── babel-plugin-constant-folding@1.0.1
│   ├── babel-plugin-dead-code-elimination@1.0.2
│   ├── babel-plugin-eval@1.0.1
│   ├── babel-plugin-inline-environment-variables@1.0.1
│   ├── babel-plugin-jscript@1.0.4
│   ├── babel-plugin-member-expression-literals@1.0.1
│   ├── babel-plugin-property-literals@1.0.1
│   ├── babel-plugin-proto-to-assign@1.0.4
│   ├── babel-plugin-react-constant-elements@1.0.3
│   ├── babel-plugin-react-display-name@1.0.3
│   ├── babel-plugin-remove-console@1.0.1
│   ├── babel-plugin-remove-debugger@1.0.1
│   ├── babel-plugin-runtime@1.0.7
│   ├─┬ babel-plugin-undeclared-variables-check@1.0.2
│   │ └── leven@1.0.2
│   ├── babel-plugin-undefined-to-void@1.1.6
│   ├── babylon@5.8.35
│   ├── bluebird@2.10.2
│   ├─┬ chalk@1.1.1
│   │ ├─┬ ansi-styles@2.2.0
│   │ │ └── color-convert@1.0.0
│   │ ├── escape-string-regexp@1.0.5
│   │ ├─┬ has-ansi@2.0.0
│   │ │ └── ansi-regex@2.0.0
│   │ ├── strip-ansi@3.0.1
│   │ └── supports-color@2.0.0
│   ├── convert-source-map@1.2.0
│   ├── core-js@1.2.6
│   ├─┬ debug@2.2.0
│   │ └── ms@0.7.1
│   ├─┬ detect-indent@3.0.1
│   │ └── get-stdin@4.0.1
│   ├── esutils@2.0.2
│   ├── fs-readdir-recursive@0.1.2
│   ├── globals@6.4.1
│   ├─┬ home-or-tmp@1.0.0
│   │ ├── os-tmpdir@1.0.1
│   │ └── user-home@1.1.1
│   ├─┬ is-integer@1.0.6
│   │ └─┬ is-finite@1.0.1
│   │   └── number-is-nan@1.0.0
│   ├── js-tokens@1.0.1
│   ├── json5@0.4.0
│   ├─┬ line-numbers@0.2.0
│   │ └── left-pad@0.0.3
│   ├── lodash@3.10.1
│   ├─┬ minimatch@2.0.10
│   │ └─┬ brace-expansion@1.1.3
│   │   ├── balanced-match@0.3.0
│   │   └── concat-map@0.0.1
│   ├── output-file-sync@1.1.1
│   ├── path-exists@1.0.0
│   ├── path-is-absolute@1.0.0
│   ├── private@0.1.6
│   ├─┬ regenerator@0.8.40
│   │ ├─┬ defs@1.1.1
│   │ │ ├─┬ alter@0.2.0
│   │ │ │ └── stable@0.1.5
│   │ │ ├── ast-traverse@0.1.1
│   │ │ ├── breakable@1.0.0
│   │ │ ├── esprima-fb@15001.1001.0-dev-harmony-fb
│   │ │ ├── simple-fmt@0.1.0
│   │ │ ├── simple-is@0.2.0
│   │ │ ├── stringmap@0.2.2
│   │ │ ├── stringset@0.2.1
│   │ │ ├── tryor@0.1.2
│   │ │ └─┬ yargs@3.27.0
│   │ │   ├─┬ cliui@2.1.0
│   │ │   │ ├─┬ center-align@0.1.3
│   │ │   │ │ ├─┬ align-text@0.1.4
│   │ │   │ │ │ ├── kind-of@3.0.2
│   │ │   │ │ │ ├── longest@1.0.1
│   │ │   │ │ │ └── repeat-string@1.5.4
│   │ │   │ │ └── lazy-cache@1.0.3
│   │ │   │ └── right-align@0.1.3
│   │ │   ├─┬ os-locale@1.4.0
│   │ │   │ └─┬ lcid@1.0.0
│   │ │   │   └── invert-kv@1.0.0
│   │ │   ├── window-size@0.1.4
│   │ │   └── y18n@3.2.1
│   │ ├── esprima-fb@15001.1001.0-dev-harmony-fb
│   │ └─┬ recast@0.10.33
│   │   ├── ast-types@0.8.12
│   │   ├── esprima-fb@15001.1001.0-dev-harmony-fb
│   │   └── source-map@0.5.3
│   ├─┬ regexpu@1.3.0
│   │ ├── esprima@2.7.2
│   │ ├── regenerate@1.2.1
│   │ ├── regjsgen@0.2.0
│   │ └─┬ regjsparser@0.1.5
│   │   └── jsesc@0.5.0
│   ├── repeating@1.1.3
│   ├── resolve@1.1.7
│   ├── shebang-regex@1.0.0
│   ├── slash@1.0.0
│   ├── source-map@0.5.3
│   ├─┬ source-map-support@0.2.10
│   │ └── source-map@0.1.32
│   ├── to-fast-properties@1.0.2
│   ├── trim-right@1.0.1
│   └── try-resolve@1.0.1
├─┬ babelify@6.4.0
│ └── object-assign@4.0.1
├── bootstrap@3.3.6
├─┬ browserify@6.3.4
│ ├── assert@1.1.2
│ ├─┬ browser-pack@3.2.0
│ │ ├─┬ combine-source-map@0.3.0
│ │ │ ├── convert-source-map@0.3.5
│ │ │ └─┬ inline-source-map@0.3.1
│ │ │   └── source-map@0.3.0
│ │ ├── defined@0.0.0
│ │ └─┬ through2@0.5.1
│ │   ├── readable-stream@1.0.33
│ │   └── xtend@3.0.0
│ ├── browser-resolve@1.11.1
│ ├─┬ browserify-zlib@0.1.4
│ │ └── pako@0.2.8
│ ├─┬ buffer@2.8.2
│ │ ├── base64-js@0.0.7
│ │ ├── ieee754@1.1.6
│ │ └── is-array@1.0.1
│ ├── builtins@0.0.7
│ ├── commondir@0.0.1
│ ├─┬ concat-stream@1.4.10
│ │ └── typedarray@0.0.6
│ ├─┬ console-browserify@1.1.0
│ │ └── date-now@0.1.4
│ ├── constants-browserify@0.0.1
│ ├─┬ crypto-browserify@3.11.0
│ │ ├─┬ browserify-cipher@1.0.0
│ │ │ ├─┬ browserify-aes@1.0.6
│ │ │ │ └── buffer-xor@1.0.3
│ │ │ ├─┬ browserify-des@1.0.0
│ │ │ │ └─┬ des.js@1.0.0
│ │ │ │   └── minimalistic-assert@1.0.0
│ │ │ └── evp_bytestokey@1.0.0
│ │ ├─┬ browserify-sign@4.0.0
│ │ │ ├── bn.js@4.11.0
│ │ │ ├── browserify-rsa@4.0.1
│ │ │ ├─┬ elliptic@6.2.3
│ │ │ │ ├── brorand@1.0.5
│ │ │ │ └── hash.js@1.0.3
│ │ │ └─┬ parse-asn1@5.0.0
│ │ │   └── asn1.js@4.5.2
│ │ ├── create-ecdh@4.0.0
│ │ ├─┬ create-hash@1.1.2
│ │ │ ├── cipher-base@1.0.2
│ │ │ └── ripemd160@1.0.1
│ │ ├── create-hmac@1.1.4
│ │ ├─┬ diffie-hellman@5.0.2
│ │ │ └── miller-rabin@4.0.0
│ │ ├── pbkdf2@3.0.4
│ │ ├── public-encrypt@4.0.0
│ │ └── randombytes@2.0.3
│ ├── deep-equal@0.2.2
│ ├── defined@0.0.0
│ ├─┬ deps-sort@1.3.9
│ │ └─┬ JSONStream@1.1.1
│ │   └── jsonparse@1.2.0
│ ├── domain-browser@1.1.7
│ ├── duplexer2@0.0.2
│ ├── events@1.0.2
│ ├─┬ glob@4.5.3
│ │ ├─┬ inflight@1.0.4
│ │ │ └── wrappy@1.0.1
│ │ └── once@1.3.3
│ ├─┬ http-browserify@1.7.0
│ │ └── Base64@0.2.1
│ ├── https-browserify@0.0.1
│ ├── inherits@2.0.1
│ ├─┬ insert-module-globals@6.6.3
│ │ ├─┬ combine-source-map@0.6.1
│ │ │ ├── convert-source-map@1.1.3
│ │ │ ├── inline-source-map@0.5.0
│ │ │ ├── lodash.memoize@3.0.4
│ │ │ └── source-map@0.4.4
│ │ ├── is-buffer@1.1.3
│ │ ├─┬ JSONStream@1.1.1
│ │ │ └── jsonparse@1.2.0
│ │ ├─┬ lexical-scope@1.2.0
│ │ │ └── astw@2.0.0
│ │ └── process@0.11.2
│ ├── isarray@0.0.1
│ ├─┬ JSONStream@0.8.4
│ │ └── jsonparse@0.0.5
│ ├─┬ labeled-stream-splicer@1.0.2
│ │ └─┬ stream-splicer@1.3.2
│ │   └── readable-wrap@1.0.0
│ ├─┬ module-deps@3.9.1
│ │ ├── defined@1.0.0
│ │ ├─┬ detective@4.3.1
│ │ │ └── acorn@1.2.2
│ │ ├─┬ JSONStream@1.1.1
│ │ │ └── jsonparse@1.2.0
│ │ ├─┬ parents@1.0.1
│ │ │ └── path-platform@0.11.15
│ │ └─┬ stream-combiner2@1.0.2
│ │   └─┬ through2@0.5.1
│ │     ├── readable-stream@1.0.33
│ │     └── xtend@3.0.0
│ ├── os-browserify@0.1.2
│ ├─┬ parents@0.0.3
│ │ └── path-platform@0.0.1
│ ├── path-browserify@0.0.0
│ ├── process@0.8.0
│ ├── punycode@1.2.4
│ ├── querystring-es3@0.2.1
│ ├─┬ readable-stream@1.1.13
│ │ └── core-util-is@1.0.2
│ ├── resolve@0.7.4
│ ├── shallow-copy@0.0.1
│ ├─┬ shasum@1.0.2
│ │ ├─┬ json-stable-stringify@0.0.1
│ │ │ └── jsonify@0.0.0
│ │ └── sha.js@2.4.5
│ ├── shell-quote@0.0.1
│ ├── stream-browserify@1.0.0
│ ├── string_decoder@0.10.31
│ ├─┬ subarg@1.0.0
│ │ └── minimist@1.2.0
│ ├─┬ syntax-error@1.1.5
│ │ └── acorn@2.7.0
│ ├── through2@1.1.1
│ ├─┬ timers-browserify@1.4.2
│ │ └── process@0.11.2
│ ├── tty-browserify@0.0.0
│ ├─┬ umd@2.1.0
│ │ ├─┬ rfile@1.0.0
│ │ │ ├── callsite@1.0.0
│ │ │ └── resolve@0.3.1
│ │ └─┬ ruglify@1.0.0
│ │   └─┬ uglify-js@2.2.5
│ │     └── optimist@0.3.7
│ ├─┬ url@0.10.3
│ │ ├── punycode@1.3.2
│ │ └── querystring@0.2.0
│ ├── util@0.10.3
│ ├─┬ vm-browserify@0.0.4
│ │ └── indexof@0.0.1
│ └── xtend@3.0.0
├── director@1.2.8
├─┬ envify@3.4.0
│ ├─┬ jstransform@10.1.0
│ │ ├── base62@0.1.1
│ │ ├── esprima-fb@13001.1001.0-dev-harmony-fb
│ │ └── source-map@0.1.31
│ └── through@2.3.8
├─┬ http-server@0.8.5
│ ├── colors@1.0.3
│ ├── corser@2.0.0
│ ├─┬ ecstatic@0.7.6
│ │ ├── he@0.5.0
│ │ ├── mime@1.3.4
│ │ └── url-join@0.0.1
│ ├─┬ http-proxy@1.13.2
│ │ ├── eventemitter3@1.2.0
│ │ └── requires-port@1.0.0
│ ├── opener@1.4.1
│ ├─┬ optimist@0.6.1
│ │ ├── minimist@0.0.10
│ │ └── wordwrap@0.0.2
│ ├─┬ portfinder@0.4.0
│ │ ├── async@0.9.0
│ │ └─┬ mkdirp@0.5.1
│ │   └── minimist@0.0.8
│ └─┬ union@0.4.4
│   └── qs@2.3.3
├── immutable@3.7.6
├─┬ jest-cli@0.4.19
│ ├── bluebird@2.9.34
│ ├── coffee-script@1.10.0
│ ├─┬ cover@0.2.9
│ │ ├─┬ cli-table@0.0.2
│ │ │ └── colors@0.3.0
│ │ ├── underscore@1.2.4
│ │ ├── underscore.string@2.0.0
│ │ └── which@1.0.9
│ ├── diff@1.0.8
│ ├── graceful-fs@2.0.3
│ ├─┬ harmonize@1.4.2
│ │ └── is-iojs@1.1.0
│ ├─┬ istanbul@0.3.22
│ │ ├── abbrev@1.0.7
│ │ ├── async@1.5.2
│ │ ├─┬ escodegen@1.7.1
│ │ │ ├── esprima@1.2.5
│ │ │ ├── estraverse@1.9.3
│ │ │ ├─┬ optionator@0.5.0
│ │ │ │ ├── deep-is@0.1.3
│ │ │ │ ├── fast-levenshtein@1.0.7
│ │ │ │ ├── levn@0.2.5
│ │ │ │ ├── prelude-ls@1.1.2
│ │ │ │ └── type-check@0.3.2
│ │ │ └── source-map@0.2.0
│ │ ├── esprima@2.5.0
│ │ ├─┬ fileset@0.2.1
│ │ │ └── glob@5.0.15
│ │ ├─┬ handlebars@4.0.5
│ │ │ ├── async@1.5.2
│ │ │ ├─┬ optimist@0.6.1
│ │ │ │ └── minimist@0.0.10
│ │ │ ├── source-map@0.4.4
│ │ │ └─┬ uglify-js@2.6.2
│ │ │   ├── async@0.2.10
│ │ │   ├── source-map@0.5.3
│ │ │   └─┬ yargs@3.10.0
│ │ │     └── window-size@0.1.0
│ │ ├─┬ js-yaml@3.5.5
│ │ │ ├─┬ argparse@1.0.7
│ │ │ │ └── sprintf-js@1.0.3
│ │ │ └── esprima@2.7.2
│ │ ├── nopt@3.0.6
│ │ ├─┬ supports-color@3.1.2
│ │ │ └── has-flag@1.0.0
│ │ ├─┬ which@1.2.4
│ │ │ ├─┬ is-absolute@0.1.7
│ │ │ │ └── is-relative@0.1.3
│ │ │ └── isexe@1.1.2
│ │ └── wordwrap@1.0.0
│ ├─┬ jasmine-only@0.1.0
│ │ └── coffee-script@1.6.3
│ ├── jasmine-pit@2.0.2
│ ├─┬ jsdom@0.10.6
│ │ ├─┬ contextify@0.1.15
│ │ │ ├── bindings@1.2.1
│ │ │ └── nan@2.2.0
│ │ ├── cssom@0.3.1
│ │ ├── cssstyle@0.2.34
│ │ ├─┬ htmlparser2@3.9.0
│ │ │ ├── domelementtype@1.3.0
│ │ │ ├── domhandler@2.3.0
│ │ │ ├─┬ domutils@1.5.1
│ │ │ │ └─┬ dom-serializer@0.1.0
│ │ │ │   └── domelementtype@1.1.3
│ │ │ ├── entities@1.1.1
│ │ │ └─┬ readable-stream@2.0.6
│ │ │   ├── isarray@1.0.0
│ │ │   ├── process-nextick-args@1.0.6
│ │ │   └── util-deprecate@1.0.2
│ │ ├── nwmatcher@1.3.7
│ │ ├─┬ request@2.69.0
│ │ │ ├── aws-sign2@0.6.0
│ │ │ ├─┬ aws4@1.3.2
│ │ │ │ └─┬ lru-cache@4.0.0
│ │ │ │   ├── pseudomap@1.0.2
│ │ │ │   └── yallist@2.0.0
│ │ │ ├─┬ bl@1.0.3
│ │ │ │ └─┬ readable-stream@2.0.6
│ │ │ │   └── isarray@1.0.0
│ │ │ ├── caseless@0.11.0
│ │ │ ├─┬ combined-stream@1.0.5
│ │ │ │ └── delayed-stream@1.0.0
│ │ │ ├── extend@3.0.0
│ │ │ ├── forever-agent@0.6.1
│ │ │ ├─┬ form-data@1.0.0-rc4
│ │ │ │ └── async@1.5.2
│ │ │ ├─┬ har-validator@2.0.6
│ │ │ │ ├─┬ is-my-json-valid@2.13.1
│ │ │ │ │ ├── generate-function@2.0.0
│ │ │ │ │ ├─┬ generate-object-property@1.2.0
│ │ │ │ │ │ └── is-property@1.0.2
│ │ │ │ │ └── jsonpointer@2.0.0
│ │ │ │ └─┬ pinkie-promise@2.0.0
│ │ │ │   └── pinkie@2.0.4
│ │ │ ├─┬ hawk@3.1.3
│ │ │ │ ├── boom@2.10.1
│ │ │ │ ├── cryptiles@2.0.5
│ │ │ │ ├── hoek@2.16.3
│ │ │ │ └── sntp@1.0.9
│ │ │ ├─┬ http-signature@1.1.1
│ │ │ │ ├── assert-plus@0.2.0
│ │ │ │ ├─┬ jsprim@1.2.2
│ │ │ │ │ ├── extsprintf@1.0.2
│ │ │ │ │ ├── json-schema@0.2.2
│ │ │ │ │ └── verror@1.3.6
│ │ │ │ └─┬ sshpk@1.7.4
│ │ │ │   ├── asn1@0.2.3
│ │ │ │   ├─┬ dashdash@1.13.0
│ │ │ │   │ └── assert-plus@1.0.0
│ │ │ │   ├── ecc-jsbn@0.1.1
│ │ │ │   ├── jodid25519@1.0.2
│ │ │ │   ├── jsbn@0.1.0
│ │ │ │   └── tweetnacl@0.14.1
│ │ │ ├── is-typedarray@1.0.0
│ │ │ ├── isstream@0.1.2
│ │ │ ├── json-stringify-safe@5.0.1
│ │ │ ├─┬ mime-types@2.1.10
│ │ │ │ └── mime-db@1.22.0
│ │ │ ├── node-uuid@1.4.7
│ │ │ ├── oauth-sign@0.8.1
│ │ │ ├── qs@6.0.2
│ │ │ ├── stringstream@0.0.5
│ │ │ ├── tough-cookie@2.2.2
│ │ │ └── tunnel-agent@0.4.2
│ │ └── xmlhttprequest@1.8.0
│ ├─┬ lodash.template@3.6.2
│ │ ├── lodash._basecopy@3.0.1
│ │ ├── lodash._basetostring@3.0.1
│ │ ├── lodash._basevalues@3.0.0
│ │ ├── lodash._isiterateecall@3.0.9
│ │ ├── lodash._reinterpolate@3.0.0
│ │ ├─┬ lodash.escape@3.2.0
│ │ │ └── lodash._root@3.0.1
│ │ ├─┬ lodash.keys@3.1.2
│ │ │ ├── lodash._getnative@3.9.1
│ │ │ ├── lodash.isarguments@3.0.8
│ │ │ └── lodash.isarray@3.0.4
│ │ ├── lodash.restparam@3.6.1
│ │ └── lodash.templatesettings@3.1.1
│ ├─┬ node-haste@1.2.8
│ │ └── esprima-fb@4001.1001.0-dev-harmony-fb
│ ├─┬ node-worker-pool@2.4.5
│ │ └── q@0.9.7
│ ├── object-assign@3.0.0
│ ├─┬ optimist@0.6.1
│ │ └── minimist@0.0.10
│ └── resolve@0.6.3
├─┬ react@0.14.7
│ └─┬ fbjs@0.6.1
│   ├─┬ loose-envify@1.1.0
│   │ └── js-tokens@1.0.2
│   ├─┬ promise@7.1.1
│   │ └── asap@2.0.3
│   ├── ua-parser-js@0.7.10
│   └── whatwg-fetch@0.9.0
├─┬ reactify@0.15.2
│ ├─┬ jstransform@6.3.2
│ │ └── esprima-fb@6001.1.0-dev-harmony-fb
│ └─┬ react-tools@0.12.2
│   ├─┬ commoner@0.10.4
│   │ ├─┬ commander@2.9.0
│   │ │ └── graceful-readlink@1.0.1
│   │ ├── graceful-fs@4.1.3
│   │ ├── iconv-lite@0.4.13
│   │ └── q@1.4.1
│   └─┬ jstransform@8.2.0
│     └── esprima-fb@8001.1001.0-dev-harmony-fb
├── rsvp@3.2.1
├── rsvp-ajax@1.0.2
├── rsvp-cache@1.0.0
├─┬ uglify-js@2.4.24
│ ├── async@0.2.10
│ ├─┬ source-map@0.1.34
│ │ └── amdefine@1.0.0
│ ├── uglify-to-browserify@1.0.2
│ └─┬ yargs@3.5.4
│   ├── camelcase@1.2.1
│   ├── decamelize@1.2.0
│   └── window-size@0.1.0
└─┬ watchify@2.6.2
  ├─┬ browserify@9.0.8
  │ ├── assert@1.3.0
  │ ├─┬ browser-pack@4.0.4
  │ │ ├── defined@1.0.0
  │ │ ├─┬ JSONStream@1.1.1
  │ │ │ └── jsonparse@1.2.0
  │ │ └── umd@3.0.1
  │ ├─┬ buffer@3.6.0
  │ │ ├── base64-js@0.0.8
  │ │ └── isarray@1.0.0
  │ ├── deep-equal@1.0.1
  │ ├── defined@0.0.0
  │ ├── glob@4.5.3
  │ ├─┬ has@1.0.1
  │ │ └── function-bind@1.1.0
  │ ├─┬ JSONStream@0.10.0
  │ │ └── jsonparse@0.0.5
  │ ├── parents@1.0.1
  │ ├── process@0.10.1
  │ ├── read-only-stream@1.1.1
  │ ├─┬ through2@1.1.1
  │ │ └── xtend@4.0.1
  │ └── xtend@3.0.0
  ├─┬ chokidar@0.12.6
  │ ├── async-each@0.1.6
  │ ├── fsevents@0.3.8
  │ └─┬ readdirp@1.3.0
  │   ├── graceful-fs@2.0.3
  │   ├─┬ minimatch@0.2.14
  │   │ ├── lru-cache@2.7.3
  │   │ └── sigmund@1.0.1
  │   └── readable-stream@1.0.33
  ├─┬ through2@0.5.1
  │ ├── readable-stream@1.0.33
  │ └── xtend@3.0.0
  └── xtend@4.0.1
```


# Build Warnings

```
https://fb.me/react-tools-deprecated


npm WARN engine jest-cli@0.4.19: wanted: {"node":"0.8.x || 0.10.x"} (current: {"node":"5.0.0","npm":"3.3.9"})
npm WARN deprecated graceful-fs@2.0.3: graceful-fs version 3 and before will fail on newer node releases. Please update to graceful-fs@^4.0.0 as soon as possible.
npm WARN deprecated react-tools@0.12.2: react-tools is deprecated. For more information, visit https://fb.me/react-tools-deprecated
npm WARN prefer global coffee-script@1.10.0 should be installed with -g
npm WARN prefer global cover@0.2.9 should be installed with -g
npm WARN prefer global react-tools@0.12.2 should be installed with -g
```
