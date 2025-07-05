import { assert } from 'chai';
import { ethers } from 'hardhat';

import type { FHEVMTestSuite1 } from '../../types/contracts/tests/FHEVMTestSuite1';
import type { FHEVMTestSuite2 } from '../../types/contracts/tests/FHEVMTestSuite2';
import type { FHEVMTestSuite3 } from '../../types/contracts/tests/FHEVMTestSuite3';
import type { FHEVMTestSuite4 } from '../../types/contracts/tests/FHEVMTestSuite4';
import type { FHEVMTestSuite5 } from '../../types/contracts/tests/FHEVMTestSuite5';
import type { FHEVMTestSuite6 } from '../../types/contracts/tests/FHEVMTestSuite6';
import type { FHEVMTestSuite7 } from '../../types/contracts/tests/FHEVMTestSuite7';
import { createInstance } from '../instance';
import { getSigner, getSigners, initSigners } from '../signers';

async function deployContract(signer: HardhatEthersSigner, contractName: string): Promise<any> {
  const contractFactory = await ethers.getContractFactory(contractName);
  return await contractFactory.connect(signer).deploy();
}

describe('FHEVM operations 47', function () {
  before(async function () {
    this.signer = await getSigner(47);
    this.instance = await createInstance();
    this.contracts = {
      contract1: await deployContract(this.signer, 'FHEVMTestSuite1'),
      contract2: await deployContract(this.signer, 'FHEVMTestSuite2'),
      contract3: await deployContract(this.signer, 'FHEVMTestSuite3'),
      contract4: await deployContract(this.signer, 'FHEVMTestSuite4'),
      contract5: await deployContract(this.signer, 'FHEVMTestSuite5'),
      contract6: await deployContract(this.signer, 'FHEVMTestSuite6'),
      contract7: await deployContract(this.signer, 'FHEVMTestSuite7'),
    };
    for (const contract of Object.values(this.contracts)) {
      await contract.waitForDeployment();
    }
  });

  it('test operator "ne" overload (euint32, euint256) => ebool test 1', async function () {
    const input = this.instance.createEncryptedInput(this.contracts.contract4.address, this.signer.address);
    input.add32(585189844n);
    input.add256(115792089237316195423570985008687907853269984665640564039457576052835139592281n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contracts.contract4.ne_euint32_euint256(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contracts.contract4.resEbool();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: true });
  });

  it('test operator "ne" overload (euint32, euint256) => ebool test 2', async function () {
    const input = this.instance.createEncryptedInput(this.contracts.contract4.address, this.signer.address);
    input.add32(585189840n);
    input.add256(585189844n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contracts.contract4.ne_euint32_euint256(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contracts.contract4.resEbool();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: true });
  });

  it('test operator "ne" overload (euint32, euint256) => ebool test 3', async function () {
    const input = this.instance.createEncryptedInput(this.contracts.contract4.address, this.signer.address);
    input.add32(585189844n);
    input.add256(585189844n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contracts.contract4.ne_euint32_euint256(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contracts.contract4.resEbool();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: false });
  });

  it('test operator "ne" overload (euint32, euint256) => ebool test 4', async function () {
    const input = this.instance.createEncryptedInput(this.contracts.contract4.address, this.signer.address);
    input.add32(585189844n);
    input.add256(585189840n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contracts.contract4.ne_euint32_euint256(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contracts.contract4.resEbool();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: true });
  });

  it('test operator "shl" overload (euint256, uint8) => euint256 test 1', async function () {
    const input = this.instance.createEncryptedInput(this.contracts.contract4.address, this.signer.address);
    input.add256(115792089237316195423570985008687907853269984665640564039457576455317652375183n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contracts.contract4.shl_euint256_uint8(encryptedAmount.handles[0], 11n, encryptedAmount.inputProof);
    await tx.wait();
    const handle = await this.contracts.contract4.resEuint256();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 115792089237316195423570985008687907853269984665640564039442116292375691425792n });
  });

  it('test operator "shl" overload (euint256, uint8) => euint256 test 2', async function () {
    const input = this.instance.createEncryptedInput(this.contracts.contract4.address, this.signer.address);
    input.add256(7n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contracts.contract4.shl_euint256_uint8(encryptedAmount.handles[0], 11n, encryptedAmount.inputProof);
    await tx.wait();
    const handle = await this.contracts.contract4.resEuint256();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 14336n });
  });

  it('test operator "shl" overload (euint256, uint8) => euint256 test 3', async function () {
    const input = this.instance.createEncryptedInput(this.contracts.contract4.address, this.signer.address);
    input.add256(11n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contracts.contract4.shl_euint256_uint8(encryptedAmount.handles[0], 11n, encryptedAmount.inputProof);
    await tx.wait();
    const handle = await this.contracts.contract4.resEuint256();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 22528n });
  });

  it('test operator "shl" overload (euint256, uint8) => euint256 test 4', async function () {
    const input = this.instance.createEncryptedInput(this.contracts.contract4.address, this.signer.address);
    input.add256(11n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contracts.contract4.shl_euint256_uint8(encryptedAmount.handles[0], 7n, encryptedAmount.inputProof);
    await tx.wait();
    const handle = await this.contracts.contract4.resEuint256();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 1408n });
  });

  it('test operator "min" overload (euint8, euint64) => euint64 test 1', async function () {
    const input = this.instance.createEncryptedInput(this.contracts.contract4.address, this.signer.address);
    input.add8(71n);
    input.add64(18443345985014649243n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contracts.contract4.min_euint8_euint64(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contracts.contract4.resEuint64();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 71n });
  });

  it('test operator "min" overload (euint8, euint64) => euint64 test 2', async function () {
    const input = this.instance.createEncryptedInput(this.contracts.contract4.address, this.signer.address);
    input.add8(67n);
    input.add64(71n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contracts.contract4.min_euint8_euint64(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contracts.contract4.resEuint64();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 67n });
  });

  it('test operator "min" overload (euint8, euint64) => euint64 test 3', async function () {
    const input = this.instance.createEncryptedInput(this.contracts.contract4.address, this.signer.address);
    input.add8(71n);
    input.add64(71n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contracts.contract4.min_euint8_euint64(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contracts.contract4.resEuint64();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 71n });
  });

  it('test operator "min" overload (euint8, euint64) => euint64 test 4', async function () {
    const input = this.instance.createEncryptedInput(this.contracts.contract4.address, this.signer.address);
    input.add8(71n);
    input.add64(67n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contracts.contract4.min_euint8_euint64(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contracts.contract4.resEuint64();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 67n });
  });

  it('test operator "lt" overload (euint128, euint128) => ebool test 1', async function () {
    const input = this.instance.createEncryptedInput(this.contracts.contract4.address, this.signer.address);
    input.add128(340282366920938463463369534510059015465n);
    input.add128(340282366920938463463373145972948327125n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contracts.contract4.lt_euint128_euint128(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contracts.contract4.resEbool();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: true });
  });

  it('test operator "lt" overload (euint128, euint128) => ebool test 2', async function () {
    const input = this.instance.createEncryptedInput(this.contracts.contract4.address, this.signer.address);
    input.add128(340282366920938463463369534510059015461n);
    input.add128(340282366920938463463369534510059015465n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contracts.contract4.lt_euint128_euint128(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contracts.contract4.resEbool();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: true });
  });

  it('test operator "lt" overload (euint128, euint128) => ebool test 3', async function () {
    const input = this.instance.createEncryptedInput(this.contracts.contract4.address, this.signer.address);
    input.add128(340282366920938463463369534510059015465n);
    input.add128(340282366920938463463369534510059015465n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contracts.contract4.lt_euint128_euint128(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contracts.contract4.resEbool();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: false });
  });

  it('test operator "lt" overload (euint128, euint128) => ebool test 4', async function () {
    const input = this.instance.createEncryptedInput(this.contracts.contract4.address, this.signer.address);
    input.add128(340282366920938463463369534510059015465n);
    input.add128(340282366920938463463369534510059015461n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contracts.contract4.lt_euint128_euint128(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contracts.contract4.resEbool();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: false });
  });

  it('test operator "mul" overload (euint64, euint16) => euint64 test 1', async function () {
    const input = this.instance.createEncryptedInput(this.contracts.contract4.address, this.signer.address);
    input.add64(32754n);
    input.add16(2n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contracts.contract4.mul_euint64_euint16(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contracts.contract4.resEuint64();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 65508n });
  });

  it('test operator "mul" overload (euint64, euint16) => euint64 test 2', async function () {
    const input = this.instance.createEncryptedInput(this.contracts.contract4.address, this.signer.address);
    input.add64(129n);
    input.add16(129n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contracts.contract4.mul_euint64_euint16(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contracts.contract4.resEuint64();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 16641n });
  });

  it('test operator "mul" overload (euint64, euint16) => euint64 test 3', async function () {
    const input = this.instance.createEncryptedInput(this.contracts.contract4.address, this.signer.address);
    input.add64(129n);
    input.add16(129n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contracts.contract4.mul_euint64_euint16(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contracts.contract4.resEuint64();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 16641n });
  });

  it('test operator "mul" overload (euint64, euint16) => euint64 test 4', async function () {
    const input = this.instance.createEncryptedInput(this.contracts.contract4.address, this.signer.address);
    input.add64(129n);
    input.add16(129n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contracts.contract4.mul_euint64_euint16(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contracts.contract4.resEuint64();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: 16641n });
  });

  it('test operator "gt" overload (euint64, euint64) => ebool test 1', async function () {
    const input = this.instance.createEncryptedInput(this.contracts.contract4.address, this.signer.address);
    input.add64(18440115187628678401n);
    input.add64(18440439778410948539n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contracts.contract4.gt_euint64_euint64(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contracts.contract4.resEbool();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: false });
  });

  it('test operator "gt" overload (euint64, euint64) => ebool test 2', async function () {
    const input = this.instance.createEncryptedInput(this.contracts.contract4.address, this.signer.address);
    input.add64(18440115187628678397n);
    input.add64(18440115187628678401n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contracts.contract4.gt_euint64_euint64(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contracts.contract4.resEbool();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: false });
  });

  it('test operator "gt" overload (euint64, euint64) => ebool test 3', async function () {
    const input = this.instance.createEncryptedInput(this.contracts.contract4.address, this.signer.address);
    input.add64(18440115187628678401n);
    input.add64(18440115187628678401n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contracts.contract4.gt_euint64_euint64(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contracts.contract4.resEbool();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: false });
  });

  it('test operator "gt" overload (euint64, euint64) => ebool test 4', async function () {
    const input = this.instance.createEncryptedInput(this.contracts.contract4.address, this.signer.address);
    input.add64(18440115187628678401n);
    input.add64(18440115187628678397n);
    const encryptedAmount = await input.encrypt();
    const tx = await this.contracts.contract4.gt_euint64_euint64(
      encryptedAmount.handles[0],
      encryptedAmount.handles[1],
      encryptedAmount.inputProof,
    );
    await tx.wait();
    const handle = await this.contracts.contract4.resEbool();
    const res = await this.instance.publicDecrypt([handle]);
    assert.deepEqual(res, { [handle]: true });
  });
});
