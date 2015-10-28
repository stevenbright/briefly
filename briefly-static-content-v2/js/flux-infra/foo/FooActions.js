
'use strict';

export type Action =
{
  type: 'foo/complete',
  id: string
} |
{
  type: 'foo/create',
  text: string
};

