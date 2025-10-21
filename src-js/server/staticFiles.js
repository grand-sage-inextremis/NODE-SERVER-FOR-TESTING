import { createReadStream } from 'fs';
import mime from 'mime';



function getMIMEType(pathname)
{
	if (pathname.endsWith('.cjs'))
	{
		return 'text/javascript';
	}

	return mime.getType(pathname);
}



export function sendOneStaticFile(req, res, filePathname)
{
    let reqPathname;
    let stream;


    reqPathname = req.url.split('?')[0];

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



export function setStaticFilesRoute(req, res, pathnameBase, directory)
{
    let reqPathname;
    let filename;


    reqPathname = req.url.split('?')[0];


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



export function setStaticFilesRoutes(req, res, staticRoutes)
{
    let wasResponseSent;


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
