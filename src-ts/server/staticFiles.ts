import { type IncomingMessage, type ServerResponse } from 'http';
import { type ReadStream, createReadStream } from 'fs';
import mime from 'mime';



function getMIMEType(pathname: string): string | null
{
	if (pathname.endsWith('.cjs'))
	{
		return 'text/javascript';
	}

	return mime.getType(pathname);
}



export function sendOneStaticFile
(
	req: IncomingMessage,
	res: ServerResponse<IncomingMessage> & {req: IncomingMessage},
	filePathname: string
): void
{
	let reqPathname: string;
	let stream: ReadStream;


	reqPathname = (req.url as string).split('?')[0];

	stream = createReadStream(filePathname);


	res.statusCode = 200;
	res.setHeader('Content-Type', getMIMEType(filePathname) ?? 'text/plain');

	stream.on('error', function ()
	{
		if (!res.headersSent)
		{
			res.statusCode = 200;
			res.setHeader('Content-Type', 'text/plain');
		}

		res.end(`Error: ${reqPathname} not founded\n`);

		return true;
	});
	
	stream.pipe(res);
}



export function setStaticFilesRoute
(
	req: IncomingMessage,
	res: ServerResponse<IncomingMessage> & {req: IncomingMessage},
	pathnameBase: string,
	directory: string
): boolean
{
	let reqPathname: string;
	let filename: string;


	reqPathname = (req.url as string).split('?')[0];


	if (reqPathname.startsWith(pathnameBase))
	{
		filename = reqPathname.slice(pathnameBase.length);

		if (!filename)
		{
			res.statusCode = 404;
			res.setHeader('Content-Type', 'text/plain');
			res.end('Error: no filename provided\n');

			return true;
		}

		sendOneStaticFile(req, res, directory + filename);

		return true;
	}

	return false;
}



export function setStaticFilesRoutes
(
	req: IncomingMessage,
	res: ServerResponse<IncomingMessage> & {req: IncomingMessage},
	staticRoutes: Array<{pathnameBase: string, directory: string}>
): boolean
{
	let wasResponseSent: boolean;


	for (const { pathnameBase, directory } of staticRoutes)
	{
		wasResponseSent = setStaticFilesRoute(req, res, pathnameBase, directory);

		if (wasResponseSent)
		{
			return true;
		}
	}

	return false;
}
