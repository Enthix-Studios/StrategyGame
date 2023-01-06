const ws = require("ws");

module.exports = {
	ws: ws,
	wss: new ws.Server({ port: 30000 }),
	ModuleImports: new Map(),
	ModuleType: new Map(),
};
