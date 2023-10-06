// Test the Http 1.1
// curl -v http://nginx.org

// GET / HTTP/1.1
// > Host: nginx.org
// > User-Agent: curl/7.87.0
// > Accept: */*
// >
// * Mark bundle as not supporting multiuse
// < HTTP/1.1 200 OK    ------   (THIS OK IS REMOVED FROM HTTP 2)  ------

// TODO: http smuggling
