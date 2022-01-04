import getNewsData from "../../../functions/getNewsData";

const handler = async (req, res) => {
	if (req.method === "POST") {
		try {
			let sites = req.body.sites;
			let topic = req.body.topic;

			getNewsData(sites, topic).then((dataOutput) => {
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json"); // content type
				res.end(JSON.stringify(dataOutput));
			});
		} catch (err) {
			res.json(err);
			res.status(500).end();
			return;
		}
	} else {
		res.setHeader("Allow", "POST");
		res.status(405).end("Method Not Allowed");
	}
};

export default handler;
