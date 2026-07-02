'use strict';

// Node types that count as a "block" needing separation from its siblings.
// Plain Text/BoundText/Comment nodes are ignored so inline text content
// doesn't force blank lines around it.
const BLOCK_TYPES = new Set([
  'Element',
  'Template',
  'Content',
  'IfBlock',
  'ForLoopBlock',
  'SwitchBlock',
  'DeferredBlock',
]);

function hasBlankLineBetween(sourceText, prevEndOffset, nextStartOffset) {
  const gap = sourceText.slice(prevEndOffset, nextStartOffset);
  return (gap.match(/\n/g) || []).length >= 2;
}

module.exports = {
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    schema: [],
    messages: {
      missing: 'Expected a blank line between sibling blocks.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode();
    const sourceText = sourceCode.getText();

    function checkSiblings(siblings) {
      const blocks = siblings.filter((node) => BLOCK_TYPES.has(node.type));
      for (let i = 1; i < blocks.length; i++) {
        const prev = blocks[i - 1];
        const curr = blocks[i];
        const prevEnd = prev.sourceSpan.end.offset;
        const currStart = curr.sourceSpan.start.offset;
        if (!hasBlankLineBetween(sourceText, prevEnd, currStart)) {
          context.report({
            loc: curr.loc,
            messageId: 'missing',
            fix(fixer) {
              return fixer.insertTextAfterRange([prevEnd, prevEnd], '\n');
            },
          });
        }
      }
    }

    // Recurse through the parts of the Angular template AST that hold
    // rendered sibling content, per the shape documented in
    // @angular-eslint/template-parser's KEYS map.
    function visit(node) {
      switch (node.type) {
        case 'Element':
        case 'Template':
        case 'Content':
        case 'IfBlockBranch':
        case 'ForLoopBlock':
        case 'ForLoopBlockEmpty':
        case 'SwitchBlockCaseGroup':
        case 'DeferredBlock':
        case 'DeferredBlockPlaceholder':
        case 'DeferredBlockLoading':
        case 'DeferredBlockError':
          if (Array.isArray(node.children)) {
            checkSiblings(node.children);
            node.children.forEach(visit);
          }
          if (node.type === 'ForLoopBlock' && node.empty) {
            visit(node.empty);
          }
          if (node.type === 'DeferredBlock') {
            if (node.placeholder) visit(node.placeholder);
            if (node.loading) visit(node.loading);
            if (node.error) visit(node.error);
          }
          break;
        case 'IfBlock':
          (node.branches || []).forEach(visit);
          break;
        case 'SwitchBlock':
          (node.groups || []).forEach(visit);
          break;
        default:
          break;
      }
    }

    return {
      Program(node) {
        if (Array.isArray(node.templateNodes)) {
          checkSiblings(node.templateNodes);
          node.templateNodes.forEach(visit);
        }
      },
    };
  },
};
