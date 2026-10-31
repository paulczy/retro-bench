# Convert Motorola S-record / Intel HEX text dumps to the bytes they describe and hash them.
# usage: python -I srec2bin.py <file> [start end]   (start/end hex, inclusive; default = lowest..highest address in the file)
# Gaps inside the range are reported and filled with 0xFF (none expected). Record checksums are verified.
import sys, zlib, hashlib
def parse(path):
    mem, bad, base = {}, 0, 0
    for ln in open(path, encoding='ascii', errors='replace'):
        ln = ln.strip()
        if not ln: continue
        if ln[0] == 'S':
            t = ln[1]; b = bytes.fromhex(ln[2:])
            if len(b) < 2: continue
            if (sum(b[:-1]) + b[-1]) & 0xFF != 0xFF and len(b) > 1: bad += 1
            al = {'1': 2, '2': 3, '3': 4}.get(t)
            if not al: continue
            a = int.from_bytes(b[1:1 + al], 'big')
            for i, v in enumerate(b[1 + al:-1]): mem[a + i] = v
        elif ln[0] == ':':
            b = bytes.fromhex(ln[1:]); n, a, t = b[0], int.from_bytes(b[1:3], 'big'), b[3]
            if sum(b) & 0xFF: bad += 1
            if t == 0:
                for i, v in enumerate(b[4:4 + n]): mem[base + a + i] = v
            elif t == 2: base = int.from_bytes(b[4:6], 'big') << 4
            elif t == 4: base = int.from_bytes(b[4:6], 'big') << 16
    return mem, bad
path = sys.argv[1]; mem, bad = parse(path)
lo, hi = min(mem), max(mem)
s = int(sys.argv[2], 16) if len(sys.argv) > 2 else lo
e = int(sys.argv[3], 16) if len(sys.argv) > 3 else hi
gaps = [a for a in range(s, e + 1) if a not in mem]
img = bytes(mem.get(a, 0xFF) for a in range(s, e + 1))
out = [a for a in mem if a < s or a > e]
print(f'{path}|file {lo:05X}-{hi:05X} ({len(mem)} bytes, bad checksums {bad})|range {s:05X}-{e:05X} size {len(img)}|gaps {len(gaps)}|outside {len(out)}|crc32 {zlib.crc32(img):08x}|sha1 {hashlib.sha1(img).hexdigest()}')
