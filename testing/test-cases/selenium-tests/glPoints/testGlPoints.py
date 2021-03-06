#!/usr/bin/env python

import unittest

from selenium_test import FirefoxTest, ChromeTest,\
    setUpModule, tearDownModule


class glPointsBase(object):
    testCase = ('glPoints',)
    testRevision = 5

    def loadPage(self):
        self.resizeWindow(640, 480)
        self.loadURL('glPoints/index.html')
        self.wait()

    def testGlPoints(self):
        self.loadPage()

        testName = 'drawGlPoints'
        self.screenshotTest(testName)


class FirefoxOSM(glPointsBase, FirefoxTest):
    testCase = glPointsBase.testCase + ('firefox',)


class ChromeOSM(glPointsBase, ChromeTest):
    testCase = glPointsBase.testCase + ('chrome',)


if __name__ == '__main__':
    import unittest
    unittest.main()
