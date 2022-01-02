export default function healthcheck(req, res) {
	res.status(200).json({ status: 'ok' })
};
