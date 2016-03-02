
# ##################################################
# import

import json


# ##################################################
# throw

def throw(message):
    raise Exception(message)


# ##################################################
# Object

class Object(object):

    # ##################################################
    # constructor
    
    def __init__(self, *args, **kwargs):
        self.update(*args, **kwargs)
                
    # ##################################################
    # as object

    def __setattr__(self, name, value):
        self.__dict__[name] = value
    
    def __getattr__(self, name):
        return None    
        
    # ##################################################
    # as dict
    
    def _sanitize(self, value):
        if value is None:
            return None
        if isinstance(value, str):
            value = json.loads(value)
        if hasattr(value, '__dict__'):
            value = value.__dict__
        if isinstance(value, list):
            return [self._sanitize(v) for v in value]
        if isinstance(value, tuple):
            return (self._sanitize(v) for v in value)
        if isinstance(value, dict):
            value = Object(**value)
        return value

    def update(self, *args, **kwargs):
        for arg in args:
            if arg is None:
                continue
            arg = self._sanitize(arg)
            if hasattr(arg, '__dict__'):
                arg = arg.__dict__
            if not isinstance(arg, dict):
                # print '[obj] arg: (-) %s' % arg
                continue
            for (key, value) in arg.iteritems():
                self.__dict__[key] = self._sanitize(value)
                # print '[obj] arg: (+) %s: %s' % (key, self.__dict__[key])
        for (key, value) in kwargs.iteritems():
            self.__dict__[key] = self._sanitize(value)
            # print '[obj] kwarg: (+) %s: %s' % (key, self.__dict__[key])

    def keys(self):
        return sorted(self.__dict__.keys())
        
    def __setitem__(self, key, value):
        self.__dict__[key] = value

    def __getitem__(self, key):
        return self.__dict__[key] if key in self.__dict__ else None
 
    # ##################################################
    # output

    @property
    def indented_json(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4, separators=(',', ': '))
    
    @property
    def json(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, separators=(',', ':'))
        
    def __str__(self):
        return self.json


# ##################################################
# helper

def create(json_file=None, json_url=None):
    if json_file is not None:
        with open(json_file) as f:
            return Object(json.load(f))
    if json_url is not None:
        throw('[error] not yet implemented!')
    return Object()
