const ws = require("ws");

module.exports = {
	ws: ws,
	wss: new ws.Server({ port: 30001 }),
	ModuleImports: new Map(),
	ModuleType: new Map(),
};
