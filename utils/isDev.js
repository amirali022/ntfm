const isDev = () => {
	const node_env = process.env[ "NODE_ENV"];

	return Boolean( node_env === "development");
};

module.exports = isDev;