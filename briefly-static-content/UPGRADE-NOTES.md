
# Overview

The purpose of this file is to capture everything related to deprecation warnings and attempts to upgrade specific
libraries in package.json.

# How to Build

FIRST! Upgrade your version of node to ``5.0``, e.g.:

```
$ node -v
v5.0.0
```

# Notes

Jest+React+Babel Integration:

* https://facebook.github.io/jest/docs/tutorial-react.html
* https://facebook.github.io/jest/docs/getting-started.html#babel-integration

# Defects

Too many AJAX requests. This is disastrous! Sample catalog load:

```
2016-03-28 06:11:04,754 INFO c.t.b.s.t.RequestIdAwareFilter rid=JRV1BzPkOfmHa4 [qtp1132307065-30] @metric op=/eolaire/entity/list, verb=POST, tDelta=614, responseCode=200
2016-03-28 06:11:04,772 INFO c.t.b.s.t.RequestIdAwareFilter rid=Q+nOTrrcb+1DNf [qtp1132307065-31] @metric op=/eolaire/item/query/by-type, verb=POST, tDelta=15, responseCode=200
2016-03-28 06:11:04,798 INFO c.t.b.s.t.RequestIdAwareFilter rid=4GAt0PFLiOajVt [qtp1132307065-29] @metric op=/eolaire/item/entry/85331, verb=GET, tDelta=24, responseCode=200
2016-03-28 06:11:04,802 INFO c.t.b.s.t.RequestIdAwareFilter rid=HhkH6p4JPFxN9a [qtp1132307065-31] @metric op=/eolaire/item/relations, verb=POST, tDelta=19, responseCode=200
2016-03-28 06:11:04,802 INFO c.t.b.s.t.RequestIdAwareFilter rid=RuhS+xg1tDBQJK [qtp1132307065-34] @metric op=/eolaire/item/relations, verb=POST, tDelta=19, responseCode=200
2016-03-28 06:11:04,802 INFO c.t.b.s.t.RequestIdAwareFilter rid=r8yETkB/aNf1yM [qtp1132307065-33] @metric op=/eolaire/item/relations, verb=POST, tDelta=19, responseCode=200
2016-03-28 06:11:04,803 INFO c.t.b.s.t.RequestIdAwareFilter rid=/9OlXXsypffUnz [qtp1132307065-32] @metric op=/eolaire/item/relations, verb=POST, tDelta=29, responseCode=200
2016-03-28 06:11:04,806 INFO c.t.b.s.t.RequestIdAwareFilter rid=0Ed7lpHyX9OLAD [qtp1132307065-35] @metric op=/eolaire/item/relations, verb=POST, tDelta=6, responseCode=200
2016-03-28 06:11:04,808 INFO c.t.b.s.t.RequestIdAwareFilter rid=vPvUyzfetY/4kM [qtp1132307065-33] @metric op=/eolaire/item/relations, verb=POST, tDelta=4, responseCode=200
2016-03-28 06:11:04,808 INFO c.t.b.s.t.RequestIdAwareFilter rid=aWoePMK48PLqF/ [qtp1132307065-34] @metric op=/eolaire/item/relations, verb=POST, tDelta=4, responseCode=200
2016-03-28 06:11:04,809 INFO c.t.b.s.t.RequestIdAwareFilter rid=x1OxXeJ1MC4RkP [qtp1132307065-31] @metric op=/eolaire/item/relations, verb=POST, tDelta=4, responseCode=200
2016-03-28 06:11:04,809 INFO c.t.b.s.t.RequestIdAwareFilter rid=sj0yDUM+QvoJ+n [qtp1132307065-32] @metric op=/eolaire/item/relations, verb=POST, tDelta=4, responseCode=200
2016-03-28 06:11:04,810 INFO c.t.b.s.t.RequestIdAwareFilter rid=mtuf2JNtOKN3QQ [qtp1132307065-35] @metric op=/eolaire/item/relations, verb=POST, tDelta=3, responseCode=200
2016-03-28 06:11:04,816 INFO c.t.b.s.t.RequestIdAwareFilter rid=oEsggQsd2rum3h [qtp1132307065-34] @metric op=/eolaire/item/entry/85332, verb=GET, tDelta=6, responseCode=200
2016-03-28 06:11:04,816 INFO c.t.b.s.t.RequestIdAwareFilter rid=fUJ7v0REKUNYYP [qtp1132307065-35] @metric op=/eolaire/item/entry/85333, verb=GET, tDelta=5, responseCode=200
2016-03-28 06:11:04,817 INFO c.t.b.s.t.RequestIdAwareFilter rid=29ien3z11GEWqU [qtp1132307065-32] @metric op=/eolaire/item/entry/85334, verb=GET, tDelta=4, responseCode=200
2016-03-28 06:11:04,821 INFO c.t.b.s.t.RequestIdAwareFilter rid=wWEf2+MUAfyDr0 [qtp1132307065-33] @metric op=/eolaire/item/profile/85332, verb=GET, tDelta=11, responseCode=200
2016-03-28 06:11:04,821 INFO c.t.b.s.t.RequestIdAwareFilter rid=6CC6UBpyA3wn71 [qtp1132307065-32] @metric op=/eolaire/item/profile/85335, verb=GET, tDelta=2, responseCode=200
2016-03-28 06:11:04,821 INFO c.t.b.s.t.RequestIdAwareFilter rid=JhWSexgqZTIMUW [qtp1132307065-34] @metric op=/eolaire/item/profile/85334, verb=GET, tDelta=3, responseCode=200
2016-03-28 06:11:04,822 INFO c.t.b.s.t.RequestIdAwareFilter rid=sUlTLwViOLWjgg [qtp1132307065-35] @metric op=/eolaire/item/entry/85335, verb=GET, tDelta=4, responseCode=200
2016-03-28 06:11:04,823 INFO c.t.b.s.t.RequestIdAwareFilter rid=wEoSdYJ5H4ipAX [qtp1132307065-31] @metric op=/eolaire/item/profile/85333, verb=GET, tDelta=9, responseCode=200
2016-03-28 06:11:04,824 INFO c.t.b.s.t.RequestIdAwareFilter rid=9/OEDjTYIpwYcr [qtp1132307065-30] @metric op=/eolaire/item/profile/85331, verb=GET, tDelta=50, responseCode=200
2016-03-28 06:11:04,826 INFO c.t.b.s.t.RequestIdAwareFilter rid=/TRIK3DitfBP1b [qtp1132307065-33] @metric op=/eolaire/item/entry/85336, verb=GET, tDelta=3, responseCode=200
2016-03-28 06:11:04,828 INFO c.t.b.s.t.RequestIdAwareFilter rid=ihBw+nToExqi6k [qtp1132307065-32] @metric op=/eolaire/item/entry/85337, verb=GET, tDelta=3, responseCode=200
2016-03-28 06:11:04,831 INFO c.t.b.s.t.RequestIdAwareFilter rid=x85s8Sj3ncIskL [qtp1132307065-34] @metric op=/eolaire/item/profile/85336, verb=GET, tDelta=7, responseCode=200
2016-03-28 06:11:04,831 INFO c.t.b.s.t.RequestIdAwareFilter rid=N7BN0cKA0N+p2V [qtp1132307065-35] @metric op=/eolaire/item/profile/85337, verb=GET, tDelta=6, responseCode=200
2016-03-28 06:11:04,832 INFO c.t.b.s.t.RequestIdAwareFilter rid=K1VZd8rIXCpSCG [qtp1132307065-32] @metric op=/eolaire/item/entry/85339, verb=GET, tDelta=3, responseCode=200
2016-03-28 06:11:04,832 INFO c.t.b.s.t.RequestIdAwareFilter rid=JiYq5zmOZjy0oj [qtp1132307065-31] @metric op=/eolaire/item/entry/85338, verb=GET, tDelta=6, responseCode=200
2016-03-28 06:11:04,832 INFO c.t.b.s.t.RequestIdAwareFilter rid=XvPeO9EZdEJDCL [qtp1132307065-33] @metric op=/eolaire/item/profile/85338, verb=GET, tDelta=5, responseCode=200
2016-03-28 06:11:04,834 INFO c.t.b.s.t.RequestIdAwareFilter rid=dZY0LzMX+5SNvU [qtp1132307065-34] @metric op=/eolaire/item/profile/85339, verb=GET, tDelta=3, responseCode=200
2016-03-28 06:11:04,837 INFO c.t.b.s.t.RequestIdAwareFilter rid=7Ue6gJJeK49UnV [qtp1132307065-35] @metric op=/eolaire/item/entry/85340, verb=GET, tDelta=4, responseCode=200
2016-03-28 06:11:04,838 INFO c.t.b.s.t.RequestIdAwareFilter rid=g9K3UkUJyqPith [qtp1132307065-32] @metric op=/eolaire/item/profile/85340, verb=GET, tDelta=4, responseCode=200
2016-03-28 06:11:04,840 INFO c.t.b.s.t.RequestIdAwareFilter rid=rdVsNjngne5Byo [qtp1132307065-34] @metric op=/eolaire/item/entry/66217, verb=GET, tDelta=4, responseCode=200
2016-03-28 06:11:04,840 INFO c.t.b.s.t.RequestIdAwareFilter rid=t37D/kyM25gtr8 [qtp1132307065-33] @metric op=/eolaire/item/entry/1260, verb=GET, tDelta=4, responseCode=200
2016-03-28 06:11:04,842 INFO c.t.b.s.t.RequestIdAwareFilter rid=xtt7JyWkbvKqqH [qtp1132307065-30] @metric op=/eolaire/item/entry/66291, verb=GET, tDelta=3, responseCode=200
2016-03-28 06:11:04,842 INFO c.t.b.s.t.RequestIdAwareFilter rid=du7GtZ1D61cJei [qtp1132307065-31] @metric op=/eolaire/item/entry/1000, verb=GET, tDelta=6, responseCode=200
2016-03-28 06:11:04,846 INFO c.t.b.s.t.RequestIdAwareFilter rid=x+6YjdpjRKQHBO [qtp1132307065-35] @metric op=/eolaire/item/entry/66217, verb=GET, tDelta=2, responseCode=200
2016-03-28 06:11:04,848 INFO c.t.b.s.t.RequestIdAwareFilter rid=okeDfojudKezkL [qtp1132307065-33] @metric op=/eolaire/item/entry/1261, verb=GET, tDelta=3, responseCode=200
2016-03-28 06:11:04,848 INFO c.t.b.s.t.RequestIdAwareFilter rid=oOL1uZksPrYAhU [qtp1132307065-34] @metric op=/eolaire/item/entry/1001, verb=GET, tDelta=3, responseCode=200
2016-03-28 06:11:04,849 INFO c.t.b.s.t.RequestIdAwareFilter rid=aQ/e7VnSRga2At [qtp1132307065-32] @metric op=/eolaire/item/entry/1260, verb=GET, tDelta=5, responseCode=200
2016-03-28 06:11:04,849 INFO c.t.b.s.t.RequestIdAwareFilter rid=2uzfbkjVIohUnS [qtp1132307065-31] @metric op=/eolaire/item/entry/1000, verb=GET, tDelta=2, responseCode=200
2016-03-28 06:11:04,850 INFO c.t.b.s.t.RequestIdAwareFilter rid=QG7/dlLRrzRCnO [qtp1132307065-35] @metric op=/eolaire/item/entry/66217, verb=GET, tDelta=3, responseCode=200
2016-03-28 06:11:04,853 INFO c.t.b.s.t.RequestIdAwareFilter rid=Lsoiihn8GJvUfw [qtp1132307065-33] @metric op=/eolaire/item/entry/1260, verb=GET, tDelta=2, responseCode=200
2016-03-28 06:11:04,853 INFO c.t.b.s.t.RequestIdAwareFilter rid=ktBONirhFs+uPc [qtp1132307065-34] @metric op=/eolaire/item/entry/1000, verb=GET, tDelta=2, responseCode=200
2016-03-28 06:11:04,854 INFO c.t.b.s.t.RequestIdAwareFilter rid=8eLq+0Ozh+tACE [qtp1132307065-32] @metric op=/eolaire/item/entry/66217, verb=GET, tDelta=3, responseCode=200
2016-03-28 06:11:04,857 INFO c.t.b.s.t.RequestIdAwareFilter rid=pCNIezfiJu8qKy [qtp1132307065-30] @metric op=/eolaire/item/entry/66291, verb=GET, tDelta=5, responseCode=200
2016-03-28 06:11:04,859 INFO c.t.b.s.t.RequestIdAwareFilter rid=7sMcIJ18ReO0kV [qtp1132307065-35] @metric op=/eolaire/item/entry/1000, verb=GET, tDelta=3, responseCode=200
2016-03-28 06:11:04,859 INFO c.t.b.s.t.RequestIdAwareFilter rid=J6VDSAfpVSaCuI [qtp1132307065-33] @metric op=/eolaire/item/entry/66217, verb=GET, tDelta=3, responseCode=200
2016-03-28 06:11:04,861 INFO c.t.b.s.t.RequestIdAwareFilter rid=oRBJ0I65gFnoKf [qtp1132307065-31] @metric op=/eolaire/item/entry/1260, verb=GET, tDelta=5, responseCode=200
2016-03-28 06:11:04,862 INFO c.t.b.s.t.RequestIdAwareFilter rid=uwqGG/rhpdspHK [qtp1132307065-34] @metric op=/eolaire/item/entry/66291, verb=GET, tDelta=3, responseCode=200
2016-03-28 06:11:04,862 INFO c.t.b.s.t.RequestIdAwareFilter rid=lAPxv4mh2yOBh6 [qtp1132307065-32] @metric op=/eolaire/item/entry/1000, verb=GET, tDelta=2, responseCode=200
2016-03-28 06:11:04,864 INFO c.t.b.s.t.RequestIdAwareFilter rid=PsRXBEL+2NB/h+ [qtp1132307065-35] @metric op=/eolaire/item/entry/1260, verb=GET, tDelta=2, responseCode=200
2016-03-28 06:11:04,866 INFO c.t.b.s.t.RequestIdAwareFilter rid=QyFtcojdQ+A8GX [qtp1132307065-33] @metric op=/eolaire/item/entry/66291, verb=GET, tDelta=2, responseCode=200
2016-03-28 06:11:04,867 INFO c.t.b.s.t.RequestIdAwareFilter rid=+Dqd6SLr50mE63 [qtp1132307065-31] @metric op=/eolaire/item/entry/1000, verb=GET, tDelta=3, responseCode=200
2016-03-28 06:11:04,867 INFO c.t.b.s.t.RequestIdAwareFilter rid=XYNMNmfbhqF2oO [qtp1132307065-34] @metric op=/eolaire/item/entry/1260, verb=GET, tDelta=2, responseCode=200
2016-03-28 06:11:04,870 INFO c.t.b.s.t.RequestIdAwareFilter rid=cFFto67wG4qNYH [qtp1132307065-33] @metric op=/eolaire/item/entry/1260, verb=GET, tDelta=1, responseCode=200
2016-03-28 06:11:04,871 INFO c.t.b.s.t.RequestIdAwareFilter rid=FVXl6kjNU4Ilcf [qtp1132307065-32] @metric op=/eolaire/item/entry/66291, verb=GET, tDelta=3, responseCode=200
2016-03-28 06:11:04,871 INFO c.t.b.s.t.RequestIdAwareFilter rid=zJxZX4Ueuezz5V [qtp1132307065-35] @metric op=/eolaire/item/entry/1000, verb=GET, tDelta=3, responseCode=200
2016-03-28 06:11:04,874 INFO c.t.b.s.t.RequestIdAwareFilter rid=B3wV5elaXVIEjZ [qtp1132307065-32] @metric op=/eolaire/item/entry/66291, verb=GET, tDelta=3, responseCode=200
2016-03-28 06:11:04,875 INFO c.t.b.s.t.RequestIdAwareFilter rid=/hPFvA3y4i3pP7 [qtp1132307065-34] @metric op=/eolaire/item/entry/1000, verb=GET, tDelta=3, responseCode=200
2016-03-28 06:11:04,875 INFO c.t.b.s.t.RequestIdAwareFilter rid=4SqDknJPbSRU+e [qtp1132307065-31] @metric op=/eolaire/item/entry/1260, verb=GET, tDelta=3, responseCode=200
2016-03-28 06:11:04,876 INFO c.t.b.s.t.RequestIdAwareFilter rid=McQHjLzUjGkhT1 [qtp1132307065-30] @metric op=/eolaire/item/entry/66217, verb=GET, tDelta=12, responseCode=200
2016-03-28 06:11:04,877 INFO c.t.b.s.t.RequestIdAwareFilter rid=HWfYt8FIwzDtCT [qtp1132307065-33] @metric op=/eolaire/item/entry/66291, verb=GET, tDelta=2, responseCode=200
2016-03-28 06:11:04,878 INFO c.t.b.s.t.RequestIdAwareFilter rid=dPq9SXji04GQeV [qtp1132307065-35] @metric op=/eolaire/item/entry/1000, verb=GET, tDelta=2, responseCode=200
2016-03-28 06:11:04,879 INFO c.t.b.s.t.RequestIdAwareFilter rid=cgUJE4GLQLX6wJ [qtp1132307065-32] @metric op=/eolaire/item/entry/1260, verb=GET, tDelta=2, responseCode=200
2016-03-28 06:11:04,880 INFO c.t.b.s.t.RequestIdAwareFilter rid=RID6LhoM7i3lA5 [qtp1132307065-34] @metric op=/eolaire/item/entry/66291, verb=GET, tDelta=2, responseCode=200
2016-03-28 06:11:04,881 INFO c.t.b.s.t.RequestIdAwareFilter rid=6tt3eIF9WiqbBa [qtp1132307065-30] @metric op=/eolaire/item/entry/66217, verb=GET, tDelta=2, responseCode=200
2016-03-28 06:11:04,884 INFO c.t.b.s.t.RequestIdAwareFilter rid=z2sxxvI43KtZID [qtp1132307065-31] @metric op=/eolaire/item/entry/66291, verb=GET, tDelta=2, responseCode=200
2016-03-28 06:11:04,884 INFO c.t.b.s.t.RequestIdAwareFilter rid=mLaViL6es6uS1c [qtp1132307065-33] @metric op=/eolaire/item/entry/66217, verb=GET, tDelta=1, responseCode=200
2016-03-28 06:11:04,888 INFO c.t.b.s.t.RequestIdAwareFilter rid=zMbVjVFn2pjuB8 [qtp1132307065-35] @metric op=/eolaire/item/entry/66291, verb=GET, tDelta=2, responseCode=200
2016-03-28 06:11:04,888 INFO c.t.b.s.t.RequestIdAwareFilter rid=RG8Rgip2n9NmL4 [qtp1132307065-32] @metric op=/eolaire/item/entry/66217, verb=GET, tDelta=2, responseCode=200
2016-03-28 06:11:04,892 INFO c.t.b.s.t.RequestIdAwareFilter rid=jgRYxs+ax2hejc [qtp1132307065-34] @metric op=/eolaire/item/entry/66217, verb=GET, tDelta=2, responseCode=200
```
