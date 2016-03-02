from unittest import TestCase

import src.main.py.util as util


# ##################################################
# TestUtil

class TestUtil(TestCase):

    def test_create_minimal_object(self):
        obj = util.Object()
        self.assertEqual(
            '{}',
            obj.json
        )

    def test_create_object(self):
        obj = util.Object()
        obj.val1 = None
        obj.val1 = 'str'
        obj.val2 = 42
        obj.val3 = ['str', 42, None]
        obj.val4 = util.Object()
        obj.val4.val1 = 42
        obj.val4.val2 = 'str'
        self.assertEqual(
            '{"val1":"str","val2":42,"val3":["str",42,null],"val4":{"val1":42,"val2":"str"}}',
            obj.json
        )

