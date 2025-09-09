import { createServer } from 'http';
import { sendOneStaticFile, setStaticFilesRoutes } from './staticFiles.js';



const HOSTNAME = 'localhost';
const PORT = 8000;



const server = createServer(function (req, res)
{
	let wasResponseSent: boolean;

	wasResponseSent = setStaticFilesRoutes(req, res, [
		{ pathnameBase: '/scripts/', directory: './dist/client/' },
		{ pathnameBase: '/assets/', directory: './public/' }
	]);

	if (wasResponseSent)
	{
		return;
	}

	console.log("Cette phrase ne devrait pas être affichée...");

	sendOneStaticFile(req, res, './public/hello-world.html');
});



server.listen(PORT, HOSTNAME, () => console.log(`Server running on http://${HOSTNAME}:${PORT}/...`));
