export default function hello(req, res) {
	res.status(200).json({ name: 'John Doe' });
}
