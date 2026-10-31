# usage: python -I romset.py <commit> <path> <setname>...   prints ROM_START blocks with line numbers
import sys, subprocess, re
c, p, *sets = sys.argv[1:]
src = subprocess.run(['git','-C','P:/heathkit-hero-mame','show',f'{c}:{p}'],capture_output=True,text=True,encoding='utf-8',errors='replace').stdout.split('\n')
for s in sets:
    on=False
    for i,l in enumerate(src,1):
        if re.match(r'\s*ROM_START\s*\(\s*'+re.escape(s)+r'\s*\)',l): on=True
        if on: print(f'{i}: {l}')
        if on and 'ROM_END' in l: on=False; print('---'); break
